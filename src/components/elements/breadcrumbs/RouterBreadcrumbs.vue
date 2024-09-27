<template>
  <nav 
    aria-label="breadcrumb" 
    class="breadcrumbs flex justify-start items-center px-4 py-4 gap-4 overflow-x-auto"
  >
    <ol class="breadcrumb flex items-center justify-start gap-4">
      <router-link to="/">{{ $t('Breadcrumbs.Main') }}</router-link> 
    </ol>

    <ol class="breadcrumb flex items-center justify-start gap-4">
      <li
        v-for="(category, index) in breadcrumbItems"
        :key="index"
        class="breadcrumb-item"
        :class="{ active: index === breadcrumbItems.length - 1 }"
      >
        <div class="flex items-center justify-start gap-4">
          <span class="arrow-next">
            <SvgIcon 
              id="back"
              width="6"
              height="10"
              fill="#6d6d6d"
              class="transform rotate-180"
            />
          </span>

          <router-link
            :to="category.link"
          >
            {{ $t(`Breadcrumbs.${category.translationKey}`) }}
          </router-link>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { computed, ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const categories = ref([]);

// Функція для оновлення categories на основі URL
const updateCategories = () => {
  // Сплітимо шлях і видалимо порожні частини
  categories.value = route.path.split('/').filter(Boolean);
};

// Виклик при завантаженні компоненту
onMounted(() => {
  updateCategories();
});

// Вотчер для змін у маршруті
watch(() => route.path, () => {
  updateCategories();
});

// Генерація breadcrumb на основі categories
const breadcrumbItems = computed(() => {
  let categoryLinks = categories.value.map((category, index) => {
    const path = `/${categories.value.slice(0, index + 1).join('/')}`;
    console.log('path:', path);
    
    return {
      link: path,
      translationKey: category,
    };
  });

  return categoryLinks;
});
</script>


<style scoped>
a {
  font-size: 14px;
  color: #a8a8a8;
  letter-spacing: .02em;
  line-height: 16px;
  text-decoration: none;
  white-space: nowrap;
  transition: 0.3s ease-in-out;
  cursor: pointer;
}

a:hover {
  text-decoration: underline;
}

span {
  color: #a8a8a8;
}
</style>
