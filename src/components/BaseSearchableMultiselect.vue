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
  >

    <div
      v-if="isSearchValueValid && !this.loadingState"
      slot="noResult"
      class="baseSearchableMultiselectNoResult-cnt"
      @click="handleNoResultOptionClick"
    >
      <i class="el-icon-plus"/>

      <span
        class="baseSearchableMultiselectNoResult__text"
        v-text="noResultOptionText"
      />
    </div>

  </BaseMultiselect>
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

    // Функция создания нового элемента
    createItem: {
      type: Function,
      required: true,
    },

    // Префикс для текста, который отобразится в опции создания новой сущности.
    // По сути, это имя сущности, которую нужно создать, но в винительном падеже.
    noResultOptionTextPrefix: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    debouncedValidateAndSearchOptions: () => {},
    loadingState: false,
    searchValue: '',
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

    isSearchValueValid() {
      return this.$props.validateQueryValue(this.searchValue);
    },

    noResultOptionText() {
      return `Создать ${this.$props.noResultOptionTextPrefix} ${this.searchValue}`;
    },
  },

  created() {
    this.debouncedValidateAndSearchOptions = debounce(
      this.validateAndSearchOptions.bind(this),
      400,
    );
  },

  methods: {
    async fetchSearchedOptions() {
      this.searchedOptions = await this.$props.searchOptions(
        this.searchValue,
        this.$props.contextModel,
      );
    },

    async validateAndSearchOptions(value) {
      this.searchValue = value;

      if (this.isSearchValueValid) {
        this.loadingState = true;

        await this.fetchSearchedOptions();

        this.loadingState = false;
      }
    },

    async handleSearchEvent(value) {
      await this.debouncedValidateAndSearchOptions(value);
    },

    async handleNoResultOptionClick() {
      this.loadingState = true;

      await this.$props.createItem(
        this.searchValue,
        this.$props.contextModel,
        this,
      );

      await this.fetchSearchedOptions();

      this.loadingState = false;
    },
  },
};
</script>

<style lang="stylus" scoped>
.baseSearchableMultiselectNoResult-cnt
  display flex
  align-items center

.el-icon-plus
  font-weight 700

.baseSearchableMultiselectNoResult__text
  margin-left 8px
</style>
