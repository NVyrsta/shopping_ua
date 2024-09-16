<template>
  <div 
    v-if="props.isLoading" 
    class="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 px-10 py-5 gap-2"
  >
    <div 
      v-for="n in numberOfSkeletons" 
      :key="n" 
      class="animate-pulse skeleton-card h-500 w-full"
    ></div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true,
  },
  numberOfSkeletons: {
    type: Number,
    default: 5,
  },
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
