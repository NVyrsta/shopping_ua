<template>
  <div
    class="bg-white mx-auto shadow-lg min-[450px]:w-[428px] min-[1100px]:w-[428px] max-w-full static min-[1100px]:absolute z-10 top-24 right-14 p-8"
    >
    <p class="text-lg font-semibold text-black text-center mb-6">
      {{ product.name[locale] }}
    </p>

    <p class="text-lg text-gray-600 mb-4">Ціна: {{ product.price }}грн</p>

    <div class="mb-4">
      <select
        id="size-selector"
        v-model="selectedSize"
        name="select"
        class="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
      >
        <!-- Плейсхолдер для вибору -->
        <option 
          value="" 
          disabled
        >
          {{ $t('Main.ChooseASize')}}
        </option>

        <!-- Варіанти розмірів -->
        <option 
          v-for="size in product.stock" 
          :key="size.size" 
          :value="size.size"
          :disabled="size.amount === 0"
        >
          {{ size.size }}
          <!-- {{ size.size }}р. -> {{ size.amount }}шт. в наявності -->
        </option>
      </select>
    </div>

    <ButtonComponent 
      :title="isInCart ? $t('Main.InTheCart', { count: selectedSizeInCartCount }) : $t('Main.AddToCart')"
      :green="isInCart"
      :red="!isInCart"
      :disabled="!isValidForm"
      @click="() =>addToCart(product, selectedSize)"
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

const selectedSize = ref('');

const addToCart = (product, selectedSize, quantity = 1) => {
  // Отримати поточний кошик з localStorage або ініціалізувати його як порожній масив
  const currentCartList = JSON.parse(localStorage.getItem('cart') || '[]');

  // Знайти, чи є вже товар у кошику
  const productIndex = currentCartList.findIndex((item) => item.id === product.id);

  if (productIndex !== -1) {
    // Товар вже є в кошику, оновлюємо розміри та кількість
    const productItem = currentCartList[productIndex];
    const sizeIndex = productItem.reserved.findIndex((reserved) => reserved.size === selectedSize);
    console.log('here1', selectedSize);

    if (sizeIndex !== -1) {
      // Розмір вже зарезервовано, оновлюємо кількість
      productItem.reserved[sizeIndex].amount += quantity;
      console.log('here2', selectedSize);

    } else {
      // Розмір не знайдено, додаємо новий об'єкт розміру
      productItem.reserved.push({ size: selectedSize, amount: quantity });
      console.log('here3', selectedSize);

    }
  } else {
    // Товару немає в кошику, додаємо його разом із розміром і кількістю
    console.log('here4', selectedSize);

    currentCartList.push({ 
      ...product,
      reserved: [{ size: selectedSize, amount: quantity }],
    });
  }

  // Зберегти оновлений кошик в localStorage
  localStorage.setItem('cart', JSON.stringify(currentCartList));
  
  // Оновити значення cartItems і викликати подію
  cartItems.value = currentCartList;
  emitter.emit('update-cart', cartItems.value.length);
};

const selectedSizeInCartCount = computed(() => {
  // Використовуємо реактивний cartItems замість прямого доступу до localStorage
  const productInCart = cartItems.value.find(item => item.id === props.product.id);

  if (productInCart) {
    const reservedItem = productInCart.reserved.find(reserved => reserved.size === selectedSize.value);
    return reservedItem ? reservedItem.amount : 0;
  }

  return 0;
});

const isValidForm = computed(() => {
  return selectedSize.value !== '';
});


const isInCart = computed(() => {
  // Перевірка наявності товару в кошику
  const productInCart = cartItems.value.find(item => item.id === props.product.id);

  if (productInCart && productInCart.reserved) {
    // Перевірка, чи є товар з вибраним розміром в масиві reserved
    return productInCart.reserved.some(reservedItem => reservedItem.size === selectedSize.value);
  }

  // Товар не знайдено в кошику
  return false;
});
</script>