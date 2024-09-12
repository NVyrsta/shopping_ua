<template>
  <div v-if="products.length > 0 && !isLoading">
    <SectionSeparator 
      :title="$t('Main.YouRecentlyBrowsed')" 
    />

    <SkeletonLoading 
      :is-loading="isLoading" 
      :number-of-skeletons="5" 
    />

    <div class="px-8">  
      <ProductsSlider 
        v-if="products.length > 0 && !isLoading"
        :products="products" 
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import {
  fetchProductsByIds,
} from '@/app/core/plugins/firebase';
import { useI18n } from 'vue-i18n';

import SkeletonLoading from '@/components/SkeletonLoading.vue';
import SectionSeparator from '@/components/elements/SectionSeparator.vue';

import ProductsSlider from '@/components/sliders/ProductsSlider.vue';

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