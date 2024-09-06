<template>
  <div>
    <SectionSeparator :title="$t('Main.YouRecentlyBrowsed')" />

    <SkeletonLoading :isLoading="isLoading" :numberOfSkeletons="5" />

    <div
      v-if="products.length > 0 && !isLoading"
      class="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 px-10 py-5 gap-2">
      <ProductCard v-for="(product, index) in products" :key="index" :product="product" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import {
  fetchProductsByIds
} from '@/app/core/plugins/firebase';
import { useI18n } from 'vue-i18n';

import ProductCard from '@/components/ProductCard.vue';
import SkeletonLoading from '@/components/SkeletonLoading.vue';
import SectionSeparator from '@/components/SectionSeparator.vue';

// import SlickSlider from '@/components/SlickSlider.vue';

const { locale } = useI18n();

const products = ref([]);
const isLoading = ref(false);

const loadProducts = async () => {
  isLoading.value = true;
  const productIds = JSON.parse(localStorage.getItem('recentlyViewedProducts')) || [];

  try {
    products.value  = await fetchProductsByIds(productIds);
  } catch (error) {
    console.error('Error fetching products: ', error);
  } finally {
    isLoading.value = false;
  }
};

watch(locale, () => {
  loadProducts();
});

onMounted(() => {
  loadProducts();
});
</script>