<template>
  <div class="carousel-wrapper relative">
    <img
      v-if="images[1]"
      :src="images[1]"
      class="secondary-image absolute left-0 top-0 h-80 w-full object-cover object-top"
    />

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
          class="h-80 w-full object-cover object-top transition-all duration-300"
          @click="
            () =>
              $router.push({ name: 'ProductCardPage', params: { gender, id } })
          "
        />
      </slide>

      <template #addons>
        <navigation @click.stop />
      </template>
    </carousel>
  </div>
</template>

<script setup>
  import 'vue3-carousel/dist/carousel.css';
  import { Carousel, Slide, Navigation } from 'vue3-carousel';

  defineProps({
    images: {
      type: Array,
      default: () => []
    },

    id: {
      type: String,
      default: ''
    },

    gender: {
      type: String,
      default: 'women'
    }
  });
</script>

<style lang="scss" scoped>
  .carousel-wrapper {
    &:hover .carousel {
      visibility: visible;
    }

    &:hover {
      .carousel__prev,
      .carousel__next {
        z-index: 11;
        opacity: 1;
      }
    }

    .carousel {
      visibility: hidden;
    }
  }
</style>
