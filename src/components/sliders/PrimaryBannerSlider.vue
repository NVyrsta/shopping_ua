<template>
  <div
    class="grid grid-cols-1 gap-2 px-4 py-12 lg:grid-cols-[2fr_1fr] lg:gap-2"
  >
    <div class="flex">
      <SlickSlider :slides="slides" />
    </div>

    <div class="grid gap-2">
      <div
        v-for="link in links"
        :key="link.id"
        class="relative"
      >
        <!-- Обгортаємо зображення у router-link для навігації -->
        <router-link :to="link.link">
          <img
            :src="link.src"
            alt=""
            class="max-h-full w-full object-cover"
          />
          <span
            class="absolute bottom-0 left-1/2 w-4/5 -translate-x-1/2 transform bg-white bg-opacity-75 p-3 text-center text-lg font-semibold text-gray-700"
          >
            {{ link.title }}
          </span>

          <span
            class="absolute left-0 top-0 px-5 py-2 text-sm font-semibold uppercase text-white"
            :class="link.badge"
          >
            {{ link.banner }}
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { useI18n } from 'vue-i18n';
  import SlickSlider from '@/components/SlickSlider.vue';

  const { t } = useI18n();
  const route = useRoute();

  const linksCatalogue = computed(() => ({
    women: [
      {
        id: 1,
        badge: 'bg-red-600',
        src: 'https://b.shopping.ua/img/slider/8a5730a17a06e2b66930b5e8cca69ed6.webp',
        link: '/women/womens_shoes',
        title: t('Main.SHOESOFUKRAINIANBRANDS'),
        banner: 'made in ukraine'
      },
      {
        id: 3,
        badge: 'bg-blue-300',
        src: 'https://b.shopping.ua/img/slider/d9939ffc6c682a002ad7801ab7ca21a5.webp',
        link: '/women/home_clothes',
        title: t('Main.HOMECLOTHES'),
        banner: 'made in ukraine'
      }
    ],
    men: [
      {
        id: 1,
        badge: 'bg-red-600',
        src: 'https://b.shopping.ua/img/slider/5323e6b0e06a2c3bfb9e4358297022d5.webp',
        link: '/men/mens_shoes',
        title: t('Main.SHOESOFUKRAINIANBRANDS'),
        banner: 'made in ukraine'
      },
      {
        id: 3,
        badge: 'bg-blue-300',
        src: 'https://b.shopping.ua/img/slider/a833d8a68617bceddbc61bafcda068e5.webp',
        link: '/men/menswear',
        title: t('Main.BESTPRICESONCLOTHING'),
        banner: 'made in ukraine'
      }
    ],
    children: [
      {
        id: 1,
        badge: 'bg-red-600',
        src: 'https://b.shopping.ua/img/slider/f834725ca95c3d636f4c1e8600bf0e71.webp',
        link: '/children/toys',
        title: t('Main.CHILDRENSTOYS'),
        banner: 'made in ukraine'
      },
      {
        id: 3,
        badge: 'bg-blue-300',
        src: 'https://b.shopping.ua/img/slider/aec95a5216e0dc9871008653fe10e8e1.webp',
        link: '/children/childrens-clothes',
        title: t('Main.MAXIMUM_DISCOUNTS'),
        banner: 'made in ukraine'
      }
    ]
  }));

  const slidesCatalogue = {
    women: [
      {
        id: 1,
        title: 'Slide 1',
        src: 'https://b.shopping.ua/img/slider/c88bbc1300013a4724bede02e724cdd4.webp'
      },
      {
        id: 3,
        title: 'Slide 3',
        src: 'https://b.shopping.ua/img/slider/b685158f4ff66b1af56a2c06df15e344.webp'
      },
      {
        id: 2,
        title: 'Slide 2',
        src: 'https://b.shopping.ua/img/slider/6c1d536e1c09239502166b0da5e0e892.webp'
      }
    ],
    men: [
      {
        id: 1,
        title: 'Slide 1',
        src: 'https://b.shopping.ua/img/slider/c88bbc1300013a4724bede02e724cdd4.webp'
      },
      {
        id: 3,
        title: 'Slide 3',
        src: 'https://b.shopping.ua/img/slider/b685158f4ff66b1af56a2c06df15e344.webp'
      },
      {
        id: 2,
        title: 'Slide 2',
        src: 'https://b.shopping.ua/img/slider/bde474033abfbcb0cefa73863a287b3b.webp'
      }
    ],
    children: [
      {
        id: 1,
        title: 'Slide 1',
        src: 'https://b.shopping.ua/img/slider/c88bbc1300013a4724bede02e724cdd4.webp'
      },
      {
        id: 3,
        title: 'Slide 3',
        src: 'https://b.shopping.ua/img/slider/b685158f4ff66b1af56a2c06df15e344.webp'
      },
      {
        id: 2,
        title: 'Slide 2',
        src: 'https://b.shopping.ua/img/slider/18888e5203caed58ad936a9a8328f609.webp'
      }
    ]
  };

  const slides = computed(() => {
    return slidesCatalogue[route.params.gender] || slidesCatalogue.women;
  });

  const links = computed(() => {
    return (
      linksCatalogue.value[route.params.gender] || linksCatalogue.value.women
    );
  });
</script>
