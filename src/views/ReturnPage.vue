<!-- eslint-disable vue/no-v-html -->
<template>
  <PageLayout>
    <BreadCrumbs />

    <div class="relative pr-4">
      <SectionSeparator :title="$t('Breadcrumbs.Return')" />

      <img
        src="@/assets/img/return-decor.png"
        alt="Shopping UA"
        class="relative left-0 top-0 float-left md:absolute md:float-none"
      />

      <div
        v-html="$t('Return.PageContent')"
        class="ml-8 mt-3 pl-0 text-gray-600 md:pl-28"
      />
    </div>

    <DiscountBlock />
  </PageLayout>
</template>

<script setup>
  import PageLayout from '@/layouts/PageLayout.vue';
  import SectionSeparator from '@/components/elements/SectionSeparator.vue';
  import DiscountBlock from '@/components/blocks/DiscountBlock.vue';
  import BreadCrumbs from '@/components/BreadCrumbs.vue';
</script>
