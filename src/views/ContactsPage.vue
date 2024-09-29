<!-- eslint-disable vue/no-v-html -->
<template>
  <PageLayout>
    <BreadCrumbs />

    <div class="relative pr-4">
      <SectionSeparator :title="$t('Main.Contacts')" />

      <img
        src="@/assets/img/contacts-decor.png"
        alt="Shopping UA"
        class="relative left-0 top-0 float-left md:absolute md:top-4 md:float-none"
      />

      <div class="ml-8 mt-3 pl-0 text-gray-600 md:w-2/3 md:pl-28">
        <p>{{ $t('Contacts.ContactsDescription') }}</p>

        <p class="mt-4 text-lg font-semibold text-gray-600">
          {{ $t('Contacts.Phones') }}:
        </p>

        <p class="mt-2 text-2xl font-semibold text-black">(099) 265 11 77</p>

        <p class="mt-2 text-2xl font-semibold text-black">(067) 265 11 77</p>

        <p class="text-md mt-4 font-semibold text-gray-600">
          {{ $t('Contacts.Schedule') }}
        </p>

        <p class="text-md mt-6 text-gray-600">
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
