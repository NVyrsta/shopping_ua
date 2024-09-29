<template>
  <div
    class="flex justify-between items-center flex-wrap sm:flex-nowrap gap-2 bg-orange-100 px-4"
  >
    <div
      class="flex justify-center sm:justify-start items-center gap-2 order-2 sm:order-1 w-full sm:w-auto pb-2 sm:pb-0"
    >
      <router-link
        to="/brands"
        active-class="font-bold"
        class="underline-effect"
      >
        {{ $t('Breadcrumbs.Brands') }}
      </router-link>

      <NovetlyRoute class="underline-effect" />
    </div>

    <div class="relative py-2 w-full sm:w-auto order-1 sm:order-2">
      <input
        v-model="searchQuery"
        :placeholder="$t('Header.Search')"
        type="text"
        class="bg-orange-100 outline-none pt-1 pr-6 pb-1 pl-2 text-sm border-b border-gray-300 w-full"
        @input="debouncedSearch"
      />

      <SvgIcon
        id="search"
        class="absolute top-2 right-0"
        width="21"
        height="21"
        fill="#353535"
      />
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import { debounce } from '@/app/core/plugins/utils';
  import NovetlyRoute from '@/components/header/NovetlyRoute.vue';

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
