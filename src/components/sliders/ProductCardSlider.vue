<template>
  <carousel 
    :items-to-show="1"
    wrap-around
  >
    <slide 
      v-for="slide in images" 
      :key="slide"
    >
      <img 
        :src="slide"
        class="w-full object-cover object-top h-80 transition-all duration-300"
      >
    </slide>

    <template #addons>
      <navigation @click.stop />
    </template>
  </carousel>
</template>

<script setup>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Navigation } from 'vue3-carousel';

defineProps({
  images: {
    type: Array,
    default: () => [],
  },
});
</script>
