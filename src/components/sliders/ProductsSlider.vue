<template>
  <carousel 
    :items-to-show="5"
    wrap-around
  >
    <slide 
      v-for="product in products" 
      :key="product.id"
    >
      <div 
      class="flex w-full h-full py-6"
      >
        <!-- <img 
          :src="product.images[0]" 
          class="w-full h-full object-cover"
        > -->
        <ProductCard 
          :product="product"
          class="self-stretch"
        />
      </div>
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
import ProductCard from '@/components/ProductCard.vue';

defineProps({
  products: {
    type: Array,
    default: () => [],
  },
});

</script>

<style lang="scss" scoped>

.carousel::v-deep {
  .carousel__viewport {
    width: calc(100vw - 100px);
    margin: 0 auto;
  }

  .carousel__prev {
    left: 0;
    background: white;

    &:hover {
      background: #ededed;
    }
  }

  & .carousel__next {
    right: 0;
    background: white;

    &:hover {
      background: #ededed;
    }
  }

  & .carousel__pagination {
    position: absolute;
  }

  & .carousel__track {
    align-items: flex-start;
  }

  & .carousel__slide {
    display: flex;
    align-items: stretch;
    align-self: stretch;
    padding-left: 4px;
    padding-right: 4px;
  }

  & .carousel__pagination-button::after {
    background: black;    
    border-radius: 10px;
    width: 20px;
  }

  & .carousel__pagination-button.carousel__pagination-button--active::after {
    background: #f75d5d;    
  }

  & .carousel__pagination {
    position: static;
    width: 100%;
    margin: 0 auto 20px;
  }
}
</style>
