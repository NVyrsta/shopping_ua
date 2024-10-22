<template>
  <PageLayout>
    <RouterBreadcrumbs />

    <SectionSeparator :title="$t('Breadcrumbs.' + categoryName)" />

    <ProductsList has-sorting />
    <DiscountBlock />
  </PageLayout>
</template>

<script setup>
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import PageLayout from '@/layouts/PageLayout.vue';
  import ProductsList from '@/components/product/ProductsList.vue';
  import RouterBreadcrumbs from '@/components/elements/breadcrumbs/RouterBreadcrumbs.vue';
  import DiscountBlock from '@/components/blocks/DiscountBlock.vue';
  import SectionSeparator from '@/components/elements/SectionSeparator.vue';
  import { getLastRoutePath } from '@/app/utils/routeUtils.js';

  const route = useRoute();

  const categoryName = computed(() => {
    return getLastRoutePath(route.params);
  });
</script>
