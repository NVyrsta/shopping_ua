<template>
  <div>
    <!-- Кнопка для відкриття/закриття мобільного меню -->
    <input 
      type="checkbox" 
      id="burger-menu" 
      class="burger-menu visuallyHidden lg:hidden"
      v-model="isMenuOpen"
    >

    <label 
    for="burger-menu"
    class="relative z-20 cursor-pointer lg:hidden"
    >
      <div class="hamburger hamburger2">
        <span class="bar bar1"></span>
        <span class="bar bar2"></span>
        <span class="bar bar3"></span>
        <span class="bar bar4"></span>
      </div>
    </label>

    <!-- Мобільне меню -->
    <div 
      v-if="isMenuOpen" 
      class="fixed top-0 left-0 z-10 w-full h-full bg-white flex flex-col items-center justify-center text-gray-700 gap-4 lg:hidden"
    >
      <router-link 
        to="/"
        class="text-xl"
        @click="isMenuOpen = false"
      >
        <span>{{ $t('Breadcrumbs.women') }}</span>
      </router-link>

      <router-link 
        to="/men" 
        class="text-xl"
        @click="isMenuOpen = false"
      >
        <span>{{ $t('Breadcrumbs.men') }}</span>
      </router-link>

      <router-link 
        to="/children" 
        class="text-xl"
        @click="isMenuOpen = false"
      >
        <span>{{ $t('Breadcrumbs.children') }}</span>
      </router-link>
    </div>

    <!-- Десктопне меню -->
    <div class="hidden lg:flex items-center justify-start gap-6">
      <router-link 
        to="/"
        active-class="font-bold"
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
import { ref } from 'vue';

const isMenuOpen = ref(false);
</script>


<style scoped>
.visuallyHidden {
    position: absolute; 
    overflow: hidden; 
    clip: rect(0 0 0 0); 
    height: 1px; width: 1px; 
    margin: -1px; padding: 0; border: 0; 
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

.burger-menu:checked + label > .hamburger2 > .bar1{
    transform: translateX(40px);
    background-color: transparent;
}

.burger-menu:checked + label > .hamburger2 > .bar2{
    transform: rotate(45deg);
}

.burger-menu:checked + label > .hamburger2 > .bar3{
    transform: rotate(-45deg);
}

.burger-menu:checked + label > .hamburger2 > .bar4{
    transform: translateX(-40px);
    background-color: transparent;
}
</style>
