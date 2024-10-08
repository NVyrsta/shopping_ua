<template>
  <div
    class="card w-full overflow-hidden border border-gray-200 bg-white"
    :class="{
      'transform transition-transform hover:scale-105': scale
    }"
  >
    <div class="relative cursor-pointer">
      <div class="absolute right-2 top-2 z-10 flex space-x-2">
        <button @click.stop="toggleFavorite">
          <SvgIcon
            id="favorite"
            width="14"
            height="14"
            :fill="!isFavorited ? 'white' : 'black'"
          />
        </button>
      </div>

      <ProductCardSlider
        :images="product.images"
        :id="product.id"
      />

      <div
        v-if="isWithinLastTwoWeeks"
        class="absolute left-0 top-0"
      >
        <span
          class="w-[50px] bg-[#9baef0] px-2 py-1 text-xs leading-[10px] tracking-wider text-white"
        >
          {{ $t('Main.Novelty') }}
        </span>
      </div>

      <div
        v-if="isOnSale && !isWithinLastTwoWeeks"
        class="absolute left-0 top-0"
      >
        <span
          class="w-[50px] bg-[#ee4a2e] px-2 py-1 text-xs capitalize leading-[10px] tracking-wider text-white"
        >
          {{ $t('Main.discount') }}
        </span>
      </div>
    </div>

    <div class="p-4">
      <strong class="block truncate text-sm font-semibold text-gray-800">
        {{ product.name[locale] }}
      </strong>
      <!-- <p class="text-sm font-bold text-gray-800">{{ product.price }} грн</p> -->

      <!-- Display price and discount -->
      <div
        v-if="isOnSale"
        class="flex items-center justify-start gap-2 text-sm text-gray-800"
      >
        <p class="text-gray-500 line-through">{{ product.price }} грн</p>

        <p class="font-bold text-red-500">{{ product.price_new }} грн</p>
      </div>

      <!-- Regular Price when not on sale -->
      <div
        v-else
        class="text-left text-sm font-bold text-gray-800"
      >
        {{ product.price }} грн
      </div>

      <p class="block truncate text-left">
        <span class="mr-1 inline-block text-sm">
          {{ product.producer ? product.producer : '' }}
        </span>
        <span class="text-sm text-gray-500">
          /
          {{
            $t(
              'Breadcrumbs.' + product.categories[product.categories.length - 1]
            )
          }}
        </span>
      </p>
    </div>
  </div>
</template>

<script setup>
  import { useI18n } from 'vue-i18n';
  import { ref, computed, inject } from 'vue';
  import { useRoute } from 'vue-router';
  import ProductCardSlider from '@/components/sliders/ProductCardSlider.vue';

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
        images: []
      })
    },

    scale: {
      type: Boolean,
      default: false
    }
  });

  const favorites = ref(JSON.parse(localStorage.getItem('favorites') || '[]'));

  const isFavorited = computed(() => {
    return favorites.value.includes(props.product.id);
  });

  const isOnSale = computed(() => {
    return (
      props.product.price_new && props.product.price_new < props.product.price
    );
  });

  const isWithinLastTwoWeeks = computed(() => {
    if (!props.product.date) return false;
    const productDate = new Date(props.product.date.seconds * 1000);
    const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
    return productDate >= twoWeeksAgo;
  });

  const toggleFavorite = () => {
    const productId = props.product.id;
    const currentFavorites = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    );

    if (currentFavorites.includes(productId)) {
      favorites.value = currentFavorites.filter(id => id !== productId);
    } else {
      favorites.value = [...currentFavorites, productId];
    }

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
        opacity: 1;
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
