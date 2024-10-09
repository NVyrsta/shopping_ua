<template>
  <router-link
    :to="noveltyRoute"
    :class="{ 'font-bold': isSalesRouteActive }"
  >
    {{ $t('Breadcrumbs.discount-products') }}
  </router-link>
</template>

<script setup>
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();

  const noveltyRoute = computed(() => {
    switch (true) {
      case route.path.includes('men'):
        return '/men/discount-products';
      case route.path.includes('children'):
        return '/children/discount-products';
      default:
        return '/women/discount-products';
    }
  });

  const isSalesRouteActive = computed(() => {
    return route.path.includes('discount-products');
  });
</script>
