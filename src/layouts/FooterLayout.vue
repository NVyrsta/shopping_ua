<template>
  <div>
    <BenefitsBanner />

    <FooterNavbar />

    <div class="flex items-center justify-start gap-2 p-4">
      <img
        src="https://shopping.ua/static/media/visa.d4b7abe5042cf749b1794d91d31b8e58.svg"
        alt="Visa"
      />

      <img
        src="https://shopping.ua/static/media/masterCard.b87f177873d626b1ea1d59f862110de2.svg"
        alt="MasterCard"
      />
      <img
        src="https://shopping.ua/static/media/NP.3d77914fc4467541cdc851e703761fd6.svg"
        alt="Nova Poshta"
      />

      <SvgIcon
        id="eye"
        width="14"
        height="14"
        fill="#6d6d6d"
        class="ml-auto"
      />

      <span class="text-gray-400">{{ uniqueVisitors }}</span>
    </div>
  </div>
</template>

<script setup>
  import { onMounted } from 'vue';
  import BenefitsBanner from '@/components/footer/BenefitsBanner.vue';
  import FooterNavbar from '@/components/footer/FooterNavbar.vue';
  import {
    uniqueVisitors,
    initializeVisitorTracking
  } from '@/app/core/plugins/visitorTracker';

  onMounted(async () => {
    await initializeVisitorTracking();
  });
</script>
