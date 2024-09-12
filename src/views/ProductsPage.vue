<template>
  <PageLayout>   
    <PrimaryBannerSlider 
      v-if="!hasSearchQuery"
    />

    <ProductsList />

    <RecentlyViewedProductsList />
  </PageLayout>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import PageLayout from '@/layouts/PageLayout.vue';
import ProductsList from '@/components/product/ProductsList.vue';
import PrimaryBannerSlider from '@/components/sliders/PrimaryBannerSlider.vue';
import RecentlyViewedProductsList from '@/components/RecentlyViewedProductsList.vue';

const route = useRoute();
const hasSearchQuery = computed(() => !!route.query.search);
</script>
