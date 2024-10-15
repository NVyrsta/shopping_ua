<template>
  <div
    class="static right-14 top-24 z-10 mx-auto max-w-full bg-white p-8 shadow-lg min-[450px]:w-[428px] min-[1100px]:absolute min-[1100px]:w-[428px]"
  >
    <p class="mb-4 flex items-center justify-between">
      <span>№ {{ product.id }}</span>

      <router-link :to="`/brands/${brand.id}`">
        <img
          :src="brand.logo"
          :alt="brand.name"
          class="max-h-[100px] min-h-[100px] min-w-[100px] max-w-[100px] object-contain"
        />
      </router-link>
    </p>
    <p class="mb-6 text-center text-lg font-semibold text-black">
      {{ product.name[locale] }}
    </p>

    <div>
      <p
        v-if="product.price_new < product.price"
        class="mb-4 text-lg text-gray-600"
      >
        {{ $t('Main.price') }}:
        <span class="font-bold">{{ product.price_new }} грн </span>
        {{ $t('Main.discount') }}:
        <span class="font-bold text-gray-700"
          >{{ product.price - product.price_new }} грн</span
        >
        <br />

        <span class="text-sm font-bold text-red-600 line-through"
          >{{ $t('Main.oldPrice') }}: {{ product.price }} грн</span
        >
      </p>

      <p
        v-else
        class="mb-4 text-lg text-gray-600"
      >
        {{ $t('Main.price') }}: {{ product.price }} грн
      </p>
    </div>

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

    <div class="flex items-center justify-start gap-4">
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

      <div
        class="flex h-10 w-11 cursor-pointer items-center justify-center border border-gray-300"
      >
        <button @click.stop="toggleFavorite">
          <SvgIcon
            id="favorite"
            width="18"
            height="18"
            :fill="!isFavorited ? 'white' : 'black'"
          />
        </button>
      </div>
    </div>
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
    },
    brand: {
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

  const favorites = ref(JSON.parse(localStorage.getItem('favorites') || '[]'));

  const isFavorited = computed(() => {
    return favorites.value.includes(props.product.id);
  });

  const toggleFavorite = () => {
    const productId = props.product.id;
    const currentFavorites = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    );

    if (currentFavorites.includes(productId)) {
      favorites.value = currentFavorites.filter(id => id !== productId);
    } else {
      favorites.value = [...currentFavorites, productId];
    }

    localStorage.setItem('favorites', JSON.stringify(favorites.value));
    emitter.emit('update-favorites', favorites.value.length);

    emitter.emit('load-recently-viewed');
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
