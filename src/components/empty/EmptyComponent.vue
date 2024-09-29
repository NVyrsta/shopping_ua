<template>
  <div class="px-4 pb-12 pt-4">
    <h2 class="text-center text-lg font-bold uppercase">
      {{ title }}
    </h2>

    <img
      src="@/assets/img/favorites-empty.png"
      alt="empty"
      class="mx-auto block"
    />

    <div class="flex items-center justify-center">
      <router-link
        :to="btnLink"
        class="text-md mx-auto block bg-red-500 px-14 py-2 text-white hover:bg-red-700"
      >
        {{ btnTitle ? btnTitle : $t('Favorites.OnTheMainOne') }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    title: {
      type: String,
      default: ''
    },
    btnLink: {
      type: String,
      default: '/'
    },
    btnTitle: {
      type: String,
      default: ''
    }
  });
</script>
