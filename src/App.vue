<template>
  <div id="app">
    <ElContainer
      direction="horizontal"
      class="app-cnt"
    >
      <ElAside>
        <TheNavBar/>
      </ElAside>

      <ElContainer>
        <ElMain>
          <router-view id="app__content"/>
        </ElMain>
      </ElContainer>
    </ElContainer>

    <modals-container/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Container, Aside, Main } from 'element-ui';

import TheNavBar from '@/components/TheNavBar.vue';


export default Vue.extend({
  components: {
    [Aside.name]: Aside,
    [Container.name]: Container,
    [Main.name]: Main,
    TheNavBar,
  },
});
</script>


<style lang="stylus">
@import '~@x10d/vue-kit/src/styles/reset.styl'
</style>

<style lang="stylus" scoped>
@import '~@x10d/vue-kit/src/styles/mixins/tooltip.styl'

#app
  globalTooltipStyles()

  & /deep/
    defaultTextStyles()

.app-cnt
  min-height 100vh
</style>
