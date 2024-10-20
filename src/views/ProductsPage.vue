<template>
  <PageLayout>
    <PrimaryBannerSlider v-if="!hasSearchQuery" />

    <div
      v-if="!hasSearchQuery"
      class="py-4"
    >
      <TopBrandsList :limit-count="20" />

      <router-link
        to="/brands"
        class="block"
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

    <ProductSnippet
      v-if="onSaleList.length > 0 && !hasSearchQuery"
      :section-title="$t('Breadcrumbs.discount-products')"
      :products="onSaleList"
      :watch-all-link="`${route.params.gender}/discount-products`"
    />

    <ProductsList />

    <ProductSnippet
      v-if="novetlyList.length > 0 && !hasSearchQuery"
      :section-title="$t('Breadcrumbs.Novelty')"
      :products="novetlyList"
      :watch-all-link="`${route.params.gender}/new-products`"
    />

    <GenderDescriptionBlock v-if="!hasSearchQuery" />

    <DiscountBlock />
  </PageLayout>
</template>

<script setup>
  import { computed, onMounted, ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import {
    fetchNewProductsByCategory,
    fetchSaledProductsByCategory
  } from '@/app/core/plugins/firebase';
  import PageLayout from '@/layouts/PageLayout.vue';
  import ProductsList from '@/components/product/ProductsList.vue';
  import PrimaryBannerSlider from '@/components/sliders/PrimaryBannerSlider.vue';
  import TopBrandsList from '@/components/brands/TopBrandsList.vue';
  import DiscountBlock from '@/components/blocks/DiscountBlock.vue';
  import GenderDescriptionBlock from '@/components/blocks/GenderDescriptionBlock.vue';
  import ProductSnippet from '@/components/blocks/ProductSnippet.vue';

  const route = useRoute();
  const novetlyList = ref([]);
  const onSaleList = ref([]);

  const fetchProducts = async gender => {
    novetlyList.value = await fetchNewProductsByCategory(gender, 10);
    onSaleList.value = await fetchSaledProductsByCategory(gender, 10);
  };

  onMounted(async () => {
    await fetchProducts(route.params.gender);
  });

  watch(
    () => route.params.gender,
    async newGender => {
      await fetchProducts(newGender);
    }
  );

  const hasSearchQuery = computed(() => !!route.query.search);
</script>
