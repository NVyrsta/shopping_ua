<template>
  <div class="px-4 pt-4 pb-12">
    <h2 class="text-center font-bold uppercase text-lg">
      {{ title }}
    </h2>

    <img 
      src="@/assets/img/favorites-empty.png"
      alt="empty"
      class="block mx-auto"
    >

    <div class="flex justify-center items-center">
      <router-link 
        :to="btnLink" 
        class="block text-md text-white bg-red-500 hover:bg-red-700 px-14 py-2 mx-auto"
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
    default: '',
  },
  btnLink: {
    type: String,
    default: '/',
  },
  btnTitle: {
    type: String,
    default: '',
  },
});
</script>
