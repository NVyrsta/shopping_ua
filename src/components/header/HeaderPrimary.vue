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
              <svg
                width="18"
                height="16"
                viewBox="0 0 18 16"
                fill="#ee4a2e"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.79644 1.56168C10.5849 0.890635 11.6055 0.05 12.8582 0.05C15.6648 0.05 17.95 2.38515 17.95 5.25762C17.95 5.92847 17.8382 6.59038 17.6493 7.22988C17.5308 7.63105 17.0943 7.83571 16.691 7.70385C16.2501 7.55972 16.0266 7.06944 16.1509 6.61409C16.2797 6.14196 16.3465 5.68709 16.3465 5.25768C16.3465 3.29255 14.7828 1.69192 12.8582 1.69192C12.3537 1.69192 11.7688 1.94917 11.2065 2.32857C10.6427 2.70896 10.095 3.21664 9.66357 3.7275C9.51273 3.90611 9.25915 3.99904 9 3.99904C8.74085 3.99904 8.48727 3.90611 8.33643 3.7275C7.90501 3.21664 7.35731 2.70896 6.79354 2.32857C6.23123 1.94917 5.64632 1.69192 5.14175 1.69192C3.21725 1.69192 1.65347 3.29249 1.65347 5.25768C1.65347 6.05057 1.94777 6.99957 2.48351 8.01378C3.01964 9.02872 3.79938 10.1124 4.77484 11.1756C5.69764 12.1814 6.61159 12.9629 7.36372 13.4933C7.73974 13.7585 8.07597 13.9614 8.35319 14.0983C8.62807 14.234 8.85172 14.3082 9 14.3082C9.13745 14.3082 9.33329 14.2532 9.57009 14.1518C9.8085 14.0497 10.0936 13.8982 10.4116 13.6999C11.0475 13.3033 11.8173 12.718 12.6103 11.9615C12.9415 11.6456 13.4649 11.636 13.788 11.9552C14.102 12.2654 14.1107 12.769 13.7955 13.0738C13.0121 13.8314 12.1321 14.5516 11.2869 15.082C10.4399 15.6137 9.63507 15.95 9 15.95C8.65302 15.95 8.24719 15.8379 7.80521 15.6382C7.36376 15.4387 6.88936 15.1534 6.40613 14.8104C5.43966 14.1243 4.44152 13.2102 3.60618 12.2997C3.07082 11.7162 2.1809 10.6688 1.4251 9.40936C0.668737 8.14903 0.05 6.68185 0.05 5.25762C0.05 2.38515 2.33521 0.05 5.14175 0.05C6.39451 0.05 7.41505 0.890657 8.20355 1.5617C8.6751 1.96301 9.32489 1.96299 9.79644 1.56168Z"
                  fill="#ee4a2eackGroundRed"
                  stroke="white"
                  stroke-width="0.1"
                ></path>
              </svg>
  
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
              <svg
                width="19"
                height="21"
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
