<template>
  <carousel
    :items-to-show="1"
    :autoplay="2000"
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

  const slides = [
    {
      id: 1,
      title: 'Slide 1',
      src: 'https://b.shopping.ua/img/slider/c88bbc1300013a4724bede02e724cdd4.webp'
    },
    {
      id: 2,
      title: 'Slide 2',
      src: 'https://b.shopping.ua/img/slider/421d131fc7c876527e032f9f484fbeca.webp'
    },
    {
      id: 3,
      title: 'Slide 3',
      src: 'https://b.shopping.ua/img/slider/b685158f4ff66b1af56a2c06df15e344.webp'
    }
  ];
</script>

<style lang="scss" scoped>
  .carousel::v-deep {
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
  }
</style>
