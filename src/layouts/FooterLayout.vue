<template>
  <div>
    <BenefitsBanner />

    <FooterNavbar />

    <div class="flex justify-start items-center gap-2 p-4">
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
    </div>
  </div>
</template>

<script setup>
  import BenefitsBanner from '@/components/footer/BenefitsBanner.vue';
  import FooterNavbar from '@/components/footer/FooterNavbar.vue';
</script>
