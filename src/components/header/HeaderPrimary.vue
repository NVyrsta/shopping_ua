<template>
  <div 
    class="bg-white shadow-md py-2 px-4"
    :class="{
      'fixed top-0 width-full': isHeaderSticky
    }"
  >
    <div class="flex justify-between items-center py-1">
      <BurgerMenu />

      <div class="flex items-center">
        <router-link to="/"> 
          <img
            src="@/assets/img/logo.png"
            alt="Shopping UA"
            width="150px"
            height="50px"
          />
        </router-link>
      </div>

      <div class="flex">
        <router-link to="/favorites">
          <div class="relative mr-6">
            <button
              class="flex justify-start gap-2 items-center focus:outline-none"
            >
              <SvgIcon 
                id="favorite-primary"
                width="18"
                height="16"
                fill="#ee4a2e"
              />  

              <div class="hidden sm:flex">
                <span class="underline-effect">
                  {{ $t('Header.Chosen') }}
                </span>
              </div>
            </button>
  
            <span
              v-if="favoritesCount > 0"
              class="absolute -top-3 -right-3 flex items-center justify-center px-0.5 min-w-3 h-3 text-xs leading-none text-white bg-orange-600"
            >
              {{ favoritesCount > 9 ? '9+' : favoritesCount }}
            </span>
          </div>
        </router-link>

        <router-link to="/basket">
          <div class="relative mr-6">
            <button
              class="flex justify-start gap-2 items-center focus:outline-none"
            >
              <SvgIcon 
                id="cart-primary"
                width="19"
                height="21"
                fill="#ee4a2e"
              /> 

              <div class="hidden sm:flex">
                <span class="underline-effect">
                  {{ $t('Header.Cart') }}
                </span>
              </div>
            </button>

            <span
              v-if="cartCount > 0"
              class="absolute -top-3 -right-3 flex items-center justify-center px-0.5 min-w-3 h-3 text-xs leading-none text-white bg-orange-600"
            >
              {{ cartCount > 9 ? '9+' : cartCount }}
            </span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onMounted, onUnmounted } from 'vue';
import BurgerMenu from '@/components/header/BurgerMenu.vue';

const isHeaderSticky = ref(false);
const emitter = inject('emitter');
const favoritesCount = ref(0);
const cartCount = ref(0);

// const updateFavoritesCount = (count) => {
//   favoritesCount.value = count;
// };

const updateFavoritesCount = () => {
  // Отримати поточний список улюблених з localStorage
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

  // Оновити кількість улюблених
  favoritesCount.value = favorites.length;
};

// const updateCartCount = (count) => {
//   cartCount.value = count;
// };

const updateCartCount = () => {
  // Отримати поточний кошик з localStorage
  const selected = JSON.parse(localStorage.getItem('cart') || '[]');

  // Підрахунок загальної кількості товарів у масиві selected
  cartCount.value = selected.reduce((acc, item) => {
    if (item.reserved && Array.isArray(item.reserved)) {
      // Якщо є масив reserved, проходимося по ньому і підраховуємо кількість
      const totalReservedAmount = item.reserved.reduce((sum, reserved) => sum + (reserved.amount || 0), 0);
      return acc + totalReservedAmount;
    }
    return acc;
  }, 0);
};

const handleScroll = () => {
  if (window.scrollY > 37) {
    isHeaderSticky.value = true;
  } else {
    isHeaderSticky.value = false;
  }
};

onMounted(() => { 
  // const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  // favoritesCount.value = favorites.length;

  updateCartCount();
  updateFavoritesCount();
 
  emitter.on('update-favorites', updateFavoritesCount);
  emitter.on('update-cart', updateCartCount);

  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  emitter.off('update-favorites', updateFavoritesCount);
  emitter.off('update-cart', updateCartCount);

  window.removeEventListener('scroll', handleScroll);
});
</script>
