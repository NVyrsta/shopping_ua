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
      >
      
      <div class="pl-0 md:pl-28 mt-3 ml-8 text-gray-600 md:w-2/3">
        <p>{{ $t('Contacts.ContactsDescription') }}</p>

        <p class="mt-4 font-semibold text-gray-600 text-lg">{{ $t('Contacts.Phones') }}:</p>

        <p class="mt-2 font-semibold text-black text-2xl">
          (099) 265 11 77
        </p>

        <p class="mt-2 font-semibold text-black text-2xl">
          (067) 265 11 77
        </p>

        <p class="mt-4 font-semibold text-gray-600 text-md">{{ $t('Contacts.Schedule') }}</p>

        <p class="mt-6  text-gray-600 text-md">
          {{ $t('Contacts.Address') }}: 
          <span 
            v-html="$t('Contacts.AddressDescription')" 
            class="font-semibold" 
          />
        </p>
      </div>
    </div>

    <div class="relative flex items-center justify-center bg-orange-100 py-20 overflow-hidden mt-16">
      <img 
        src="@/assets/img/contacts-decor1.png" 
        alt="Shopping UA" 
        class="absolute top-0 left-[-30%] xl:left-[-10%] w-1/2"
      >

      <div class="flex justify-center items-center flex-col">
        <div class="font-bold text-lg leading-5 tracking-wide uppercase relative pl-20">
          <div class="absolute top-1/2 left-0 transform -translate-y-1/2 w-16 h-1 bg-gray-800 rounded-sm"></div>

          {{ $t('Contacts.DiscountCount', {count: '10%'}) }}
        </div>

        <p class="my-4 text-center leading-6 w-2/3">{{ $t('Contacts.SignUpToGetDiscount') }}</p>

        <button 
          @click="goBack" 
          disabled 
          class="block text-md text-white bg-red-500 hover:bg-red-700 px-14 py-2 disabled:opacity-75 cursor-not-allowed"
        >
          {{ $t('Contacts.SignUp') }}
        </button>
      </div>

      <img 
        src="@/assets/img/contacts-decor2.png" 
        alt="Shopping UA" 
        class="absolute top-0 right-[-30%] xl:right-[-10%] w-1/2"
      >
    </div>
  </PageLayout>
</template>

<script setup>
import PageLayout from '@/layouts/PageLayout.vue';
import SectionSeparator from '@/components/SectionSeparator.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';
</script>
