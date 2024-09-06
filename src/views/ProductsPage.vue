<template>
  <PageLayout>
    <ProductsList />

    <RecentlyViewedProductsList />
  </PageLayout>
</template>

<script setup>
import PageLayout from '@/layouts/PageLayout.vue';
import ProductsList from '@/components/ProductsList.vue';
import RecentlyViewedProductsList from '@/components/RecentlyViewedProductsList.vue';
</script>
