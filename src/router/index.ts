import Vue from 'vue';
import VueRouter from 'vue-router';

import TheMainSection from '@/components/TheMainSection.vue'


Vue.use(VueRouter);

export const routes = [
  {
    path: '/',
    redirect: '/news',
  },
  {
    path: '/news',
    name: 'news',
    component: TheMainSection,
    meta: { title: 'Новости', moduleName: 'news' },
  },
  {
    path: '/events',
    name: 'events',
    component: TheMainSection,
    meta: { title: 'События', moduleName: 'events' },
  },
  {
    path: '/conflicts',
    name: 'conflicts',
    component: TheMainSection,
    meta: { title: 'Конфликты', moduleName: 'conflicts' },
  },
  {
    path: '/references',
    name: 'references',
    meta: { title: 'Справочники' },
    children: [
      {
        path: 'countries',
        name: 'countries',
        component: TheMainSection,
        meta: { title: 'Страны', moduleName: 'countries' },
      },
      {
        path: 'regions',
        name: 'regions',
        component: TheMainSection,
        meta: { title: 'Регионы', moduleName: 'regions' },
      },
      {
        path: 'localities',
        name: 'localities',
        component: TheMainSection,
        meta: { title: 'Населенные пункты', moduleName: 'localities' },
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
