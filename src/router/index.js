import { createRouter, createWebHistory } from 'vue-router';
import ProductsPage from '@/views/ProductsPage.vue';
import FavoritesPage from '@/views/FavoritesPage.vue';
import ProductCardPage from '@/views/ProductCardPage.vue';
import BasketPage from '@/views/BasketPage.vue';
// import AddProductForm from '@/components/AddProductForm.vue';
// import CartPage from '@/views/CartPage.vue';
// import ProductDetailsPage from '@/views/ProductDetailsPage.vue';

// Визначення роутів
const routes = [
  { path: '/', component: ProductsPage, name: 'ProductsPage' },
  { path: '/favorites', component: FavoritesPage, name: 'FavoritesPage' },
  { path: '/basket', component: BasketPage, name: 'BasketPage' },
  { path: '/product_card/:id', component: ProductCardPage, name: 'ProductCardPage' },
  // { path: '/add-product', component: AddProductForm },
  // { path: '/cart', component: CartPage },
];

// Створення роутера з історією вебу
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
