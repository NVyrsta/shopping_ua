<script setup>
</script>

<template>
  <div class="banner flex justify-between items-center gap-2">
    <div class="flex-1">
      <span class="text-xs">
        {{ new Date().getFullYear() }}. {{ $t('Main.AllRightsReserved') }}
      </span>
    </div>

    <div class="flex-1">
      <router-link 
        to="/"
        class="flex items-center justify-center"
      >
        <img 
          src="@/assets/img/logo-light-bg.png" 
          alt="Shopping UA" 
          class="w-[86px] h-[28px] md:w-[114px] md:h-[38px]"
        >
      </router-link>
    </div>

    <div class="flex-1"/>
  </div>
</template>

<style scoped>
.banner {
  background: #e5e5e5;
  box-shadow: inset 0 4px 25px hsla(0, 0%, 80%, .27);
  padding: 8px 10px;
  width: 100%;
  color: #a4a4a4;
}
</style>
