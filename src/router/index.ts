import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from '@/router-views/Login.vue';

import TheTableSection from '@/components/TheTableSection.vue';

import store from '@/store';

import { HAS_PERMISSIONS } from '@/store/modules/auth/getter-types';

import {
  CONFLICTS_ROUTE,
  EVENTS_ROUTE,
  LOGIN_ROUTE,
  NEWS_ROUTE,
} from '@/router/route-names';


Vue.use(VueRouter);

export const routes = [
  {
    path: '/',
    redirect: '/news',
  },
  {
    path: '/news',
    name: NEWS_ROUTE,
    component: TheTableSection,
    meta: { title: 'Новости' },
  },
  {
    path: '/events',
    name: EVENTS_ROUTE,
    component: TheTableSection,
    meta: { title: 'События' },
  },
  {
    path: '/conflicts',
    name: CONFLICTS_ROUTE,
    component: TheTableSection,
    meta: { title: 'Конфликты' },
  },
  {
    path: '/login',
    name: LOGIN_ROUTE,
    component: Login,
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (
    to.name !== LOGIN_ROUTE
    && !store.getters[HAS_PERMISSIONS]
  ) {
    next('/login');
  } else if (
    to.name === LOGIN_ROUTE
    && store.getters[HAS_PERMISSIONS]
  ) {
    next('/');
  } else {
    next();
  }
});

export default router;
