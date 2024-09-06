<template>
  <carousel 
    :items-to-show="slidesCount"
    wrapAround
  >
    <slide v-for="(slide, index) in props.slides" :key="index">
      <div class="flex justify-center items-start overflow-hidden">
        <img :src="slide" class="w-full height-auto">
      </div>
    </slide>

    <template #addons>
      <navigation />
    </template>
  </carousel>
</template>

<script setup>
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
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

// Функція для оновлення ширини екрану
const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth;
};

// Слухаємо зміну розміру екрану
onMounted(() => {
  window.addEventListener('resize', updateScreenWidth);
});

// Знімаємо слухач при знищенні компонента
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScreenWidth);
});

// Визначаємо кількість слайдів в залежності від ширини екрану
const slidesCount = computed(() => {

  if (screenWidth.value >= 1100) {
    return 4; // Для великих екранів показуємо 4 слайди
  } else if (screenWidth.value >= 768) {
    return 3; // Для середніх екранів показуємо 2 слайди
  } else if (screenWidth.value >= 460) {
    return 2; // Для середніх екранів показуємо 2 слайди
  } else {
    return 1; // Для маленьких екранів показуємо 1 слайд
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
