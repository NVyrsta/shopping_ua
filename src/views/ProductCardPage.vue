<template>
  <PageLayout>
    <div 
      v-if="product"
      class="relative"
    >
      <h1>{{ product.name[locale] }}</h1>
      <p>{{ product.description }}</p>
      <p>Ціна: {{ product.price }}</p>

      <ProductPageSlider 
        v-if="product.images"
        :slides="product.images"
      />

      <div
        class="bg-white mx-auto shadow-lg min-[450px]:w-[428px] min-[1100px]:w-[428px] max-w-full static min-[1100px]:absolute top-24 right-14 p-4">
        Product description
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora excepturi sunt neque dicta voluptates sed.
      </div>

      <!-- Додаткові дані про продукт -->
    </div>

    <div v-else>
      <p>Завантаження продукту...</p>
    </div>
  </PageLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { fetchProductById } from '@/app/core/plugins/firebase.js'; 

import ProductPageSlider from '@/components/sliders/ProductPageSlider.vue';
import PageLayout from '@/layouts/PageLayout.vue';

const { locale } = useI18n();

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
