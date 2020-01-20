<template>
    <CheckIcon
        v-if="$props.item.published"
        class="publicationStatusCell__icon --check"
    />

    <CloseIcon
        v-else
        class="publicationStatusCell__icon --close"
    />
</template>

<script>
import CheckIcon from '@x10d/vue-kit/src/assets/icons/check.svg'
import CloseIcon from '@x10d/vue-kit/src/assets/icons/close.svg'


export default {
    name: 'BasePublicationStatusCell',

    components: {
        CloseIcon,
        CheckIcon,
    },

    props: {
        item: {
            type: Object,
            required: true,
        },
    },
}
</script>

<style lang="stylus" scoped>
@import '../styles/palette.styl'

.publicationStatusCell__icon
  &.--check
    fill $caribbean-green

  &.--close
    fill $crimson
</style>
