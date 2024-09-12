<template>
  <div class="grid gap-2 lg:gap-2 grid-cols-1 lg:grid-cols-[2fr_1fr] px-4 py-12">
    <div>
      <SlickSlider />
    </div>

    <div class="grid gap-2">
      <div class="relative">
        <img 
          src="https://b.shopping.ua/img/slider/d7a4bdfffe95d56086d95300a5bc07ba.webp" 
          alt="" 
          class="w-full max-h-full object-cover"
        />

        <span class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 p-3 bg-white bg-opacity-75 font-semibold text-gray-700 text-center text-lg">
          {{ $t('Main.SHOESOFUKRAINIANBRANDS') }}
        </span>

        <span class="absolute top-0 left-0 px-5 py-2 font-semibold text-sm text-white bg-red-600 uppercase">
          made in ukraine
        </span>
      </div>

      <div class="relative">
        <img 
          src="https://b.shopping.ua/img/slider/d9939ffc6c682a002ad7801ab7ca21a5.webp"
          alt="" 
          class="w-full max-h-full object-cover"
          />

        <span class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 p-3 bg-white bg-opacity-75 font-semibold text-gray-700 text-center text-lg">
          {{ $t('Main.HOMECLOTHES') }}
        </span>

        <span class="absolute top-0 left-0 px-5 py-2 font-semibold text-sm text-white bg-red-600 uppercase">
          made in ukraine
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import SlickSlider from '@/components/SlickSlider.vue';

</script>