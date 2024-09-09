<template>
  <div
    class="bg-white mx-auto shadow-lg min-[450px]:w-[428px] min-[1100px]:w-[428px] max-w-full static min-[1100px]:absolute z-10 top-24 right-14 p-8"
    >
    <p class="text-lg font-semibold text-black text-center mb-6">
      {{ props.product.name[locale] }}
    </p>

    <p class="text-lg text-gray-600 mb-4">Ціна: {{ product.price }}грн</p>

    <div class="mb-4">
      <select
        id="size-selector"
        v-model="selectedSize"
        name="select"
        class="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
      >
        <option 
          value="" 
          disabled
        >
          Оберіть розмір
        </option>

        <option 
          v-for="size in product.sizes" 
          :key="size.size" 
          :value="size.size"
          :selected="product.sizes[0].size === size.size"
        >
          {{ size.size }} - {{ size.amount }} в наявності
        </option>
      </select>
    </div>

    <ButtonComponent 
      :title="isInCart ? $t('Main.InTheCart') : $t('Main.AddToCart')"
      :green="isInCart"
      :red="!isInCart"
      @click="addToCart(product)"
    >
      <template #icon-left>
        <SvgIcon 
          id="cart"
          width="16"
          height="16"
          fill="white"
        />
      </template>
    </ButtonComponent>
  </div>
</template>

<script setup>
import { ref, inject, computed } from 'vue';
import { defineProps } from 'vue';
import { useI18n } from 'vue-i18n';

import ButtonComponent from '@/components/elements/ButtonComponent.vue';

const emitter = inject('emitter');
const cartItems = ref(JSON.parse(localStorage.getItem('cart') || '[]'));

const { locale } = useI18n();

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const addToCart = (product) => {
  const currentCartList = JSON.parse(localStorage.getItem('cart') || '[]');

  const productIndex = currentCartList.findIndex((item) => item.id === product.id);

  if (productIndex === -1) {
    currentCartList.push({ ...product, quantity: 1 });

    localStorage.setItem('cart', JSON.stringify(currentCartList));

    cartItems.value = currentCartList;
  
    localStorage.setItem('cart', JSON.stringify(cartItems.value));
  
    emitter.emit('update-cart', cartItems.value.length);
  }
};

const isInCart = computed(() => {
  return cartItems.value.some(item => item.id === props.product.id);
});
</script>