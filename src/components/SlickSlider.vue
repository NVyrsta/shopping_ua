<template>
  <carousel
    :items-to-show="1"
    :autoplay="3000"
    wrap-around
  >
    <slide
      v-for="slide in slides"
      :key="slide"
    >
      <img
        :src="slide.src"
        :alt="slide.title"
      />
    </slide>

    <template #addons>
      <navigation />
      <pagination />
    </template>
  </carousel>
</template>

<script setup>
  import 'vue3-carousel/dist/carousel.css';
  import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

  defineProps({
    slides: {
      type: Array,
      default: () => []
    }
  });
</script>

<style lang="scss" scoped>
  .carousel::v-deep {
    align-self: stretch;
    .carousel__prev {
      background: white;
    }

    & .carousel__next {
      background: white;
    }

    & .carousel__pagination {
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
    }

    & .carousel__pagination-button::after {
      background: black;
      border-radius: 10px;
      width: 20px;
    }

    & .carousel__pagination-button.carousel__pagination-button--active::after {
      background: #f75d5d;
    }

    & .carousel__viewport,
    & .carousel__track {
      width: 100%;
      height: 100%;
    }

    & .carousel__slide {
      width: 100%;
      height: 100%;
    }

    & .carousel__slide img,
    & .carousel__slide video {
      height: 100%;
      object-fit: cover;
    }
  }
</style>
