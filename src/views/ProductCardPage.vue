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

      <RecentlyViewedProductsList />
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
  import { ref, onMounted, watch } from 'vue';
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
  import RecentlyViewedProductsList from '@/components/RecentlyViewedProductsList.vue';

  const product = ref(null);
  const brand = ref(null);
  const route = useRoute();

  const loadProduct = async productId => {
    try {
      const response = await fetchProductById(productId);
      product.value = response;

      if (product.value && product.value.producer_id) {
        brand.value = await fetchBrandById(product.value.producer_id);
      }

      addProductToRecentlyViewed(productId);
    } catch (error) {
      console.error('Error loading the product:', error);
    }
  };

  const addProductToRecentlyViewed = productId => {
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
  };

  onMounted(() => {
    const productId = route.params.id;
    loadProduct(productId);
  });

  watch(
    () => route.params.id,
    newId => {
      if (newId) {
        loadProduct(newId);
      }
    }
  );
</script>
