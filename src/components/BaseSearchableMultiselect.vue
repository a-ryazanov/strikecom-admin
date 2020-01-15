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
    @keyup.enter.native="validateAndSearchOptions"
    @search-change="handleSearchEvent"
  >

    <div
      v-if="isCreateOptionShown"
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
      required: false,
    },

    // Выполнять ли поиск при введении новых символов, но с задержкой.
    // Иначе поиск будет выполнен при нажатии клавиши Enter
    debouncedInputSearch: {
      type: Boolean,
      required: false,
      default: true,
    },

    // Функция создания нового элемента
    createItem: {
      type: Function,
      required: false,
    },

    // Префикс для текста, который отобразится в опции создания новой сущности.
    // По сути, это имя сущности, которую нужно создать, но в винительном падеже.
    noResultOptionTextPrefix: {
      type: String,
      required: false,
    },
  },

  data: () => ({
    debouncedValidateAndSearchOptions: () => {},
    loadingState: false,
    searchValue: '',
    searchedOptions: [],
  }),

  watch: {
    async searchValue(newValue) {
      if (this.$props.debouncedInputSearch) {
        await this.debouncedValidateAndSearchOptions(newValue);
      }
    },
  },

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
      return this.$props.validateQueryValue
        ? this.$props.validateQueryValue(this.searchValue)
        : true;
    },

    noResultOptionText() {
      return `Создать ${this.$props.noResultOptionTextPrefix} ${this.searchValue}`;
    },

    isCreateOptionShown() {
      return this.$props.createItem
        && this.searchedOptions.length === 0
        && this.isSearchValueValid
        && !this.loadingState;
    },
  },

  methods: {
    async fetchSearchedOptions() {
      this.searchedOptions = await this.$props.searchOptions(
        this.searchValue,
        this.$props.contextModel,
      );
    },

    async validateAndSearchOptions() {
      if (this.isSearchValueValid) {
        this.loadingState = true;

        await this.fetchSearchedOptions();

        this.loadingState = false;
      }
    },

    async handleSearchEvent(value) {
      this.searchValue = value;
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

  created() {
    if (this.$props.debouncedInputSearch) {
      this.debouncedValidateAndSearchOptions = debounce(
        this.validateAndSearchOptions.bind(this),
        400,
      );
    }
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
