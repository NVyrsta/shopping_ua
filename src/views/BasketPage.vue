<template>
  <div class="flex flex-col min-h-screen">
    <CartHeader />

    <div class="flex-1">
      cart content
    </div>

    <CartFooter />
  </div>
</template>

<script setup>
import CartHeader from '@/components/cart/CartHeader.vue';
import CartFooter from '@/components/cart/CartFooter.vue';
</script>
