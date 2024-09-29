<template>
  <div
    class="relative mt-16 flex items-center justify-center overflow-hidden bg-orange-100 py-20"
  >
    <img
      src="@/assets/img/contacts-decor1.png"
      alt="Shopping UA"
      class="absolute left-[-30%] top-0 w-1/2 xl:left-[-10%]"
    />

    <div class="flex flex-col items-center justify-center">
      <div
        class="relative pl-20 text-lg font-bold uppercase leading-5 tracking-wide"
      >
        <div
          class="absolute left-0 top-1/2 h-1 w-16 -translate-y-1/2 transform rounded-sm bg-gray-800"
        ></div>

        {{ $t('Contacts.DiscountCount', { count: '10%' }) }}
      </div>

      <p class="my-4 w-2/3 text-center leading-6">
        {{ $t('Contacts.SignUpToGetDiscount') }}
      </p>

      <button
        @click="goBack"
        disabled
        class="text-md block cursor-not-allowed bg-red-500 px-14 py-2 text-white hover:bg-red-700 disabled:opacity-75"
      >
        {{ $t('Contacts.SignUp') }}
      </button>
    </div>

    <img
      src="@/assets/img/contacts-decor2.png"
      alt="Shopping UA"
      class="absolute right-[-30%] top-0 w-1/2 xl:right-[-10%]"
    />
  </div>
</template>
