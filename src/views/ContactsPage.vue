<!-- eslint-disable vue/no-v-html -->
<template>
  <PageLayout>
    <BreadCrumbs />

    <div class="relative pr-4">
      <SectionSeparator :title="$t('Main.Contacts')" />

      <img
        src="@/assets/img/contacts-decor.png"
        alt="Shopping UA"
        class="relative md:absolute top-0 md:top-4 left-0 float-left md:float-none"
      />

      <div class="pl-0 md:pl-28 mt-3 ml-8 text-gray-600 md:w-2/3">
        <p>{{ $t('Contacts.ContactsDescription') }}</p>

        <p class="mt-4 font-semibold text-gray-600 text-lg">
          {{ $t('Contacts.Phones') }}:
        </p>

        <p class="mt-2 font-semibold text-black text-2xl">(099) 265 11 77</p>

        <p class="mt-2 font-semibold text-black text-2xl">(067) 265 11 77</p>

        <p class="mt-4 font-semibold text-gray-600 text-md">
          {{ $t('Contacts.Schedule') }}
        </p>

        <p class="mt-6 text-gray-600 text-md">
          {{ $t('Contacts.Address') }}:
          <span
            v-html="$t('Contacts.AddressDescription')"
            class="font-semibold"
          />
        </p>
      </div>
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
