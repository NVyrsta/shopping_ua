<template>
  <PageLayout>   
    <PrimaryBannerSlider 
      v-if="!hasSearchQuery"
    />

    <div 
      v-if="!hasSearchQuery"
      class="pb-8"
    >
      <TopBrandsList />

      <router-link
        to="/brands"
        class="block"
      >
        <button 
          class="flex 
            items-center 
            justify-center 
            relative 
            box-border 
            select-none 
            align-middle 
            appearance-none 
            min-w-[64px] 
            font-['Proxima Nova'] 
            shadow-none 
            leading-[1.5] 
            text-white 
            bg-[#353535] 
            cursor-pointer 
            h-10 
            w-full 
            text-center 
            font-medium 
            text-lg 
            tracking-[0.1em] 
            max-w-[230px] 
            outline-0 
            mx-auto
            no-underline 
            transition-all 
            duration-250 
            ease-[cubic-bezier(0.4, 0, 0.2, 1)] 
            border-2 
            border-solid 
            border-[#353535] 
            rounded-none 
            p-2"
        >
        <p
          class="flex justify-center gap-2 items-center mx-auto relative before:content-[''] before:bg-white before:block before:absolute before:top-1/2 before:transform before:-translate-y-1/2 before:left-[-30px] before:opacity-50 before:rounded-[5px] before:w-[21px] before:h-[1px]"
        >
          {{ $t('Main.WatchAll') }}
        </p>
        </button>
      </router-link>
    </div>

    <ProductsList />

    <RecentlyViewedProductsList />
  </PageLayout>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import PageLayout from '@/layouts/PageLayout.vue';
import ProductsList from '@/components/product/ProductsList.vue';
import PrimaryBannerSlider from '@/components/sliders/PrimaryBannerSlider.vue';
import TopBrandsList from '@/components/brands/TopBrandsList.vue';
import RecentlyViewedProductsList from '@/components/RecentlyViewedProductsList.vue';

const route = useRoute();
const hasSearchQuery = computed(() => !!route.query.search);
</script>
