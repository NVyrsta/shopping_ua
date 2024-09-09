<template>
  <carousel 
    :items-to-show="slidesCount"
    wrap-around
  >
    <slide 
      v-for="(slide, index) in props.slides" 
      :key="index"
    >
      <div class="flex justify-center items-start overflow-hidden">
        <img 
          :src="slide" 
          class="w-full height-auto"
        >
      </div>
    </slide>

    <template #addons>
      <navigation />
    </template>
  </carousel>
</template>

<script setup>
import 'vue3-carousel/dist/carousel.css';
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { Carousel, Slide, Navigation } from 'vue3-carousel';

const screenWidth = ref(window.innerWidth);

const props = defineProps({
  slides: {
    type: Array,
    default: () => ([]),
  },
});

const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', updateScreenWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScreenWidth);
});

const slidesCount = computed(() => {

  if (screenWidth.value >= 1100) {
    return 4;
  } else if (screenWidth.value >= 768) {
    return 3;
  } else if (screenWidth.value >= 460) {
    return 2;
  } else {
    return 1;
  }
});
</script>

<style lang="scss" scoped>
.carousel::v-deep {
  .carousel__prev {
    background: white;
  }

  & .carousel__next {
    background: white;
    right: 500px;

    @media (max-width: 1100px) {
      right: 0;
    }
  }

  & .carousel__pagination {
    position: absolute;
  }

  & .carousel__track {
    align-items: flex-start;
  }

  & .carousel__slide {
    padding-left: 4px;
    padding-right: 4px;
  }
}
</style>
