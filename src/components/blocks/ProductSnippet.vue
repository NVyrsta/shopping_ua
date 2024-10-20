<template>
  <div class="py-4">
    <SectionSeparator :title="sectionTitle" />

    <div
      class="grid grid-cols-2 gap-2 px-2 py-8 sm:grid-cols-3 sm:px-24 md:grid-cols-4 lg:grid-cols-5"
    >
      <ProductCard
        v-for="(product, index) in products"
        :key="index"
        :product="product"
      />
    </div>

    <router-link
      :to="watchAllLink"
      class="mt-10 block"
    >
      <button
        class="font-['Proxima Nova'] duration-250 ease-[cubic-bezier(0.4, 0, 0.2, 1)] relative mx-auto box-border flex h-10 w-full min-w-[64px] max-w-[230px] cursor-pointer select-none appearance-none items-center justify-center rounded-none border-2 border-solid border-[#353535] bg-[#353535] p-2 text-center align-middle text-lg font-medium leading-[1.5] tracking-[0.1em] text-white no-underline shadow-none outline-0 transition-all"
      >
        <p
          class="relative mx-auto flex items-center justify-center gap-2 before:absolute before:left-[-30px] before:top-1/2 before:block before:h-[1px] before:w-[21px] before:-translate-y-1/2 before:transform before:rounded-[5px] before:bg-white before:opacity-50 before:content-['']"
        >
          {{ $t('Main.WatchAll') }}
        </p>
      </button>
    </router-link>
  </div>
</template>

<script setup>
  import SectionSeparator from '@/components/elements/SectionSeparator.vue';
  import ProductCard from '@/components/product/ProductCard.vue';

  defineProps({
    sectionTitle: {
      type: String,
      default: ''
    },
    products: {
      type: Array,
      default: () => []
    },
    watchAllLink: {
      type: String,
      default: '/'
    }
  });
</script>
