<template>
  <div
    class="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
  >
    <div 
      class="relative cursor-pointer"
      @click="() => $router.push({ name: 'ProductCardPage', params: { id: product.id } })"
    >
      <img
        :src="product.img"
        :alt="product.name[locale]"
        class="w-full object-cover object-top rounded-t-lg h-80 transition-all duration-300"
      />

      <img
        v-if="product.img2"
        :src="product.img2"
        :alt="product.name[locale] + ' hover'"
        class="absolute inset-0 w-full h-80 object-cover object-top rounded-t-lg opacity-0 transition-opacity duration-300 hover:opacity-100"
      />

      <div class="absolute top-2 right-2 flex space-x-2">
        <button
          @click.stop="toggleFavorite"
        >
          <svg
            v-if="!isFavorited"
            width="14"
            height="14"
            viewBox="0 0 16 14"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.22128 1.48965C9.81272 1.00883 10.4397 0.619263 11.1354 0.619263C13.2314 0.619263 14.9672 2.39171 14.9672 4.60672C14.9672 4.88754 14.8939 5.31184 14.7964 5.7395C14.7014 6.15572 14.5934 6.53391 14.5427 6.70544C14.5338 6.73551 14.5219 6.7633 14.5065 6.79032C13.6182 8.34803 12.1979 9.99342 10.842 11.2513C10.1655 11.8789 9.51623 12.3995 8.97039 12.7595C8.69713 12.9398 8.45842 13.0741 8.26153 13.1616C8.05496 13.2534 7.93448 13.2755 7.88498 13.2755C7.68498 13.2755 7.41163 13.2077 7.06915 13.0509C6.7322 12.8967 6.35862 12.6705 5.96726 12.389C5.18448 11.826 4.36729 11.0689 3.68041 10.3105C3.2406 9.82481 2.51272 8.95615 1.89741 7.91742C1.27679 6.86972 0.802734 5.70212 0.802734 4.60672C0.802734 2.39171 2.53858 0.619263 4.63451 0.619263C5.33028 0.619263 5.95722 1.00884 6.54867 1.48966C7.35439 2.14468 8.41557 2.14465 9.22128 1.48965Z"
              stroke="#6D6D6D"
            ></path>
          </svg>

          <svg
            v-else
            width="14"
            height="14"
            viewBox="0 0 16 14"
            fill="black"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.22128 1.48965C9.81272 1.00883 10.4397 0.619263 11.1354 0.619263C13.2314 0.619263 14.9672 2.39171 14.9672 4.60672C14.9672 4.88754 14.8939 5.31184 14.7964 5.7395C14.7014 6.15572 14.5934 6.53391 14.5427 6.70544C14.5338 6.73551 14.5219 6.7633 14.5065 6.79032C13.6182 8.34803 12.1979 9.99342 10.842 11.2513C10.1655 11.8789 9.51623 12.3995 8.97039 12.7595C8.69713 12.9398 8.45842 13.0741 8.26153 13.1616C8.05496 13.2534 7.93448 13.2755 7.88498 13.2755C7.68498 13.2755 7.41163 13.2077 7.06915 13.0509C6.7322 12.8967 6.35862 12.6705 5.96726 12.389C5.18448 11.826 4.36729 11.0689 3.68041 10.3105C3.2406 9.82481 2.51272 8.95615 1.89741 7.91742C1.27679 6.86972 0.802734 5.70212 0.802734 4.60672C0.802734 2.39171 2.53858 0.619263 4.63451 0.619263C5.33028 0.619263 5.95722 1.00884 6.54867 1.48966C7.35439 2.14468 8.41557 2.14465 9.22128 1.48965Z"
              stroke="#6D6D6D"
            ></path>
          </svg>
        </button>

        <button 
          @click.stop="toggleCartItems"
        >
          <svg
            v-if="!isInCart"
            width="14"
            height="14"
            viewBox="0 0 19 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.02325 11.9298C8.64038 11.9298 8.33008 12.2401 8.33008 12.623V17.175C8.33008 17.5579 8.64038 17.8682 9.02325 17.8682C9.40612 17.8682 9.71643 17.5581 9.71643 17.175V12.623C9.71643 12.2401 9.40612 11.9298 9.02325 11.9298Z"
              fill="#ee4a2e"
            ></path>
            <path
              d="M12.6033 11.9298C12.2205 11.9298 11.9102 12.2401 11.9102 12.623V17.175C11.9102 17.5579 12.2205 17.8682 12.6033 17.8682C12.9862 17.8682 13.2965 17.5581 13.2965 17.175V12.623C13.2965 12.2401 12.9862 11.9298 12.6033 11.9298Z"
              fill="#ee4a2e"
            ></path>
            <path
              d="M5.44122 11.9298C5.05835 11.9298 4.74805 12.2401 4.74805 12.623V17.175C4.74805 17.5579 5.05835 17.8682 5.44122 17.8682C5.82409 17.8682 6.13439 17.5581 6.13439 17.175V12.623C6.13439 12.2401 5.82409 11.9298 5.44122 11.9298Z"
              fill="#ee4a2e"
            ></path>
            <path
              d="M11.9152 3.77885L15.3944 8.51779C15.5828 8.77441 15.8857 8.9119 16.1967 8.98009C17.379 9.23934 18.2008 10.3935 17.9879 11.6436L16.7117 19.135C16.5567 20.0448 15.7683 20.7103 14.8454 20.7103H3.32653C2.41484 20.7103 1.63263 20.0605 1.46542 19.1643L0.0377224 11.5125C-0.211646 10.176 0.806688 8.93853 2.1662 8.92602H6.83354C6.83354 8.92602 7.33068 8.92602 7.42517 9.41223C7.49295 10.3124 6.83354 10.3124 6.83354 10.3124H2.64211C1.91092 10.3124 1.35473 10.969 1.47494 11.6902L2.58243 18.3352C2.67752 18.9057 3.17117 19.3239 3.7496 19.3239H14.2958C14.8742 19.3239 15.3679 18.9057 15.4629 18.3352L16.5704 11.6902C16.6906 10.969 16.1345 10.3124 15.4033 10.3124H15.1164C14.622 10.3124 14.5248 10.0039 13.9742 8.92602L10.7977 4.59934L9.42579 2.79559C9.18343 2.47695 8.70292 2.48051 8.46532 2.80272L5.01406 7.48301C4.82013 7.74599 4.44974 7.80198 4.18676 7.60805C3.92377 7.41413 3.86779 7.04373 4.06172 6.78075L7.69925 1.72545C8.32091 0.861489 9.59713 0.834049 10.2553 1.67049L11.8776 3.73201C11.8907 3.74694 11.9032 3.76256 11.9152 3.77885Z"
              fill="#ee4a2e"
            ></path>
          </svg>

          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 48 48"
            width="14"
            height="14"
          >
            <path
              style="fill: #c8e6c9"
              d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
            />
            <path
              style="fill: #4caf50"
              d="M34.586,14.586l-13.57,13.586l-5.602-5.586l-2.828,2.828l8.434,8.414l16.395-16.414L34.586,14.586z"
            />
          </svg>
        </button>
      </div>
    </div>

    <div class="p-4">
      <strong class="block text-sm font-semibold truncate text-gray-800">
        {{ product.name[locale] }}
      </strong>
      <p class="font-bold text-sm text-gray-800">{{ product.price }} грн</p>

      <p>
        <span class="text-sm inline-block mr-1">
          {{ product.producer ? product.producer : '' }}
        </span>
        <span class="text-sm text-gray-500">
          / {{
            product.category && product.category[locale]
              ? product.category[locale]
              : ''
          }}
        </span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { fromUnixTime, format } from 'date-fns';
import { ref, computed, inject } from 'vue';
import { useRoute } from 'vue-router';

const emitter = inject('emitter');

const { locale } = useI18n();
const route = useRoute();

const props = defineProps({
  product: {
    type: Object,
    default: () => ({
      id: '',
      name: { uk: '', en: '' },
      img: '',
      price: 0,
      quantity: 0,
      category: { uk: '', en: '' },
      producer: '',
    }),
  },
});

const formatDate = (v) => {
  const date = fromUnixTime(v.seconds); // Створює дату напряму з секунд
  return format(date, 'yyyy-MM-dd HH:mm:ss');
};

// Reactive state for favorites
const favorites = ref(JSON.parse(localStorage.getItem('favorites') || '[]'));
const cartItems = ref(JSON.parse(localStorage.getItem('cart') || '[]'));

// Computed property to check if the product is favorited
const isFavorited = computed(() => {
  return favorites.value.includes(props.product.id);
});

const isInCart = computed(() => {
  return cartItems.value.some(item => item.id === props.product.id);
});

// Function to toggle favorite status
const toggleFavorite = () => {
  const productId = props.product.id;
  // Fetch the latest favorites from localStorage
  const currentFavorites = JSON.parse(
    localStorage.getItem('favorites') || '[]',
  );

  if (currentFavorites.includes(productId)) {
    // Remove from favorites
    favorites.value = currentFavorites.filter((id) => id !== productId);
  } else {
    // Add to favorites
    favorites.value = [...currentFavorites, productId];
  }

  // Update local storage
  localStorage.setItem('favorites', JSON.stringify(favorites.value));
  emitter.emit('update-favorites', favorites.value.length);

  if (route.path === '/favorites') {
    emitter.emit('fetch-favorites');
  }
};
// Function to toggle favorite status
// const toggleCartItems = () => {
//   const productId = props.product.id;
//   // Fetch the latest favorites from localStorage
//   const currentCartList = JSON.parse(
//     localStorage.getItem('cart') || '[]',
//   );

//   if (currentCartList.includes(productId)) {
//     // Remove from favorites
//     cartItems.value = currentCartList.filter((id) => id !== productId);
//   } else {
//     // Add to favorites
//     cartItems.value = [...currentCartList, productId];
//   }

//   // Update local storage
//   localStorage.setItem('cart', JSON.stringify(cartItems.value));
//   emitter.emit('update-cart', cartItems.value.length);
// };

const toggleCartItems = () => {
  const product = { ...props.product, quantity: 1 };
  // Fetch the latest cart items from localStorage
  const currentCartList = JSON.parse(localStorage.getItem('cart') || '[]');

  // Check if the product is already in the cart
  const productIndex = currentCartList.findIndex(
    (item) => item.id === product.id,
  );

  if (productIndex !== -1) {
    // Remove from cart if the product already exists
    currentCartList.splice(productIndex, 1);
  } else {
    // Add to cart
    currentCartList.push(product);
  }

  // Update the cartItems reactive reference
  cartItems.value = currentCartList;

  // Update localStorage
  localStorage.setItem('cart', JSON.stringify(cartItems.value));

  // Emit event to update cart count
  emitter.emit('update-cart', cartItems.value.length);
};

</script>
