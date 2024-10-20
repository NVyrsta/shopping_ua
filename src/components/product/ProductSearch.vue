<template>
  <div class="bg-orange-100">
    <div
      class="content-wrapper relative flex flex-wrap items-center justify-between gap-2 px-4 lg:flex-nowrap"
    >
      <div
        class="order-2 flex w-full flex-wrap items-center justify-center gap-4 pb-2 lg:order-1 lg:w-auto lg:justify-start lg:pb-0"
      >
        <GenderRoutes class-name="underline-effect" />
      </div>

      <div class="relative order-1 w-full py-2 lg:order-2 lg:w-auto">
        <input
          v-model="searchQuery"
          :placeholder="$t('Header.Search')"
          type="text"
          class="w-full border-b border-gray-300 bg-orange-100 pb-1 pl-2 pr-6 pt-1 text-sm outline-none"
          @input="debouncedSearch"
        />

        <SvgIcon
          id="search"
          class="absolute right-0 top-2"
          width="21"
          height="21"
          fill="#353535"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import { debounce } from '@/app/core/plugins/utils';
  import GenderRoutes from '@/components/header/GenderRoutes.vue';

  const searchQuery = ref('');
  const router = useRouter();

  const debouncedSearch = debounce(() => {
    const currentRoute = router.currentRoute.value;
    const { categories, gender } = currentRoute.params;
    const currentQuery = { ...currentRoute.query };

    if (searchQuery.value) {
      currentQuery.search = searchQuery.value;
    } else {
      delete currentQuery.search;
    }

    const newPath = categories || gender ? currentRoute.path : '/';
    router.push({ path: newPath, query: currentQuery });
  }, 500);

  const syncSearchWithQuery = () => {
    const query = router.currentRoute.value.query.search;
    searchQuery.value = query || '';
  };

  watch(() => router.currentRoute.value.query.search, syncSearchWithQuery);

  onMounted(syncSearchWithQuery);
</script>
