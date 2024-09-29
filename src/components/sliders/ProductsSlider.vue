<template>
  <div>
    <carousel
      v-if="showCarousel"
      :items-to-show="itemsToShow"
      wrap-around
    >
      <slide
        v-for="product in products"
        :key="product.id"
      >
        <div class="flex w-full h-full py-6">
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

    <div
      v-else
      class="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 px-10 py-5 gap-2"
    >
      <ProductCard
        v-for="(product, index) in products"
        :key="index"
        :product="product"
      />
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, computed } from 'vue';
  import 'vue3-carousel/dist/carousel.css';
  import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
  import ProductCard from '@/components/product/ProductCard.vue';

  const props = defineProps({
    products: {
      type: Array,
      default: () => []
    }
  });

  const itemsToShow = ref(5);
  const viewportWidth = ref(window.innerWidth);

  const showCarousel = computed(
    () => props.products.length >= itemsToShow.value
  );

  const calculateItemsToShow = () => {
    const width = viewportWidth.value;
    if (width >= 1200) {
      itemsToShow.value = 5;
    } else if (width >= 992) {
      itemsToShow.value = 4;
    } else if (width >= 768) {
      itemsToShow.value = 3;
    } else {
      itemsToShow.value = 2;
    }
  };

  onMounted(() => {
    calculateItemsToShow();
    window.addEventListener('resize', () => {
      viewportWidth.value = window.innerWidth;
      calculateItemsToShow();
    });
  });
</script>

<style lang="scss" scoped>
  .carousel::v-deep {
    .carousel__viewport {
      margin: 0 auto;
    }

    .carousel__prev {
      left: -40px;
      background: white;

      &:hover {
        background: #ededed;
      }
    }

    & .carousel__next {
      right: -40px;
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
