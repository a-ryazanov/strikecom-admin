<template>
  <BaseInput
    ref="searchInput"
    :value="$props.value"
    :placeholder="$props.actionView.textContent"
    @input="handleSearchInput"
    class="baseSearchableInput"
  />
</template>

<script>
import { debounce } from 'lodash-es';

import BaseInput from '@x10d/vue-kit/src/components/BaseInput.vue';

import { SET_SEARCH_VALUE } from '@/store/modules/table-section/mutation-types';


export default {
  name: 'BaseSearchableInput',

  components: {
    BaseInput,
  },

  props: {
    value: {
      type: String,
      required: true,
    },

    actionView: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      debouncedSearch: debounce(
        this.executeSearchHandler.bind(this),
        600,
      ),
    };
  },

  watch: {
    '$props.value': async function (newValue) {
      await this.debouncedSearch(newValue);
    },
  },

  methods: {
    async executeSearchHandler() {
      await this.$props.actionView.handler(
        this,
        this.$props.value,
      );

      this.$refs.searchInput.$refs.input.focus();
    },

    handleSearchInput(value) {
      this.$store.commit(SET_SEARCH_VALUE, value);
    },
  },
};
</script>

<style lang="stylus" scoped>
.baseSearchableInput
  width 150px
  transition border-color 0.2s, background-color 0.2s, width 0.2s ease-in-out

  &:focus
    width 400px
</style>
