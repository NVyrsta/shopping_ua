<template>
  <router-link 
    :to="noveltyRoute"
    :class="{ 'font-bold': isNoveltyRouteActive }"
  >
    {{ $t('Breadcrumbs.Novelty') }}
  </router-link>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const noveltyRoute = computed(() => {
  switch (true) {
    case route.path.includes('men'):
      return '/men/new-products';
    case route.path.includes('children'):
      return '/children/new-products';
    default:
      return '/women/new-products';
  }
});

const isNoveltyRouteActive = computed(() => {
  return route.path.includes('new-products');
});
</script>
