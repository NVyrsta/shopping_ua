<script setup>
  import { useGoBack } from '@/composables/useGoBack';
  import LanguageSwitcher from '@/components/LanguageSwitcher.vue';

  const { goBack } = useGoBack();
</script>

<template>
  <div class="banner flex justify-between items-center gap-2">
    <div class="flex-1">
      <a
        class="flex items-center gap-2 cursor-pointer"
        @click.prevent="goBack"
      >
        <SvgIcon
          id="back"
          width="7"
          height="12"
          fill="white"
        />

        <span class="text-sm text-white font-medium uppercase">
          {{ $t('Main.Back') }}
        </span>
      </a>
    </div>

    <div class="flex-1">
      <router-link
        to="/"
        class="flex items-center justify-center"
      >
        <img
          src="@/assets/img/logo-dark-bg.png"
          alt="Shopping UA"
          class="w-[86px] h-[28px] md:w-[114px] md:h-[38px]"
        />
      </router-link>
    </div>

    <LanguageSwitcher class="flex-1" />
  </div>
</template>

<style scoped>
  .banner {
    background-color: #353535;
    padding: 8px 10px;
  }
</style>
