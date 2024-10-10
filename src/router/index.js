import { createRouter, createWebHistory } from 'vue-router';

import ProductsPage from '@/views/ProductsPage.vue';
import FavoritesPage from '@/views/FavoritesPage.vue';
import ProductCardPage from '@/views/ProductCardPage.vue';
import BasketPage from '@/views/BasketPage.vue';
import NotFoundPage from '@/views/NotFoundPage.vue';
import ContactsPage from '@/views/ContactsPage.vue';
import ReturnPage from '@/views/ReturnPage.vue';
import BrandsPage from '@/views/BrandsPage.vue';
import BrandPage from '@/views/BrandPage.vue';
import CategoryPage from '@/views/CategoryPage.vue';
import NewProductsPage from '@/views/NewProductsPage.vue';
import SaledProductsPage from '@/views/SaledProductsPage.vue';
import AdminPage from '@/views/AdminPage.vue';
import CooperationPage from '@/views/CooperationPage.vue';

const routes = [
  { path: '/', component: ProductsPage, name: 'ProductsPage' },
  { path: '/favorites', component: FavoritesPage, name: 'FavoritesPage' },
  { path: '/basket', component: BasketPage, name: 'BasketPage' },
  { path: '/contacts', component: ContactsPage, name: 'ContactsPage' },
  { path: '/return', component: ReturnPage, name: 'ReturnPage' },
  { path: '/brands', component: BrandsPage, name: 'BrandsPage' },
  { path: '/brands/:brandId', component: BrandPage, name: 'BrandPage' },
  { path: '/cooperation', component: CooperationPage, name: 'CooperationPage' },
  {
    path: '/:gender(women|men|children)/product_card/:id',
    component: ProductCardPage,
    name: 'ProductCardPage'
  },
  { path: '/admin', component: AdminPage, name: 'AdminPage' },
  {
    path: '/:gender(women|men|children)/new-products',
    component: NewProductsPage,
    name: 'NewProductsPage'
  },
  {
    path: '/:gender(women|men|children)/discount-products',
    component: SaledProductsPage,
    name: 'SaledProductsPage'
  },
  { path: '/:categories(.*)?', component: CategoryPage, name: 'CategoryPage' },
  { path: '/:pathMatch(.*)*', component: NotFoundPage, name: 'NotFoundPage' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
