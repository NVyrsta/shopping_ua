<!-- eslint-disable vue/no-v-html -->
<template>
  <PageLayout>
    <BreadCrumbs />

    <div class="relative pr-4">
      <SectionSeparator :title="$t('Breadcrumbs.Return')" />

      <img
        src="@/assets/img/return-decor.png"
        alt="Shopping UA"
        class="relative md:absolute top-0 left-0 float-left md:float-none"
      />

      <div
        v-html="$t('Return.PageContent')"
        class="pl-0 md:pl-28 mt-3 ml-8 text-gray-600"
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
