<template>
  <div
    class="card bg-white border border-gray-200 w-full overflow-hidden"
    :class="{
      'transition-transform transform hover:scale-105': scale
    }"
  >
    <div 
      class="relative cursor-pointer"
    >
      <div class="absolute top-2 right-2 flex z-20 space-x-2">
        <button
          @click.stop="toggleFavorite"
        >
          <SvgIcon 
            id="favorite"
            width="14"
            height="14"
            :fill="!isFavorited ? 'white' : 'black'"
          />
        </button>
      </div>

      <div
        class="absolute w-full h-full z-10 top-0 left-0" 
        @click="() => $router.push({ name: 'ProductCardPage', params: { id: product.id } })"
      />

      <carousel 
        :items-to-show="1"
        wrap-around
      >
        <slide 
          v-for="slide in product.images" 
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
    </div>

    <div class="p-4">
      <strong class="block text-sm font-semibold truncate text-gray-800">
        {{ product.name[locale] }}
      </strong>
      <p class="font-bold text-sm text-gray-800">{{ product.price }} грн</p>

      <p>
        <span class="text-sm inline-block mr-1">
          {{ product.producer ? product.producer : '' }}
        </span>
        <span class="text-sm text-gray-500">
          / {{
            product.category && product.category[locale]
              ? product.category[locale]
              : ''
          }}
        </span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import { ref, computed, inject } from 'vue';
import { useRoute } from 'vue-router';

const emitter = inject('emitter');

const { locale } = useI18n();
const route = useRoute();

const props = defineProps({
  product: {
    type: Object,
    default: () => ({
      id: '',
      name: { uk: '', en: '' },
      img: '',
      price: 0,
      quantity: 0,
      category: { uk: '', en: '' },
      producer: '',
    }),
  },

  scale: {
    type: Boolean,
    default: false,
  },
});

const favorites = ref(JSON.parse(localStorage.getItem('favorites') || '[]'));

const isFavorited = computed(() => {
  return favorites.value.includes(props.product.id);
});


const toggleFavorite = () => {
  const productId = props.product.id;
  // Fetch the latest favorites from localStorage
  const currentFavorites = JSON.parse(
    localStorage.getItem('favorites') || '[]',
  );

  if (currentFavorites.includes(productId)) {
    // Remove from favorites
    favorites.value = currentFavorites.filter((id) => id !== productId);
  } else {
    // Add to favorites
    favorites.value = [...currentFavorites, productId];
  }

  // Update local storage
  localStorage.setItem('favorites', JSON.stringify(favorites.value));
  emitter.emit('update-favorites', favorites.value.length);

  if (route.path === '/favorites') {
    emitter.emit('fetch-favorites');
  }
};
</script>

<style lang="scss" scoped>
.card::v-deep {
  &:hover .carousel {
    .carousel__prev,
    .carousel__next {
      opacity: 1
    }
  }
}

.carousel::v-deep {
  .carousel__slide {
    img {
      object-fit: cover;
    }
  }

  .carousel__prev,
  .carousel__next {
    z-index: 11;
    opacity: 0;
  }
}
</style>
