<template>
  <div
    class="static right-14 top-24 z-10 mx-auto max-w-full bg-white p-8 shadow-lg min-[450px]:w-[428px] min-[1100px]:absolute min-[1100px]:w-[428px]"
  >
    <p class="mb-6 text-center text-lg font-semibold text-black">
      {{ product.name[locale] }}
    </p>

    <p class="mb-4 text-lg text-gray-600">Ціна: {{ product.price }}грн</p>

    <div class="mb-4">
      <select
        id="size-selector"
        v-model="selectedSize"
        name="select"
        class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
      >
        <option
          value=""
          disabled
        >
          {{ $t('Main.ChooseASize') }}
        </option>

        <option
          v-for="size in product.stock"
          :key="size.size"
          :value="size.size"
          :disabled="size.amount === 0"
        >
          {{ size.size }}
        </option>
      </select>
    </div>

    <ButtonComponent
      :title="
        isInCart
          ? $t('Main.InTheCart', { count: selectedSizeInCartCount })
          : $t('Main.AddToCart')
      "
      :green="isInCart"
      :red="!isInCart"
      :disabled="!isValidForm"
      @click="() => addToCart(product, selectedSize)"
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
      required: true
    }
  });

  const selectedSize = ref('');

  const addToCart = (product, selectedSize, quantity = 1) => {
    const currentCartList = JSON.parse(localStorage.getItem('cart') || '[]');

    const productIndex = currentCartList.findIndex(
      item => item.id === product.id
    );

    if (productIndex !== -1) {
      const productItem = currentCartList[productIndex];
      const sizeIndex = productItem.reserved.findIndex(
        reserved => reserved.size === selectedSize
      );

      if (sizeIndex !== -1) {
        productItem.reserved[sizeIndex].amount += quantity;
      } else {
        productItem.reserved.push({ size: selectedSize, amount: quantity });
      }
    } else {
      currentCartList.push({
        ...product,
        reserved: [{ size: selectedSize, amount: quantity }]
      });
    }

    localStorage.setItem('cart', JSON.stringify(currentCartList));

    cartItems.value = currentCartList;
    emitter.emit('update-cart', cartItems.value.length);
  };

  const selectedSizeInCartCount = computed(() => {
    const productInCart = cartItems.value.find(
      item => item.id === props.product.id
    );

    if (productInCart) {
      const reservedItem = productInCart.reserved.find(
        reserved => reserved.size === selectedSize.value
      );
      return reservedItem ? reservedItem.amount : 0;
    }

    return 0;
  });

  const isValidForm = computed(() => {
    return selectedSize.value !== '';
  });

  const isInCart = computed(() => {
    const productInCart = cartItems.value.find(
      item => item.id === props.product.id
    );

    if (productInCart && productInCart.reserved) {
      return productInCart.reserved.some(
        reservedItem => reservedItem.size === selectedSize.value
      );
    }

    return false;
  });
</script>
