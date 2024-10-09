<template>
  <PageLayout>
    <div
      v-if="brand"
      class="relative"
    >
      <div>
        <SectionSeparator :title="brand.name" />

        <hr class="my-8" />

        <div class="flex items-center justify-between px-4">
          <img
            :src="brand.logo"
            :alt="brand.name"
            class="max-h-[100px] min-h-[100px] min-w-[100px] max-w-[100px] object-contain"
          />

          <p>{{ $t('Main.SellerID') }}: {{ brand.id }}</p>
        </div>

        <hr class="my-8" />

        <div>
          <SectionSeparator :title="$t('Main.AboutBrand')" />

          <p class="px-4 py-4 text-[15px] leading-[22px] text-[#353535]">
            {{ brand.desc[locale] }}
          </p>
        </div>
      </div>

      <ProductsList />
    </div>

    <div v-else>
      <SpinnerLoading
        width="240"
        height="240"
      />
    </div>
  </PageLayout>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useI18n } from 'vue-i18n';
  import { fetchBrandById } from '@/app/core/plugins/firebase.js';
  import PageLayout from '@/layouts/PageLayout.vue';
  import SectionSeparator from '@/components/elements/SectionSeparator.vue';
  import SpinnerLoading from '@/components/elements/SpinnerLoading.vue';
  import ProductsList from '@/components/product/ProductsList.vue';

  const { locale } = useI18n();

  const brand = ref(null);

  const route = useRoute();

  onMounted(async () => {
    const brandId = route.params.brandId;

    try {
      const response = await fetchBrandById(brandId);
      brand.value = response;
    } catch (error) {
      console.error('Error loading the product:', error);
    }
  });
</script>
