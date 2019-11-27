<template>
  <section class="baseSection">
    <div class="baseSection__header">
      <h1
        class="baseSectionHeader__title"
        v-text="$props.title"
      />

      <div class="baseSectionHeader__addon">
        <slot name="headerAddon"/>
      </div>
    </div>

    <div class="baseSection__content">
      <slot name="content"/>
    </div>
  </section>
</template>

<script>
export default {
  name: 'BaseSectionLayout',

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

.baseSection
  display flex
  flex-direction column
  height 100%
  max-height 100%
  padding 24px 44px

  @media(max-width: 1280px)
    padding 0 32px

.baseSection__header
  flex 0 0 auto
  display flex
  align-items center
  height $buttonHeight // Под высоту возможных кнопок-экшнов
  margin-bottom 21px
  padding-bottom 16px
  border-bottom solid 1px $mystic

.baseSectionHeader__title
  font-size 22px
  line-height 25px

.baseSectionHeader__addon
  display flex
  margin-left auto

.baseSection__content
  display flex
  flex-direction column
  flex 1 1 0
  overflow auto
</style>
