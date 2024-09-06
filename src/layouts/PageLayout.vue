<template>
  <div>
    <HeaderLayout />

    <main>
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
