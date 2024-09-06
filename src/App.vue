<script setup>
import { provide } from 'vue';
import mitt from 'mitt';

// import HeaderBanner from '@/components/HeaderBanner.vue';
// import HeaderPrimary from '@/components/HeaderPrimary.vue';
// import AddProductForm from '@/components/AddProductForm.vue';
// import ProductsList from '@/components/ProductsList.vue';

const emitter = mitt();

provide('emitter', emitter);
</script>

<template>
  <div class="m-auto h-screen">
    <router-view />
  </div>
</template>
