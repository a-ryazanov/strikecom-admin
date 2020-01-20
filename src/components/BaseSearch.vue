<template>
    <BaseInput
        ref="searchInput"
        :value="$props.value"
        placeholder="Поиск"
        class="baseSearch"
        @input="handleInput"
        @keyup.native.enter="startSearch"
    />
</template>

<script>
import BaseInput from '@x10d/vue-kit/src/components/BaseInput.vue'

import { UPDATE_SECTION_PARAMS } from '@/store/modules/table-section/mutation-types'


export default {
    name: 'BaseSearch',

    components: {
        BaseInput,
    },

    props: {
        value: {
            type: String,
            required: true,
        },
    },

    methods: {
        handleInput(value) {
            this.$store.commit(UPDATE_SECTION_PARAMS, {
                filters: {
                    fulltext: value,
                },
            })
        },

        async startSearch() {
            this.$emit('search')
        },
    },
}
</script>

<style lang="stylus" scoped>
.baseSearch
  width 150px
  transition border-color 0.2s, background-color 0.2s, width 0.2s ease-in-out

  &:focus
    width 400px
</style>
