<template>
  <div>
    <SectionSeparator :title="$t('Main.PageNotFound')" />

    <div class="my-10">
      <img
        src="@/assets/img/404.png"
        alt="not found"
        class="mx-auto block"
      />

      <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
        <router-link
          to="/"
          class="text-md block bg-red-500 px-14 py-2 text-white hover:bg-red-700"
        >
          {{ $t('Favorites.OnTheMainOne') }}
        </router-link>

        <button
          @click="goBack"
          class="text-md block bg-red-500 px-14 py-2 text-white hover:bg-red-700"
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
