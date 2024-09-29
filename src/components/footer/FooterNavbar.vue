<template>
  <div 
    class="bg-white py-12 px-4 shadow-[0px_-4px_10px_0px_rgba(0,0,0,0.1)]"
  >
    <div class="flex justify-between items-center flex-wrap text-center gap-6 py-1">
      <div class="flex items-center justify-center flex-col gap-2 text-center w-full sm:w-fit">
        <router-link to="/"> 
          <img
            src="@/assets/img/logo.png"
            alt="Shopping UA"
            width="150px"
            height="50px"
          />
        </router-link>

        <span class="text-xs">
          &copy; {{ new Date().getFullYear() }}. <br />
          {{ $t('Main.AllRightsReserved') }}
        </span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 w-full sm:w-2/3 text-center sm:text-left">
        <AccordionColumn
          :title="$t('Footer.Catalogue')"
          :links="catalogueLinks"
        />      

        <AccordionColumn
          :title="$t('Footer.ForTheBuyer')"
          :links="customerLinks"
        />   

        <AccordionColumn
          :title="$t('Footer.ForTheSeller')"
          :links="sellerLinks"
        />      
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import AccordionColumn from '@/components/footer/AccordionColumn.vue';

const { t } = useI18n();

const sellerLinks = computed(() => [
  { path: '/contacts', label: t('Footer.Contacts') },
  { path: '/cooperation', label: t('Footer.CooperationWithUs') },
]);

const customerLinks = computed(() => [
  { path: '/basket', label: t('Header.Cart') },
  { path: '/favorites', label: t('Header.Chosen') },
  { path: '/return', label: t('Breadcrumbs.Return') },
]);

const catalogueLinks = computed(() => [
  { path: '/women', label: t('Breadcrumbs.women_clothing') },
  { path: '/men', label: t('Breadcrumbs.menswear') },
  { path: '/children', label: t('Breadcrumbs.childrens-clothes') },
]);
</script>
