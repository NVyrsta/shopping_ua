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

  // Отримуємо параметри з URL
  const categories = (route.params.categories?.split('/') || []).filter(Boolean);
  const gender = route.params.gender ? [route.params.gender] : [];
  const searchQuery = route.query.search;

  // Об'єднуємо gender та categories в один масив
  const filters = [...gender, ...categories];

  console.log('Products list categories:', filters);

  try {
    if (searchQuery) {
      // Завантажуємо продукти за запитом
      products.value = await fetchProductByQuery(searchQuery);
      console.log('fetchProductByQuery works');
    } else if (filters.length > 0) {
      // Завантажуємо продукти за категоріями і gender
      products.value = await fetchProductsByCategories(filters);
      console.log('fetchProductsByCategories works');
    } else {
      // Завантажуємо всі продукти
      products.value = await fetchProducts();
      console.log('fetchProducts works');
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    isLoading.value = false;
  }
};


// Виклик функції при монтуванні компонента
onMounted(() => {
  loadProducts();
});

// Відстеження змін в параметрах маршруту
watch([() => route.query.search, () => route.params], () => {
  loadProducts();
});

// Відстеження змін в локалі
watch(locale, () => {
  loadProducts();
});
</script>
