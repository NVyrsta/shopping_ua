<template>
  <div class="favorites">
    <BreadCrumbs />

    <SectionSeparator :title="$t('Header.Chosen')" />

    <SkeletonLoading 
      :is-loading="isLoading" 
      :number-of-skeletons="5" 
    />

    <div 
      v-if="products.length > 0 && !isLoading" 
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 px-10 py-5 gap-2"
    >
      <ProductCard 
        v-for="(product, index) in products" 
        :key="index"
        :product="product" 
       />
    </div>

    <EmptyComponent 
      v-if="!products.length && !isLoading" 
      :title="$t('Favorites.AddProductsToFavorites')"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, inject, watch } from 'vue';
import {
  // fetchProducts,
  fetchFavoritesProducts,
} from '@/app/core/plugins/firebase';
import { useI18n } from 'vue-i18n';

import ProductCard from '@/components/product/ProductCard.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import SectionSeparator from '@/components/elements/SectionSeparator.vue';
import SkeletonLoading from '@/components/SkeletonLoading.vue';
import EmptyComponent from '@/components/empty/EmptyComponent.vue';

const { locale } = useI18n();
const emitter = inject('emitter');

const products = ref([]);
const isLoading = ref(false);

const loadProducts = async () => {
  isLoading.value = true;

  try {
    products.value = await fetchFavoritesProducts();
  } catch (error) {
    console.error('Error fetching products: ', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadProducts();

  emitter.on('fetch-favorites', loadProducts);
});

onUnmounted(() => {
  emitter.off('fetch-favorites', loadProducts);
});

watch(locale, () => {
  loadProducts();
});
</script>

<style scoped>
.favorites {
  min-height: calc(100vh + 40px);
}
</style>
