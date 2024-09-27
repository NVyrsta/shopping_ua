<template>
  <router-link 
    :to="noveltyRoute"
    active-class="font-bold"
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
</script>
