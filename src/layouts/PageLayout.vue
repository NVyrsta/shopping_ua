<template>
  <div class="flex min-h-screen flex-col">
    <HeaderLayout />

    <ProductSearch />

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
  import ProductSearch from '@/components/product/ProductSearch.vue';

  import FooterLayout from '@/layouts/FooterLayout.vue';
</script>
