<template>
  <PageLayout>    
    <div 
      v-if="product"
      class="relative"
    >
      <ProductBreadcrumbs 
        :categories="product.categories"
        :product="product"
      />

      <ProductPageSlider 
        v-if="product.images"
        :slides="product.images"
      />

      <ProductCardDescription 
        :product="product"
      />
    </div>

    <div v-else>
      <p>Завантаження продукту...</p>
    </div>
  </PageLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { fetchProductById } from '@/app/core/plugins/firebase.js'; 

import ProductPageSlider from '@/components/sliders/ProductPageSlider.vue';
import ProductCardDescription from '@/components/product/ProductCardDescription.vue';
import ProductBreadcrumbs from '@/components/elements/ProductBreadcrumbs.vue';
import PageLayout from '@/layouts/PageLayout.vue';

const product = ref(null);

const route = useRoute();

onMounted(async () => {
  const productId = route.params.id;
  try {
    const response = await fetchProductById(productId);
    product.value = response;

    addProductToRecentlyViewed(productId);
  } catch (error) {
    console.error('Помилка при завантаженні продукту:', error);
  }
});

function addProductToRecentlyViewed(productId) {
  let viewedProducts = JSON.parse(localStorage.getItem('recentlyViewedProducts')) || [];

  if (!viewedProducts.includes(productId)) {
    viewedProducts.unshift(productId);
    
    if (viewedProducts.length > 5) {
      viewedProducts.pop();
    }

    localStorage.setItem('recentlyViewedProducts', JSON.stringify(viewedProducts));
  }
}
</script>
