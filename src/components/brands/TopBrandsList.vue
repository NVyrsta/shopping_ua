<template>
  <div>
    <SectionSeparator :title="$t('Breadcrumbs.Brands')" />

    <div
      v-if="brands.length > 0 && !isLoading"
      class="px-2 sm:px-10 py-5 mt-7 mx-auto mb-0 flex flex-wrap gap-7 items-center justify-center"
    >
      <div
        v-for="brand in brands"
        :key="brand.id"
      >
        <router-link :to="`/brands/${brand.id}`">
          <div
            class="p-2 border border-gray-200 w-32 h-32 flex justify-center items-center mx-auto cursor-pointer"
          >
            <img
              :src="brand.logo"
              :alt="brand.name"
            />
          </div>

          <div
            class="mt-1 text-center font-medium text-sm leading-4 tracking-wide text-gray-700"
          >
            {{ brand.name }}
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { fetchBrands } from '@/app/core/plugins/firebase';

  import SectionSeparator from '@/components/elements/SectionSeparator.vue';

  const brands = ref([]);
  const isLoading = ref(false);

  const loadBrands = async () => {
    isLoading.value = true;

    try {
      brands.value = await fetchBrands();
    } catch (error) {
      console.error('Error fetching brands: ', error);
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    loadBrands();
  });
</script>

<style scoped>
  .grid-cols-auto-fit {
    grid-template-columns: repeat(auto-fit, 132px);
  }
</style>
