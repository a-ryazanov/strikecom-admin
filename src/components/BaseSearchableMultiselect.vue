<template>
  <BaseMultiselect
    v-model="valueModel"
    :context-model="$props.contextModel"
    :disabled="$props.disabled"
    :multiple="$props.multiple"
    :placeholder="$props.placeholder"
    :format-field-title="$props.formatFieldTitle"
    :incoming-options="searchedOptions"
    :external-loading-state="loadingState"
    @search-change="handleSearchEvent"
  />
</template>

<script>
import { debounce, isObject } from 'lodash-es';
import BaseMultiselect from '@x10d/vue-kit/src/components/BaseMultiselect.vue';


export default {
  name: 'BaseSearchableMultiselect',

  components: {
    BaseMultiselect,
  },

  props: {

    //
    // Пропсы, которые "пробрасываются" в `BaseMultiselect`
    //

    // Значение поля
    value: {
      type: null,
      required: true,
    },

    // Значение поля
    contextModel: {
      type: Object,
      required: true,
    },

    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },

    multiple: {
      type: Boolean,
      required: false,
      default: false,
    },

    placeholder: {
      type: String,
      required: false,
      default: '',
    },

    formatFieldTitle: {
      type: Function,
      required: false,
      default: value => (isObject(value) ? value.title : value),
    },


    //
    // Уникальные пропсы для `BaseSearchableMultiselect`
    //

    // Функция для поиска элементов
    searchOptions: {
      type: Function,
      required: true,
    },

    // Функция валидации поисковой строки
    validateQueryValue: {
      type: Function,
      required: true,
    },

  },

  data: () => ({
    debouncedValidateAndSearchOptions: () => {},
    loadingState: false,
    searchedOptions: [],
  }),

  computed: {
    valueModel: {
      get() {
        return this.$props.value;
      },
      set(newVal) {
        this.$emit('input', newVal);
      },
    },
  },

  created() {
    this.debouncedValidateAndSearchOptions =
      debounce(this.validateAndSearchOptions.bind(this), 400);
  },

  methods: {
    async validateAndSearchOptions(value) {
      const valueIsValid = this.$props.validateQueryValue(value);

      if (valueIsValid) {
        this.loadingState = true;

        this.searchedOptions = await this.$props.searchOptions(value, this.$props.contextModel);

        this.loadingState = false;
      }
    },

    async handleSearchEvent(value) {
      await this.debouncedValidateAndSearchOptions(value);
    },
  },
};
</script>
