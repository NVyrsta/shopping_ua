<template>
  <div>
    <SectionSeparator :title="$t('Breadcrumbs.Brands')" />

    <h2
      v-if="title"
      class="text-center text-lg uppercase"
    >
      {{ title }}
    </h2>

    <div
      v-if="brands.length > 0 && !isLoading"
      class="mx-auto mb-0 mt-7 flex flex-wrap items-center justify-center gap-7 px-2 py-5 sm:px-10"
    >
      <div
        v-for="brand in brands"
        :key="brand.id"
        class="brand-card"
      >
        <router-link :to="`/brands/${brand.id}`">
          <div
            class="mx-auto flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden border border-gray-200 p-2"
          >
            <img
              :src="brand.logo"
              :alt="brand.name"
              class="brand-logo"
            />
          </div>

          <div
            class="brand-name mt-1 text-center text-sm font-medium leading-4 tracking-wide text-gray-700"
          >
            {{ brand.name }}
          </div>
        </router-link>
      </div>
    </div>

    <div
      v-if="showCatalogue"
      class="mt-8 flex flex-col px-4"
    >
      <div class="flex flex-wrap items-center justify-start">
        <button
          @click="filterBrands('All')"
          class="pb-1/2 cursor-pointer border-b-2 border-gray-400 px-4 pt-2 text-base tracking-wider text-[#6d6d6d] transition duration-300"
          :class="{
            'border-b-3 border-black font-bold': filterBy === 'All'
          }"
        >
          {{ $t('Main.All') }}
        </button>

        <button
          v-for="(item, index) in filterLetters"
          :key="index"
          class="pb-1/2 cursor-pointer border-b-2 border-gray-400 px-4 pt-2 text-base tracking-wider text-[#6d6d6d] transition duration-300"
          :class="{
            'border-b-3 border-black font-bold': filterBy === item
          }"
          @click="filterBrands(item)"
        >
          {{ item }}
        </button>
      </div>

      <div class="mt-8">
        <div
          v-if="filterBy !== 'All'"
          class="my-4 flex items-center px-4"
        >
          <div class="mr-4 min-w-8 text-lg font-bold">{{ filterBy }}</div>

          <div
            class="grid w-full grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-4"
          >
            <div
              v-for="brand in filteredBrands.filter(b => {
                const firstChar = b.name?.charAt(0);
                const isCyrillic = /^[А-Яа-яЄєІіЇїҐґ]/.test(firstChar);
                return (
                  // (filterBy === '0-9' && /^[0-9]/.test(firstChar)) ||
                  // firstChar?.toUpperCase() === filterBy
                  (filterBy === '0-9' && /^[0-9]/.test(firstChar)) ||
                  firstChar?.toUpperCase() === filterBy ||
                  (filterBy === 'А-Я' && isCyrillic)
                );
              })"
              :key="brand.id"
              class="text-sm font-bold"
            >
              <router-link :to="`/brands/${brand.id}`">
                {{ brand.name }}
              </router-link>
            </div>
          </div>
        </div>

        <div
          v-else
          v-for="letter in filterLetters"
          :key="letter"
          class="my-4 flex items-center px-4"
        >
          <div class="mr-4 min-w-8 text-lg font-bold">{{ letter }}</div>

          <div
            class="grid w-full grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-4"
          >
            <div
              v-for="brand in filteredBrands.filter(b => {
                const firstChar = b.name?.charAt(0);
                const isCyrillic = /^[А-Яа-яЄєІіЇїҐґ]/.test(firstChar);
                return (
                  (letter === '0-9' && /^[0-9]/.test(firstChar)) ||
                  firstChar?.toUpperCase() === letter ||
                  (letter === 'А-Я' && isCyrillic)
                );
              })"
              :key="brand.id"
              class="text-sm font-bold"
            >
              <router-link :to="`/brands/${brand.id}`">
                {{ brand.name }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { fetchBrands } from '@/app/core/plugins/firebase';
  import SectionSeparator from '@/components/elements/SectionSeparator.vue';

  const props = defineProps({
    title: {
      type: String,
      default: ''
    },
    showCatalogue: {
      type: Boolean,
      default: false
    },
    limitCount: {
      type: [Number, null],
      default: null
    }
  });

  const brands = ref([]);
  const filterBy = ref('All');
  const filteredBrands = ref([]);
  const isLoading = ref(false);

  const filterLetters = ref([
    '0-9',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    'А-Я'
  ]);

  const loadBrands = async () => {
    isLoading.value = true;

    try {
      brands.value = await fetchBrands(props.limitCount);
      filteredBrands.value = brands.value;
    } catch (error) {
      console.error('Error fetching brands: ', error);
    } finally {
      isLoading.value = false;
    }
  };

  const filterBrands = letter => {
    filterBy.value = letter;

    if (letter === 'All') {
      filteredBrands.value = brands.value;
    }
  };

  onMounted(() => {
    loadBrands();
  });
</script>

<style scoped lang="scss">
  .grid-cols-auto-fit {
    grid-template-columns: repeat(auto-fit, 132px);
  }

  .brand-card {
    position: relative;
    overflow: hidden;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);

      .brand-logo {
        transform: scale(1.2);
      }

      .brand-name {
        opacity: 0;
        transform: translateY(10px);
      }
    }
  }

  .brand-logo {
    transition: transform 0.3s ease;
  }

  .brand-name {
    transition:
      opacity 0.3s ease,
      transform 0.3s ease;
    opacity: 1;
    transform: translateY(0);
  }
</style>
