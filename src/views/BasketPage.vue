<template>
  <div class="flex flex-col min-h-screen">
    <CartHeader />

    <CartBody class="flex-1" />

    <CartFooter />
  </div>
</template>

<script setup>
  import CartHeader from '@/components/cart/CartHeader.vue';
  import CartBody from '@/components/cart/CartBody.vue';
  import CartFooter from '@/components/cart/CartFooter.vue';
</script>
