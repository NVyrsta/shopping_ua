<template>
  <div>
    <SectionSeparator :title="$t('Main.PageNotFound')" />

    <div class="my-10">
      <img
        src="@/assets/img/404.png"
        alt="not found"
        class="block mx-auto"
      />

      <div class="flex justify-center items-center flex-wrap gap-4 mt-10">
        <router-link
          to="/"
          class="block text-md text-white bg-red-500 hover:bg-red-700 px-14 py-2"
        >
          {{ $t('Favorites.OnTheMainOne') }}
        </router-link>

        <button
          @click="goBack"
          class="block text-md text-white bg-red-500 hover:bg-red-700 px-14 py-2"
        >
          {{ $t('Main.Back') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import SectionSeparator from '@/components/elements/SectionSeparator.vue';

  import { useGoBack } from '@/composables/useGoBack';

  const { goBack } = useGoBack();
</script>
