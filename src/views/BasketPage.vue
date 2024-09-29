<template>
  <div class="flex min-h-screen flex-col">
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
