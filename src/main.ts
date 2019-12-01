import Vue from 'vue';
import { Loading } from 'element-ui';
// @ts-ignore
import vueKitPlugin from '@x10d/vue-kit/src/plugins/vue-kit';
// @ts-ignore
import errorHandlingPlugin from '@x10d/vue-kit/src/plugins/error-handling';

import App from './App.vue';
import router from './router';
import store from './store';

import { api, catalogs, firebase } from '@/services';


(async function () {
  Vue.use(vueKitPlugin);
  Vue.use(Loading.directive);
  Vue.prototype.$loading = Loading.service;
  Vue.config.productionTip = false;

  // Инициализация справочников
  const checkSum = await api.fetchCatalogsChecksum();

  await catalogs.initialize(checkSum);

  await firebase.initAuthStateObserver(store);

  const vm = new Vue({
    router,
    store,
    render: h => h(App),
  });

  Vue.use(errorHandlingPlugin, {
    errorHandlersParams: {
      vueInstance: vm,

      apiErrorPreHandler(error : any) {
        if (!error.response) return false;

        return error.response.status === 401;
      },

      getApiErrorModalOptions(error : any) {
        if (!error.response) return {};

        return {
          mainErrorText: 'Произошла неизвестная ошибка! Пожалуйста, сообщите о ней разработчикам.',
          hideAcceptButton: false,
        };
      },
    },
  });

  vm.$mount('#app');
}());
