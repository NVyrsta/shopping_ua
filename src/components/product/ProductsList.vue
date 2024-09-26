<template>
  <div>
    <SkeletonLoading 
      :is-loading="isLoading" 
      :number-of-skeletons="5" 
    />

    <div
      v-if="products.length > 0 && !isLoading"
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 px-2 sm:px-10 py-5 gap-2">
      <ProductCard 
        v-for="(product, index) in products" 
        :key="index"
        :product="product"
      />
    </div>

    <!-- Покажемо EmptySearch, якщо завантаження завершено, товарів немає і є пошуковий запит -->
    <div v-if="!isLoading && products.length === 0 && hasSearchQuery">
      <EmptySearch />
    </div>

    <!-- Покажемо NotFoundComponent, якщо завантаження завершено, товарів немає і немає пошукового запиту -->
    <div v-if="!isLoading && products.length === 0 && !hasSearchQuery">
      <NotFoundComponent />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import {
  fetchProducts,
  fetchProductByQuery,
  fetchProductsByCategories,
  fetchProductsByBrand,
  fetchBrandById,
} from '@/app/core/plugins/firebase';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import ProductCard from '@/components/product/ProductCard.vue';
import NotFoundComponent from '@/components/empty/NotFoundComponent.vue';
import EmptySearch from '@/components/empty/EmptySearch.vue';
import SkeletonLoading from '@/components/SkeletonLoading.vue';

const { locale } = useI18n();
const route = useRoute();

const products = ref([]);
const isLoading = ref(false);
const hasSearchQuery = computed(() => !!route.query.search);

const loadProducts = async () => {
  isLoading.value = true;

  const categories = (route.params.categories?.split('/') || []).filter(Boolean);
  const gender = route.params.gender ? [route.params.gender] : ['women'];
  const searchQuery = route.query.search;
  const brandId = route.params.brandId;
  console.log('gender', gender);

  const filters = [...gender, ...categories];

  try {
    if (route.name === 'BrandPage' && brandId) {
      const brand = await fetchBrandById(brandId);

      if (brand?.name) {
        products.value = await fetchProductsByBrand(brand.name);
        console.log('fetchProductsByBrand works  products.value.length', products.value);
      } else {
        console.error('Brand not found or missing name');
      }

    } else if (searchQuery) {
      products.value = await fetchProductByQuery(searchQuery);
      console.log('fetchProductByQuery works', products.value);

    } else if (filters.length > 0) {
      products.value = await fetchProductsByCategories(filters);
      console.log('fetchProductsByCategories works', products.value);

    } else {
      products.value = await fetchProducts();
      console.log('fetchProducts works', products.value);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    isLoading.value = false;
  }

  console.log('products.value.length > 0', products.value.length > 0);
  console.log('isLoading:', isLoading.value);
  console.log('products.length > 0 && !isLoading":', products.value.length > 0 && !isLoading.value);
};

onMounted(() => {
  loadProducts();
});

watch([() => route.query.search, () => route.params], () => {
  loadProducts();
});

watch(locale, () => {
  loadProducts();
});
</script>
