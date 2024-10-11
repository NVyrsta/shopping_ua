<template>
  <div
    class="bg-white px-4 py-2 shadow-md"
    :class="{
      'width-full fixed top-0': isHeaderSticky
    }"
  >
    <div
      class="relative z-10 flex items-center justify-between bg-transparent py-1"
    >
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
              class="flex items-center justify-start gap-2 focus:outline-none"
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
              class="absolute -right-3 -top-3 flex h-3 min-w-3 items-center justify-center bg-orange-600 px-0.5 text-xs leading-none text-white"
            >
              {{ favoritesCount > 9 ? '9+' : favoritesCount }}
            </span>
          </div>
        </router-link>

        <router-link to="/basket">
          <div class="relative mr-6">
            <button
              class="flex items-center justify-start gap-2 focus:outline-none"
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
              class="absolute -right-3 -top-3 flex h-3 min-w-3 items-center justify-center bg-orange-600 px-0.5 text-xs leading-none text-white"
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

  const updateFavoritesCount = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    favoritesCount.value = favorites.length;
  };

  const updateCartCount = () => {
    const selected = JSON.parse(localStorage.getItem('cart') || '[]');

    cartCount.value = selected.reduce((acc, item) => {
      if (item.reserved && Array.isArray(item.reserved)) {
        const totalReservedAmount = item.reserved.reduce(
          (sum, reserved) => sum + (reserved.amount || 0),
          0
        );
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
