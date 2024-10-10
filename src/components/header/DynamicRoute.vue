<template>
  <router-link
    :to="link"
    :class="{ 'font-bold': isActive }"
  >
    {{ linkText }}
  </router-link>
</template>

<script setup>
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();

  const props = defineProps({
    linkText: { type: String, default: '' },
    linkUrl: { type: String, default: '' }
  });

  const getGender = computed(() => {
    if (route.params.gender) {
      return route.params.gender;
    } else if (
      route.params.categories &&
      ['men', 'women', 'children'].includes(route.params.categories)
    ) {
      return route.params.categories;
    } else {
      return 'women';
    }
  });

  const link = computed(() => {
    return `/${getGender.value}/${props.linkUrl}`;
  });

  const isActive = computed(() => {
    return route.path.includes(props.linkUrl);
  });
</script>
