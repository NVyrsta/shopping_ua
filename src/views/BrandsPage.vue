<template>
  <PageLayout>
    <BreadCrumbs />

    <TopBrandsList :title="$t('Main.Top30Brands')" />

    <DiscountBlock />
  </PageLayout>
</template>

<script setup>
  import PageLayout from '@/layouts/PageLayout.vue';
  import BreadCrumbs from '@/components/BreadCrumbs.vue';
  import TopBrandsList from '@/components/brands/TopBrandsList.vue';
  import DiscountBlock from '@/components/blocks/DiscountBlock.vue';
</script>
