<template>
  <div class="flex justify-between items-center gap-2 bg-orange-100 px-4">
    <div />

    <div class="relative py-2">
      <input 
        v-model="searchQuery"
        :placeholder="$t('Header.Search')" 
        type="text"
        class="bg-orange-100 outline-none pt-1 pr-6 pb-1 pl-2 text-sm border-b border-gray-300"
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

  if (categories || gender) {
    router.push({ path: currentRoute.path, query: currentQuery });
  } else {
    router.push({ path: '/', query: currentQuery });
  }
}, 500);

watch(() => router.currentRoute.value.query.search, (newSearch) => {
  searchQuery.value = newSearch || '';
});

onMounted(() => {
  const query = router.currentRoute.value.query.search;
  searchQuery.value = query || '';
});
</script>
