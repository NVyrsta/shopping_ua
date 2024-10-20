<template>
  <PageLayout>
    <RouterBreadcrumbs />

    <ProductsList />

    <DiscountBlock />
  </PageLayout>
</template>

<script setup>
  import PageLayout from '@/layouts/PageLayout.vue';
  import ProductsList from '@/components/product/ProductsList.vue';
  import RouterBreadcrumbs from '@/components/elements/breadcrumbs/RouterBreadcrumbs.vue';
  import DiscountBlock from '@/components/blocks/DiscountBlock.vue';
</script>
