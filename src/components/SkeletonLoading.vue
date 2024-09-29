<template>
  <div
    v-if="props.isLoading"
    class="xs:grid-cols-1 grid gap-2 px-10 py-5 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5"
  >
    <div
      v-for="n in numberOfSkeletons"
      :key="n"
      class="skeleton-card h-500 w-full animate-pulse"
    ></div>
  </div>
</template>

<script setup>
  import { defineProps } from 'vue';

  const props = defineProps({
    isLoading: {
      type: Boolean,
      required: true
    },
    numberOfSkeletons: {
      type: Number,
      default: 5
    }
  });
</script>

<style scoped>
  .skeleton-card {
    background-color: #f0f0f0; /* Світло-сірий фон для скелетона */
  }

  .h-500 {
    height: 500px;
  }
</style>
