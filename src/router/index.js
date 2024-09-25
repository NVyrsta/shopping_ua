import { createRouter, createWebHistory } from 'vue-router';

import ProductsPage from '@/views/ProductsPage.vue';
import FavoritesPage from '@/views/FavoritesPage.vue';
import ProductCardPage from '@/views/ProductCardPage.vue';
import BasketPage from '@/views/BasketPage.vue';
import NotFoundPage from '@/views/NotFoundPage.vue';
import ContactsPage from '@/views/ContactsPage.vue';
import BrandsPage from '@/views/BrandsPage.vue';
import BrandPage from '@/views/BrandPage.vue';
import CategoryPage from '@/views/CategoryPage.vue';
import CooperationPage from '@/views/CooperationPage.vue';

// const routes = [
//   { path: '/', component: ProductsPage, name: 'ProductsPage' },
//   { path: '/favorites', component: FavoritesPage, name: 'FavoritesPage' },
//   { path: '/basket', component: BasketPage, name: 'BasketPage' },
//   { path: '/contacts', component: ContactsPage, name: 'ContactsPage' },
//   { path: '/cooperation', component: CooperationPage, name: 'CooperationPage' },
//   { path: '/product_card/:id', component: ProductCardPage, name: 'ProductCardPage' },
//   { path: '/:gender(.*)?/:categories(.*)?/:id', component: CategoryPage, name: 'CategoryPage' },
//   { path: '/:pathMatch(.*)*', component: NotFoundPage, name: 'NotFoundPage'},
// ];

const routes = [
  { path: '/', component: ProductsPage, name: 'ProductsPage' }, // Home page
  { path: '/favorites', component: FavoritesPage, name: 'FavoritesPage' },
  { path: '/basket', component: BasketPage, name: 'BasketPage' },
  { path: '/contacts', component: ContactsPage, name: 'ContactsPage' },
  { path: '/brands', component: BrandsPage, name: 'BrandsPage' },
  { path: '/brands/:id', component: BrandPage, name: 'BrandPage' },
  { path: '/cooperation', component: CooperationPage, name: 'CooperationPage' },
  { path: '/product_card/:id', component: ProductCardPage, name: 'ProductCardPage' },

  // Gender-specific product listings route (without categories)
  {
    path: '/:gender(women|men|children)', 
    component: ProductsPage,
    name: 'GenderProductsPage', 
  },

  // Dynamic category route with unknown depth after gender
  { path: '/:categories(.*)?', component: CategoryPage, name: 'CategoryPage' },

  // Catch-all for unknown routes (404 page)
  { path: '/:pathMatch(.*)*', component: NotFoundPage, name: 'NotFoundPage' },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
