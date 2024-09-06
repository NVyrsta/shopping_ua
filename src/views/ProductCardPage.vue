<template>
  <PageLayout>
    <div 
      v-if="product"
      class="relative"
    >
      <h1>{{ product.name }}</h1>
      <p>{{ product.description }}</p>
      <p>Ціна: {{ product.price }}</p>

      <ProductPageSlider 
        v-if="product.images"
        :slides="product.images"
      />

      <div
        class="bg-white mx-auto shadow-lg min-[450px]:w-[428px] min-[1100px]:w-[428px] max-w-full static min-[1100px]:absolute top-24 right-14 p-4">
        Product description
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora excepturi sunt neque dicta voluptates sed.
      </div>

      <!-- Додаткові дані про продукт -->
    </div>

    <div v-else>
      <p>Завантаження продукту...</p>
    </div>
  </PageLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { fetchProductById } from '@/app/core/plugins/firebase.js'; 

import PageLayout from '@/layouts/PageLayout.vue';
import ProductPageSlider from '@/components/sliders/ProductPageSlider.vue';

// Створюємо стейт для збереження даних продукту
const product = ref(null);

// Отримуємо поточний маршрут
const route = useRoute();

// Викликаємо функцію при маунті компонента
onMounted(async () => {
  const productId = route.params.id;
  try {
    // Отримуємо дані продукту за ID
    const response = await fetchProductById(productId);
    product.value = response;

    addProductToRecentlyViewed(productId);
  } catch (error) {
    console.error('Помилка при завантаженні продукту:', error);
  }
});

function addProductToRecentlyViewed(productId) {
  // Отримуємо наявні продукти з LocalStorage
  let viewedProducts = JSON.parse(localStorage.getItem('recentlyViewedProducts')) || [];

  // Перевіряємо, чи продукт вже є у списку
  if (!viewedProducts.includes(productId)) {
    // Якщо продукт не знайдено, додаємо його на початок списку
    viewedProducts.unshift(productId);
    
    // Обмежуємо кількість останніх продуктів, наприклад, 5
    if (viewedProducts.length > 5) {
      viewedProducts.pop();
    }

    // Зберігаємо оновлений список в LocalStorage
    localStorage.setItem('recentlyViewedProducts', JSON.stringify(viewedProducts));
  }
}

</script>
