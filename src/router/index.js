import { createRouter, createWebHistory } from 'vue-router';

import ProductsPage from '@/views/ProductsPage.vue';
import FavoritesPage from '@/views/FavoritesPage.vue';
import ProductCardPage from '@/views/ProductCardPage.vue';
import BasketPage from '@/views/BasketPage.vue';
import NotFoundPage from '@/views/NotFoundPage.vue';
import ContactsPage from '@/views/ContactsPage.vue';

const routes = [
  { path: '/', component: ProductsPage, name: 'ProductsPage' },
  { path: '/favorites', component: FavoritesPage, name: 'FavoritesPage' },
  { path: '/basket', component: BasketPage, name: 'BasketPage' },
  { path: '/contacts', component: ContactsPage, name: 'ContactsPage' },
  { path: '/product_card/:id', component: ProductCardPage, name: 'ProductCardPage' },
  { path: '/:pathMatch(.*)*', component: NotFoundPage, name: 'NotFoundPage'}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
