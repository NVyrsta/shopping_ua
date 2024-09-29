<!-- eslint-disable vue/no-v-html -->
<template>
  <PageLayout>
    <BreadCrumbs />

    <div class="relative pr-4">
      <SectionSeparator :title="$t('Footer.CooperationWithUs')" />

      <img
        src="@/assets/img/contacts-decor.png"
        alt="Shopping UA"
        class="absolute right-0 top-0 float-left opacity-20 md:left-0 md:top-4 md:float-none md:opacity-100"
      />

      <div class="ml-8 mt-3 pl-0 md:pl-28">
        <h2 class="mb-8 text-center text-xl font-semibold text-red-500">
          {{ $t('Contacts.CooperationTitle') }}
        </h2>

        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div class="block gap-4 sm:flex">
            <SvgIcon
              id="cooperation1"
              width="91"
              height="74"
              fill="#3F3F3F"
              class="float-left mr-2 shrink-0 sm:float-none sm:mr-0"
            />

            <p class="text-sm leading-6 text-gray-600">
              {{ $t('Contacts.CooperationDescription1') }}
            </p>
          </div>

          <div class="block gap-4 sm:flex">
            <SvgIcon
              id="cooperation5"
              width="91"
              height="74"
              fill="#3F3F3F"
              class="float-left mr-2 shrink-0 sm:float-none sm:mr-0"
            />

            <p class="text-sm leading-6 text-gray-600">
              {{ $t('Contacts.CooperationDescription5') }}
            </p>
          </div>

          <div class="block gap-4 sm:flex">
            <SvgIcon
              id="cooperation2"
              width="91"
              height="74"
              fill="#3F3F3F"
              class="float-left mr-2 shrink-0 sm:float-none sm:mr-0"
            />

            <p class="text-sm leading-6 text-gray-600">
              {{ $t('Contacts.CooperationDescription2') }}
            </p>
          </div>

          <div class="block gap-4 sm:flex">
            <SvgIcon
              id="cooperation6"
              width="91"
              height="74"
              fill="#3F3F3F"
              class="float-left mr-2 shrink-0 sm:float-none sm:mr-0"
            />

            <p class="text-sm leading-6 text-gray-600">
              {{ $t('Contacts.CooperationDescription6') }}
            </p>
          </div>

          <div class="block gap-4 sm:flex">
            <SvgIcon
              id="cooperation3"
              width="91"
              height="74"
              fill="#3F3F3F"
              class="float-left mr-2 shrink-0 sm:float-none sm:mr-0"
            />

            <p class="text-sm leading-6 text-gray-600">
              {{ $t('Contacts.CooperationDescription3') }}
            </p>
          </div>

          <div class="block gap-4 sm:flex">
            <SvgIcon
              id="cooperation7"
              width="91"
              height="74"
              fill="#3F3F3F"
              class="float-left mr-2 shrink-0 sm:float-none sm:mr-0"
            />

            <p class="text-sm leading-6 text-gray-600">
              {{ $t('Contacts.CooperationDescription7') }}
            </p>
          </div>

          <div class="block gap-4 sm:flex">
            <SvgIcon
              id="cooperation4"
              width="91"
              height="74"
              fill="#3F3F3F"
              class="float-left mr-2 shrink-0 sm:float-none sm:mr-0"
            />

            <p class="text-sm leading-6 text-gray-600">
              {{ $t('Contacts.CooperationDescription4') }}
            </p>
          </div>

          <div class="block gap-4 sm:flex">
            <SvgIcon
              id="cooperation8"
              width="91"
              height="74"
              fill="#3F3F3F"
              class="float-left mr-2 shrink-0 sm:float-none sm:mr-0"
            />

            <p class="text-sm leading-6 text-gray-600">
              {{ $t('Contacts.CooperationDescription8') }}
            </p>
          </div>
        </div>
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
