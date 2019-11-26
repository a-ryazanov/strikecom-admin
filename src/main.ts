import Vue from 'vue';
// @ts-ignore
import vueKitPlugin from '@x10d/vue-kit/src/plugins/vue-kit';

import App from './App.vue';
import router from './router';
import store from './store';

import { api, catalogs, firebase } from '@/services';


(async function () {
  Vue.use(vueKitPlugin);

  Vue.config.productionTip = false;

  // Инициализация справочников
  const checkSum = await api.fetchCatalogsChecksum();

  await catalogs.initialize(checkSum);

  // await firebase.initAuthStateObserver(store);

  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app');
}());
