import Vue from 'vue';
import VueRouter from 'vue-router';

import TheTableSection from '@/components/TheTableSection.vue';


Vue.use(VueRouter);

export const routes = [
  {
    path: '/',
    redirect: '/news',
  },
  {
    path: '/news',
    name: 'news',
    component: TheTableSection,
    meta: { title: 'Новости', moduleName: 'news' },
  },
  {
    path: '/events',
    name: 'events',
    component: TheTableSection,
    meta: { title: 'События', moduleName: 'events' },
  },
  {
    path: '/conflicts',
    name: 'conflicts',
    component: TheTableSection,
    meta: { title: 'Конфликты', moduleName: 'conflicts' },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
