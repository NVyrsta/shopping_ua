<template>
  <nav class="breadcrumbs flex justify-start items-center px-4 py-4 gap-4">
    <router-link to="/">{{ $t('Favorites.Main') }}</router-link> 

    <span class="arrow-next">
      <SvgIcon 
        id="back"
        width="6"
        height="10"
        fill="#6d6d6d"
        class="transform rotate-180"
      />
    </span>

    <router-link v-if="isFavoritesPage" to="/favorites">{{ $t('Header.Chosen') }}</router-link> 

    <span class="arrow-next">
      <SvgIcon 
        id="back"
        width="6"
        height="10"
        fill="#6d6d6d"
        class="transform rotate-180"
      />
    </span>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isFavoritesPage = computed(() => route.path === '/favorites');
</script>

<style scoped>
.arrow-next:last-child {
  display: none;
}

a {
  font-size: 14px;
  color: #a8a8a8;
  font-size: 14px;
  letter-spacing: .02em;
  line-height: 16px;
  text-decoration: none;
  white-space: nowrap;
  transition: 0.3s ease-in-out;
  cursor: pointer;
}

a:hover {
  text-decoration: underline;
}
</style>
