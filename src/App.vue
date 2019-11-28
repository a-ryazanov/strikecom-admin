<template>
  <div id="app">
    <router-view></router-view>

    <modals-container/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

import { HAS_PERMISSIONS } from '@/store/modules/auth/getter-types';

import { LOGIN_ROUTE } from '@/router/route-names';


export default Vue.extend({
  watch: {
    userHasPermission: {
      handler(newValue) {
        if (newValue) this.$router.push('/');
        else {
          this.$router.push({
            name: LOGIN_ROUTE,
          });
        }
      },
    },
  },

  computed: {
    ...mapGetters({
      userHasPermission: HAS_PERMISSIONS,
    }),
  },
});
</script>


<style lang="stylus">
@import '~@x10d/vue-kit/src/styles/reset.styl'
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
