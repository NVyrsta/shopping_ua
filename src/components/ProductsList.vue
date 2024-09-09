<template>
  <div>
    <div class="flex justify-between items-center gap-2 bg-orange-100 px-4">
      <div />

      <div class="relative py-2">
        <input 
          v-model="searchQuery"
          :placeholder="$t('Header.Search')" 
          type="text"
          class="bg-orange-100 outline-none pt-1 pr-6 pb-1 pl-2 text-sm border-b border-gray-300"
          @input="debouncedSearch" 
        />

        <svg class="absolute top-2 right-0" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 0.5C4.57452 0.5 0.5 3.76189 0.5 9C0.5 13.1891 3.5 17.5 8.32436 17.5C9.73622 17.5 11.2291 17.4102 12 17C13.0556 16.6481 12.7413 14.1293 12 14.5C11.0466 14.9767 9.12248 15.0351 8.41858 15.0855C8.35522 15.09 8.29183 15.0897 8.22874 15.0824C4.94698 14.7019 3 12.3968 3 9C3 5.33719 5.33719 3 9 3C12.6626 3 15.5 5.33719 15.5 9C15.5 10.3351 14.6806 11.9576 14 13C13.4196 13.8889 13.761 15.2378 14.5 16L18.5 20C18.6371 20.1371 19.363 20.6366 20 20C20.637 19.3634 20.7742 18.774 20.5 18.5L17.5 15.5L17.4983 15.4983C16.9819 14.9819 16.1259 14.126 16.5 13.5C17.2181 12.2983 18 10.4988 18 9C18 3.5 13.4254 0.5 9 0.5Z" fill="#353535"></path>
        </svg>
      </div>
    </div>

    <div class="grid gap-2 lg:gap-2 grid-cols-1 lg:grid-cols-[2fr_1fr] px-4 py-12">
      <div>
        <SlickSlider />
      </div>

      <div class="grid gap-2">
        <div class="relative">
          <img src="https://b.shopping.ua/img/slider/d7a4bdfffe95d56086d95300a5bc07ba.webp" alt="" class="w-full max-h-full object-cover"/>

          <span class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 p-3 bg-white bg-opacity-75 font-semibold text-gray-700 text-center text-lg">
            {{ $t('Main.SHOESOFUKRAINIANBRANDS') }}
          </span>

          <span class="absolute top-0 left-0 px-5 py-2 font-semibold text-sm text-white bg-red-600 uppercase">
            made in ukraine
          </span>
        </div>

        <div class="relative">
          <img src="https://b.shopping.ua/img/slider/d9939ffc6c682a002ad7801ab7ca21a5.webp" alt="" class="w-full max-h-full object-cover"/>

          <span class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 p-3 bg-white bg-opacity-75 font-semibold text-gray-700 text-center text-lg">
            {{ $t('Main.HOMECLOTHES') }}
          </span>

          <span class="absolute top-0 left-0 px-5 py-2 font-semibold text-sm text-white bg-red-600 uppercase">
            made in ukraine
          </span>
        </div>
      </div>
    </div>

    <SkeletonLoading 
      :is-loading="isLoading" 
      :number-of-skeletons="5" 
    />

    <div
      v-if="products.length > 0 && !isLoading"
      class="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 px-10 py-5 gap-2">
      <ProductCard v-for="(product, index) in products" :key="index" :product="product" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import {
  fetchProducts,
  fetchProductByQuery,
} from '@/app/core/plugins/firebase';
import { debounce } from '@/app/core/plugins/utils';
import { useI18n } from 'vue-i18n';

import ProductCard from '@/components/ProductCard.vue';
import SkeletonLoading from '@/components/SkeletonLoading.vue';
import SlickSlider from '@/components/SlickSlider.vue';

const { locale } = useI18n();
const searchQuery = ref('');

const products = ref([]);
const isLoading = ref(false);

const loadProducts = async () => {
  isLoading.value = true;

  try {
    products.value = await fetchProducts();
  } catch (error) {
    console.error('Error fetching products: ', error);
  } finally {
    isLoading.value = false;
  }
};

const fetchAndUpdateProducts = async (query) => {
  // Call fetchProductByQuery with the search query
  const result = await fetchProductByQuery(query);
  // Optionally handle result here if necessary

  // Refresh the product list
  products.value = result;
};

const debouncedSearch = debounce(() => {
  fetchAndUpdateProducts(searchQuery.value);
}, 300); // Adjust debounce time as needed

onMounted(() => {
  loadProducts();
});

watch(locale, () => {
  loadProducts();
});
</script>

