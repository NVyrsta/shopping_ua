<template>
  <div class="contents">
    <DynamicRoute
      v-for="link in currentLinks"
      :key="link.url"
      :class="className"
      :link-url="link.url"
      :link-text="$t(link.text)"
    />

    <router-link
      to="/brands"
      active-class="font-bold"
      :class="className || 'underline-effect'"
    >
      {{ $t('Breadcrumbs.Brands') }}
    </router-link>

    <DynamicRoute
      :class="className"
      link-url="new-products"
      :link-text="$t('Breadcrumbs.Novelty')"
    />
    <DynamicRoute
      :class="className"
      link-url="discount-products"
      :link-text="$t('Breadcrumbs.discount-products')"
    />
  </div>
</template>

<script setup>
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import DynamicRoute from '@/components/header/DynamicRoute.vue';

  const route = useRoute();

  defineProps({
    className: {
      type: String,
      default: 'text-xl'
    }
  });

  const linksByCategory = {
    women: [
      { url: 'women_clothing', text: 'Breadcrumbs.women_clothing' },
      { url: 'womens_shoes', text: 'Breadcrumbs.womens_shoes' },
      { url: 'accessories', text: 'Breadcrumbs.accessories' }
    ],
    men: [
      { url: 'menswear', text: 'Breadcrumbs.menswear' },
      { url: 'mens_shoes', text: 'Breadcrumbs.mens_shoes' },
      { url: 'accessories', text: 'Breadcrumbs.accessories' }
    ],
    children: [
      {
        url: 'childrens-clothes',
        text: 'Breadcrumbs.childrens-clothes'
      },
      { url: 'childrens_shoes', text: 'Breadcrumbs.childrens_shoes' },
      { url: 'accessories', text: 'Breadcrumbs.accessories' }
    ]
  };

  const currentLinks = computed(() => {
    const gender = route.params.gender;
    const categories = route.params.categories;

    // Якщо categories присутній, перевіримо його значення, щоб вибрати ключ
    const key = gender || (categories && categories.split('/')[0]) || 'women';

    // Повертаємо відповідні посилання для поточного ключа
    return linksByCategory[key] || linksByCategory.women;
  });
</script>

<style scoped></style>
