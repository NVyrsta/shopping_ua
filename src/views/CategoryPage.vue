<template>
  <PageLayout>
    <ProductBreadcrumbs 
      :categories="categories"
    />

    <ProductsList />
  </PageLayout>
</template>

<script setup>
import PageLayout from '@/layouts/PageLayout.vue';
import ProductsList from '@/components/product/ProductsList.vue';
import ProductBreadcrumbs from '@/components/elements/ProductBreadcrumbs.vue';
// import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
// const categories = computed(() => Object.values(route.params));
const categories = route.params.categories?.split('/') || route.params.gender || [];

</script>

