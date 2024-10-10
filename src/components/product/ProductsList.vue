<template>
  <div>
    <SkeletonLoading
      :is-loading="isLoading"
      :number-of-skeletons="5"
    />

    <div
      v-if="products.length > 0 && !isLoading"
      class="grid grid-cols-2 gap-2 px-2 py-5 sm:grid-cols-3 sm:px-10 md:grid-cols-4 lg:grid-cols-5"
    >
      <ProductCard
        v-for="(product, index) in products"
        :key="index"
        :product="product"
      />
    </div>

    <div v-if="!isLoading && products.length === 0 && hasSearchQuery">
      <EmptySearch />
    </div>

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
    fetchNewProductsByCategory,
    fetchSaledProductsByCategory
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

    const categories = (route.params.categories?.split('/') || []).filter(
      Boolean
    );
    const gender = route.params.gender ? [route.params.gender] : ['women'];
    const searchQuery = route.query.search;
    const brandId = route.params.brandId;

    const filters = [...gender, ...categories];

    try {
      if (route.name === 'BrandPage' && brandId) {
        const brand = await fetchBrandById(brandId);

        if (brand) {
          products.value = await fetchProductsByBrand(brandId);
        } else {
          console.error('Brand not found or missing name');
        }
      } else if (searchQuery) {
        products.value = await fetchProductByQuery(searchQuery);
      } else if (route.name === 'NewProductsPage') {
        const category = route.path.split('/')[1];
        products.value = await fetchNewProductsByCategory(category);
      } else if (route.name === 'SaledProductsPage') {
        const category = route.path.split('/')[1];
        products.value = await fetchSaledProductsByCategory(category);
      } else if (filters.length > 0) {
        products.value = await fetchProductsByCategories(
          filters[filters.length - 1]
        );
      } else {
        products.value = await fetchProducts();
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      isLoading.value = false;
    }
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
