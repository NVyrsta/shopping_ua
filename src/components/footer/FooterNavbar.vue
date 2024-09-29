<template>
  <div class="bg-white px-4 py-12 shadow-[0px_-4px_10px_0px_rgba(0,0,0,0.1)]">
    <div
      class="flex flex-wrap items-center justify-between gap-6 py-1 text-center"
    >
      <div
        class="flex w-full flex-col items-center justify-center gap-2 text-center sm:w-fit"
      >
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

      <div
        class="grid w-full grid-cols-1 gap-4 p-4 text-center sm:w-2/3 sm:text-left md:grid-cols-3"
      >
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
    { path: '/cooperation', label: t('Footer.CooperationWithUs') }
  ]);

  const customerLinks = computed(() => [
    { path: '/basket', label: t('Header.Cart') },
    { path: '/favorites', label: t('Header.Chosen') },
    { path: '/return', label: t('Breadcrumbs.Return') }
  ]);

  const catalogueLinks = computed(() => [
    { path: '/women', label: t('Breadcrumbs.women_clothing') },
    { path: '/men', label: t('Breadcrumbs.menswear') },
    { path: '/children', label: t('Breadcrumbs.childrens-clothes') }
  ]);
</script>
