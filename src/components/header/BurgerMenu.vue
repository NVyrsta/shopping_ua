<template>
  <div>
    <!-- Burger Button -->
    <input
      type="checkbox"
      id="burger-menu"
      class="burger-menu visuallyHidden lg:hidden"
      v-model="isMenuOpen"
    />

    <label
      for="burger-menu"
      class="relative z-30 cursor-pointer lg:hidden"
    >
      <div class="hamburger hamburger2">
        <span class="bar bar1"></span>
        <span class="bar bar2"></span>
        <span class="bar bar3"></span>
        <span class="bar bar4"></span>
      </div>
    </label>

    <!-- Mobile Menu -->
    <div
      v-if="isMenuOpen"
      class="fixed left-0 top-0 z-20 flex h-full w-full flex-col items-center justify-center gap-4 bg-white text-gray-700 lg:hidden"
    >
      <router-link
        to="/"
        class="text-xl"
        :class="{ 'font-bold': isHomePageActive }"
        @click="isMenuOpen = false"
      >
        <span>{{ $t('Breadcrumbs.women') }}</span>
      </router-link>

      <router-link
        to="/men"
        class="text-xl"
        active-class="font-bold"
        @click="isMenuOpen = false"
      >
        <span>{{ $t('Breadcrumbs.men') }}</span>
      </router-link>

      <router-link
        to="/children"
        class="text-xl"
        active-class="font-bold"
        @click="isMenuOpen = false"
      >
        <span>{{ $t('Breadcrumbs.children') }}</span>
      </router-link>

      <GenderRoutes />

      <router-link
        to="/brands"
        class="text-xl"
        active-class="font-bold"
        @click="isMenuOpen = false"
      >
        <span>{{ $t('Breadcrumbs.Brands') }}</span>
      </router-link>

      <DynamicRoute
        class="text-xl"
        link-url="new-products"
        :link-text="$t('Breadcrumbs.Novelty')"
      />

      <DynamicRoute
        class="text-xl"
        link-url="discount-products"
        :link-text="$t('Breadcrumbs.discount-products')"
      />
    </div>

    <!-- Desktop Menu -->
    <div class="hidden items-center justify-start gap-6 lg:flex">
      <router-link
        to="/"
        :class="{ 'font-bold': isHomePageActive }"
      >
        <span class="underline-effect">
          {{ $t('Breadcrumbs.women') }}
        </span>
      </router-link>

      <router-link
        to="/men"
        active-class="font-bold"
      >
        <span class="underline-effect">
          {{ $t('Breadcrumbs.men') }}
        </span>
      </router-link>

      <router-link
        to="/children"
        active-class="font-bold"
      >
        <span class="underline-effect">
          {{ $t('Breadcrumbs.children') }}
        </span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import DynamicRoute from '@/components/header/DynamicRoute.vue';
  import GenderRoutes from '@/components/header/GenderRoutes.vue';

  const isMenuOpen = ref(false);
  const route = useRoute();

  const isHomePageActive = computed(() => {
    return route.path === '/' || route.path === '/women';
  });
</script>

<style scoped>
  .visuallyHidden {
    position: absolute;
    overflow: hidden;
    clip: rect(0 0 0 0);
    height: 1px;
    width: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
  }

  h1 {
    text-align: center;
  }

  .container {
    width: 70%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }

  .hamburger {
    margin: 0 auto;
    width: 20px;
    height: 20px;
    position: relative;
  }

  .hamburger .bar {
    padding: 0;
    width: 20px;
    height: 2px;
    background-color: black;
    display: block;
    border-radius: 2px;
    transition: all 0.4s ease-in-out;
    position: absolute;
  }

  .bar1 {
    top: 9px;
  }

  .bar2,
  .bar3 {
    top: 13.5px;
  }

  .bar3 {
    right: 0;
  }

  .bar4 {
    bottom: 0;
  }

  .burger-menu:checked + label > .hamburger2 > .bar1 {
    transform: translateX(40px);
    background-color: transparent;
  }

  .burger-menu:checked + label > .hamburger2 > .bar2 {
    transform: rotate(45deg);
  }

  .burger-menu:checked + label > .hamburger2 > .bar3 {
    transform: rotate(-45deg);
  }

  .burger-menu:checked + label > .hamburger2 > .bar4 {
    transform: translateX(-40px);
    background-color: transparent;
  }
</style>
