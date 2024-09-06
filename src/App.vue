<script setup>
import { provide } from 'vue';
import mitt from 'mitt';

const emitter = mitt();

provide('emitter', emitter);
</script>

<template>
  <div class="m-auto h-screen">
    <router-view />
  </div>
</template>
