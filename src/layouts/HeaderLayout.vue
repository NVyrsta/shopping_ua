<template>
  <header>
    <HeaderBanner />
    <HeaderPrimary />
  </header>
</template>

<script setup>
  import HeaderBanner from '@/components/header/HeaderBanner.vue';
  import HeaderPrimary from '@/components/header/HeaderPrimary.vue';
</script>

<style scoped>
  .fixed {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000; /* Adjust as needed */
  }
</style>
