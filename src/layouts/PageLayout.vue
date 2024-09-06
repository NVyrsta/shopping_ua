<template>
  <div class="flex flex-col min-h-screen">
    <HeaderLayout />

    <main class="flex-1">
      <slot />
    </main>
    
    <footer>
      <FooterLayout />
    </footer>
  </div>
</template>

<script setup>
import HeaderLayout from '@/layouts/HeaderLayout.vue';
import FooterLayout from '@/layouts/FooterLayout.vue';
</script>
