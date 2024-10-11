<template>
  <div>
    <SectionSeparator :title="$t('Breadcrumbs.' + gender)" />
    <div
      v-html="$t('Gender.' + gender)"
      class="px-10 py-10"
    />
  </div>
</template>

<script setup>
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import SectionSeparator from '@/components/elements/SectionSeparator.vue';

  const route = useRoute();

  const gender = computed(() => {
    switch (route.params.gender) {
      case 'women':
        return 'women';
      case 'men':
        return 'men';
      case 'children':
        return 'children';
      default:
        return 'women';
    }
  });
</script>
