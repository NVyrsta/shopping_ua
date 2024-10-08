<template>
  <PageLayout>
    <div
      v-if="product && brand"
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
        :brand="brand"
      />
    </div>

    <div v-else>
      <SpinnerLoading
        width="240"
        height="240"
      />
    </div>
  </PageLayout>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import {
    fetchProductById,
    fetchBrandById
  } from '@/app/core/plugins/firebase.js';

  import ProductPageSlider from '@/components/sliders/ProductPageSlider.vue';
  import ProductCardDescription from '@/components/product/ProductCardDescription.vue';
  import ProductBreadcrumbs from '@/components/elements/ProductBreadcrumbs.vue';
  import SpinnerLoading from '@/components/elements/SpinnerLoading.vue';
  import PageLayout from '@/layouts/PageLayout.vue';

  const product = ref(null);
  const brand = ref(null);

  const route = useRoute();

  onMounted(async () => {
    const productId = route.params.id;
    try {
      const response = await fetchProductById(productId);
      product.value = response;

      if (product.value && product.value.producer_id) {
        brand.value = await fetchBrandById(product.value.producer_id);
      }

      addProductToRecentlyViewed(productId);
    } catch (error) {
      console.error('Помилка при завантаженні продукту:', error);
    }
  });

  function addProductToRecentlyViewed(productId) {
    const viewedProducts =
      JSON.parse(localStorage.getItem('recentlyViewedProducts')) || [];

    if (!viewedProducts.includes(productId)) {
      viewedProducts.unshift(productId);

      if (viewedProducts.length > 5) {
        viewedProducts.pop();
      }

      localStorage.setItem(
        'recentlyViewedProducts',
        JSON.stringify(viewedProducts)
      );
    }
  }
</script>
