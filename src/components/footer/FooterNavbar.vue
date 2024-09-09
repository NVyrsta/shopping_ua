<template>
  <div 
    class="bg-white py-12 px-4 shadow-[0px_-4px_10px_0px_rgba(0,0,0,0.1)]"
  >
    <div class="flex justify-between items-center gap-6 py-1">
      <div class="flex items-center justify-center flex-col gap-2 text-center">
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

      <!-- <div class="flex">
        <router-link to="/favorites">
          <div class="relative mr-6">
            <button
              class="flex justify-start gap-2 items-center focus:outline-none"
            >
              <svg
                width="18"
                height="16"
                viewBox="0 0 18 16"
                fill="#ee4a2e"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.79644 1.56168C10.5849 0.890635 11.6055 0.05 12.8582 0.05C15.6648 0.05 17.95 2.38515 17.95 5.25762C17.95 5.92847 17.8382 6.59038 17.6493 7.22988C17.5308 7.63105 17.0943 7.83571 16.691 7.70385C16.2501 7.55972 16.0266 7.06944 16.1509 6.61409C16.2797 6.14196 16.3465 5.68709 16.3465 5.25768C16.3465 3.29255 14.7828 1.69192 12.8582 1.69192C12.3537 1.69192 11.7688 1.94917 11.2065 2.32857C10.6427 2.70896 10.095 3.21664 9.66357 3.7275C9.51273 3.90611 9.25915 3.99904 9 3.99904C8.74085 3.99904 8.48727 3.90611 8.33643 3.7275C7.90501 3.21664 7.35731 2.70896 6.79354 2.32857C6.23123 1.94917 5.64632 1.69192 5.14175 1.69192C3.21725 1.69192 1.65347 3.29249 1.65347 5.25768C1.65347 6.05057 1.94777 6.99957 2.48351 8.01378C3.01964 9.02872 3.79938 10.1124 4.77484 11.1756C5.69764 12.1814 6.61159 12.9629 7.36372 13.4933C7.73974 13.7585 8.07597 13.9614 8.35319 14.0983C8.62807 14.234 8.85172 14.3082 9 14.3082C9.13745 14.3082 9.33329 14.2532 9.57009 14.1518C9.8085 14.0497 10.0936 13.8982 10.4116 13.6999C11.0475 13.3033 11.8173 12.718 12.6103 11.9615C12.9415 11.6456 13.4649 11.636 13.788 11.9552C14.102 12.2654 14.1107 12.769 13.7955 13.0738C13.0121 13.8314 12.1321 14.5516 11.2869 15.082C10.4399 15.6137 9.63507 15.95 9 15.95C8.65302 15.95 8.24719 15.8379 7.80521 15.6382C7.36376 15.4387 6.88936 15.1534 6.40613 14.8104C5.43966 14.1243 4.44152 13.2102 3.60618 12.2997C3.07082 11.7162 2.1809 10.6688 1.4251 9.40936C0.668737 8.14903 0.05 6.68185 0.05 5.25762C0.05 2.38515 2.33521 0.05 5.14175 0.05C6.39451 0.05 7.41505 0.890657 8.20355 1.5617C8.6751 1.96301 9.32489 1.96299 9.79644 1.56168Z"
                  fill="#ee4a2eackGroundRed"
                  stroke="white"
                  stroke-width="0.1"
                ></path>
              </svg>
  
              <div class="hidden sm:flex">
                <span class="underline-effect">
                  {{ $t('Header.Chosen') }}
                </span>
              </div>
            </button>
  
            <span
              v-if="favoritesCount > 0"
              class="absolute -top-3 -right-3 flex items-center justify-center px-0.5 min-w-3 h-3 text-xs leading-none text-white bg-orange-600"
            >
              {{ favoritesCount > 9 ? '9+' : favoritesCount }}
            </span>
          </div>
        </router-link>
      </div> -->

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 flex-1">
        <!-- Колонка 1 -->
        <AccordionColumn
          :title="$t('Footer.ForTheSeller')"
          :links="customerLinks"
        />      

        <!-- Колонка 2 -->
        <AccordionColumn
          :title="$t('Footer.ForTheSeller')"
          :links="customerLinks"
        />   

        <!-- Колонка 3 -->
        <AccordionColumn
          :title="$t('Footer.ForTheSeller')"
          :links="customerLinks"
        />      
      </div>
    </div>
  </div>
</template>

<script setup>
import AccordionColumn from '@/components/footer/AccordionColumn.vue';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

// Ініціалізуємо переклади
const { t } = useI18n();

const customerLinks = computed(() => [
  { path: '/contacts', label: t('Footer.Contacts') },
]);

// const serviceLinks = computed(() => [
//   { path: '/faq', label: t('Footer.FAQ') },
//   { path: '/delivery', label: t('Footer.Delivery') },
// ]);

// const companyLinks = computed(() => [
//   { path: '/about', label: t('Footer.About') },
//   { path: '/careers', label: t('Footer.Careers') },
// ]);
</script>
