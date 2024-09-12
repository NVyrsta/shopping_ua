<!-- eslint-disable vue/no-v-html -->
<template>
  <PageLayout>
    <BreadCrumbs />

    <div class="relative pr-4">
      <SectionSeparator :title="$t('Footer.CooperationWithUs')" />

      <img 
        src="@/assets/img/contacts-decor.png" 
        alt="Shopping UA" 
        class="absolute opacity-20 md:opacity-100 right-0 md:left-0 top-0 md:top-4 float-left md:float-none"
      >

      <div class="pl-0 md:pl-28 mt-3 ml-8">
        <h2 class="text-red-500 font-semibold text-xl text-center mb-8">
          {{ $t('Contacts.CooperationTitle') }}
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="block gap-4 sm:flex">
            <SvgIcon 
              id="cooperation1"
              width="91"
              height="74"
              fill="#3F3F3F"
              class="shrink-0 float-left sm:float-none mr-2 sm:mr-0"
            />
  
            <p class="text-sm text-gray-600 leading-6">
              {{ $t('Contacts.CooperationDescription1') }}
            </p>
          </div>
  
          <div class="block gap-4 sm:flex">
            <SvgIcon 
              id="cooperation5"
              width="91"
              height="74"
              fill="#3F3F3F"
              class="shrink-0 float-left sm:float-none mr-2 sm:mr-0"
            />
  
            <p class="text-sm text-gray-600 leading-6">
              {{ $t('Contacts.CooperationDescription5') }}
            </p>
          </div>
  
          <div class="block gap-4 sm:flex">
            <SvgIcon 
              id="cooperation2"
              width="91"
              height="74"
              fill="#3F3F3F"
              class="shrink-0 float-left sm:float-none mr-2 sm:mr-0"
            />
  
            <p class="text-sm text-gray-600 leading-6">
              {{ $t('Contacts.CooperationDescription2') }}
            </p>
          </div>
  
          <div class="block gap-4 sm:flex">
            <SvgIcon 
              id="cooperation6"
              width="91"
              height="74"
              fill="#3F3F3F"
              class="shrink-0 float-left sm:float-none mr-2 sm:mr-0"
            />
  
            <p class="text-sm text-gray-600 leading-6">
              {{ $t('Contacts.CooperationDescription6') }}
            </p>
          </div>
  
          <div class="block gap-4 sm:flex">
            <SvgIcon 
              id="cooperation3"
              width="91"
              height="74"
              fill="#3F3F3F"
              class="shrink-0 float-left sm:float-none mr-2 sm:mr-0"
            />
  
            <p class="text-sm text-gray-600 leading-6">
              {{ $t('Contacts.CooperationDescription3') }}
            </p>
          </div>
  
          <div class="block gap-4 sm:flex">
            <SvgIcon 
              id="cooperation7"
              width="91"
              height="74"
              fill="#3F3F3F"
              class="shrink-0 float-left sm:float-none mr-2 sm:mr-0"
            />
  
            <p class="text-sm text-gray-600 leading-6">
              {{ $t('Contacts.CooperationDescription7') }}
            </p>
          </div>
  
          <div class="block gap-4 sm:flex">
            <SvgIcon 
              id="cooperation4"
              width="91"
              height="74"
              fill="#3F3F3F"
              class="shrink-0 float-left sm:float-none mr-2 sm:mr-0"
            />
  
            <p class="text-sm text-gray-600 leading-6">
              {{ $t('Contacts.CooperationDescription4') }}
            </p>
          </div>
  
          <div class="block gap-4 sm:flex">
            <SvgIcon 
              id="cooperation8"
              width="91"
              height="74"
              fill="#3F3F3F"
              class="shrink-0 float-left sm:float-none mr-2 sm:mr-0"
            />
  
            <p class="text-sm text-gray-600 leading-6">
              {{ $t('Contacts.CooperationDescription8') }}
            </p>
          </div>
        </div>
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
import SectionSeparator from '@/components/elements/SectionSeparator.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';
</script>
