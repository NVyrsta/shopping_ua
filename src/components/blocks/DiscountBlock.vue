<template>
  <div
    class="relative flex items-center justify-center bg-orange-100 py-20 overflow-hidden mt-16"
  >
    <img
      src="@/assets/img/contacts-decor1.png"
      alt="Shopping UA"
      class="absolute top-0 left-[-30%] xl:left-[-10%] w-1/2"
    />

    <div class="flex justify-center items-center flex-col">
      <div
        class="font-bold text-lg leading-5 tracking-wide uppercase relative pl-20"
      >
        <div
          class="absolute top-1/2 left-0 transform -translate-y-1/2 w-16 h-1 bg-gray-800 rounded-sm"
        ></div>

        {{ $t('Contacts.DiscountCount', { count: '10%' }) }}
      </div>

      <p class="my-4 text-center leading-6 w-2/3">
        {{ $t('Contacts.SignUpToGetDiscount') }}
      </p>

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
    />
  </div>
</template>
