<template>
  <ElContainer
    direction="horizontal"
    class="section-cnt"
  >
    <ElAside
      width="250px"
      class="section__aside"
    >
      <TheNavBar/>
    </ElAside>

    <ElContainer class="section__container">
      <ElHeader class="section__header">
        <h1
          class="sectionHeader__title"
          v-text="$props.title"
        />

        <div class="sectionHeader__addon">
          <slot name="headerAddon"/>
        </div>
      </ElHeader>

      <ElMain class="section__content">
        <slot name="content"/>
      </ElMain>
    </ElContainer>
  </ElContainer>
</template>

<script>
import {
  Aside,
  Container,
  Header,
  Main,
} from 'element-ui';

import TheNavBar from '@/components/TheNavBar.vue';


export default {
  name: 'BaseSectionLayout',

  components: {
    [Aside.name]: Aside,
    [Container.name]: Container,
    [Header.name]: Header,
    [Main.name]: Main,
    TheNavBar,
  },

  props: {
    // Заголовок секции
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped lang="stylus">
@import "../../node_modules/@x10d/vue-kit/src/styles/mixins/utils.styl"
@import "../../node_modules/@x10d/vue-kit/src/styles/variables/buttons.styl"
@import '../styles/palette.styl'

.section-cnt
  min-height 100vh

.section__aside
  background-color $catskill-white

.section__container
  display flex
  flex-direction column
  height 100%
  max-height 100%
  padding 24px 44px
  background-color $globalColorWhite

  @media(max-width: 1280px)
    padding 0 32px

.section__header
  flex 0 0 auto
  display flex
  align-items center
  height $buttonHeight // Под высоту возможных кнопок-экшнов
  margin-bottom 21px
  padding-bottom 16px
  border-bottom solid 1px $mystic

.sectionHeader__title
  font-size 22px
  line-height 25px

.sectionHeader__addon
  display flex
  margin-left auto

.section__content
  display flex
  flex-direction column
  flex 1 1 0
  overflow auto
</style>
