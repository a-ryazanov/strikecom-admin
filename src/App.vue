<template>
  <div id="app">
    <router-view></router-view>

    <modals-container/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';

import BaseModalError from '@x10d/vue-kit/src/components/BaseModalError.vue';

import { firebase } from '@/services';

import { HAS_PERMISSIONS } from '@/store/modules/auth/getter-types';

import { LOGIN_ROUTE } from '@/router/route-names';


export default Vue.extend({
  computed: {
    ...mapState({
      user: (state : any) => state.auth.user,
    }),
  },

  mounted(): void {
    this.$watch(
      'user',
      async function (newValue) {
        if (this.$store.getters[HAS_PERMISSIONS]) {
          if (this.$route.name === LOGIN_ROUTE) {
            await this.$router.push('/');
          }
        } else if (newValue) {
          // @ts-ignore
          const modalPromise = this.$qrKitOpenModal(
            BaseModalError,
            {
              modalCompletingInterceptor: async () => {
                await firebase.signOut();
              },
              mainErrorText: 'У вас нет прав для доступа к панели администратора!',
              hideAcceptButton: false,
            },
          );

          await modalPromise;
        } else if (this.$route.name !== LOGIN_ROUTE) {
          await this.$router.push({
            name: LOGIN_ROUTE,
          });
        }
      },
      {
        immediate: true,
      },
    );
  },
});
</script>


<style lang="stylus">
@import '~@x10d/vue-kit/src/styles/variables/colors.styl'

.el-loading-spinner
  .path
    stroke $globalColorNileBlue !important

.input-tag
  max-width 80px

  span
    width 100%
    text-overflow: ellipsis
    overflow hidden
    white-space nowrap
</style>

<style lang="stylus" scoped>
@import '~@x10d/vue-kit/src/styles/mixins/tooltip.styl'
@import '~@x10d/vue-kit/src/styles/mixins/utils.styl'

#app
  globalTooltipStyles()
  display flex
  min-height 100vh

  & /deep/
    defaultTextStyles()
</style>
