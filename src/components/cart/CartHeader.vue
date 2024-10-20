<template>
  <div class="banner">
    <div class="content-wrapper flex items-center justify-between gap-2">
      <div class="flex-1">
        <a
          class="flex cursor-pointer items-center gap-2"
          @click.prevent="goBack"
        >
          <SvgIcon
            id="back"
            width="7"
            height="12"
            fill="white"
          />

          <span class="text-sm font-medium uppercase text-white">
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
            class="h-[28px] w-[86px] md:h-[38px] md:w-[114px]"
          />
        </router-link>
      </div>

      <LanguageSwitcher class="flex-1" />
    </div>
  </div>
</template>

<script setup>
  import { useGoBack } from '@/composables/useGoBack';
  import LanguageSwitcher from '@/components/LanguageSwitcher.vue';

  const { goBack } = useGoBack();
</script>

<style scoped>
  .banner {
    background-color: #353535;
    padding: 8px 10px;
  }
</style>
