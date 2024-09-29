<template>
  <div
    class="grid grid-cols-1 gap-2 px-4 py-12 lg:grid-cols-[2fr_1fr] lg:gap-2"
  >
    <div>
      <SlickSlider />
    </div>

    <div class="grid gap-2">
      <div class="relative">
        <img
          src="https://b.shopping.ua/img/slider/d7a4bdfffe95d56086d95300a5bc07ba.webp"
          alt=""
          class="max-h-full w-full object-cover"
        />

        <span
          class="absolute bottom-0 left-1/2 w-4/5 -translate-x-1/2 transform bg-white bg-opacity-75 p-3 text-center text-lg font-semibold text-gray-700"
        >
          {{ $t('Main.SHOESOFUKRAINIANBRANDS') }}
        </span>

        <span
          class="absolute left-0 top-0 bg-red-600 px-5 py-2 text-sm font-semibold uppercase text-white"
        >
          made in ukraine
        </span>
      </div>

      <div class="relative">
        <img
          src="https://b.shopping.ua/img/slider/d9939ffc6c682a002ad7801ab7ca21a5.webp"
          alt=""
          class="max-h-full w-full object-cover"
        />

        <span
          class="absolute bottom-0 left-1/2 w-4/5 -translate-x-1/2 transform bg-white bg-opacity-75 p-3 text-center text-lg font-semibold text-gray-700"
        >
          {{ $t('Main.HOMECLOTHES') }}
        </span>

        <span
          class="absolute left-0 top-0 bg-red-600 px-5 py-2 text-sm font-semibold uppercase text-white"
        >
          made in ukraine
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
  import SlickSlider from '@/components/SlickSlider.vue';
</script>
