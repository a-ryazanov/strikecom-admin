<template>
  <BaseSectionLayout
    :title="activeModuleView.title"
    v-loading="sectionData.loadingState === 'pending'"
    element-loading-background="rgba(17,32,57,0.45)"
  >

    <template
      v-show="isGlobalActionsShown"
      slot="headerAddon"
    >
      <template v-for="action in activeModuleView.globalActions">
        <BaseActionButton
          v-if="action.name !== 'search'"
          :key="action.name"
          :action-view="action"
          class="section__globalAction"
        />

        <BaseSearchableInput
          v-else
          :key="action.name"
          :value="sectionData.searchValue"
          :action-view="action"
          class="section__globalAction"
        />
      </template>
    </template>

    <template slot="content">
      <template v-if="sectionData.loadingState === 'loaded'">

        <template v-if="sectionData.items.length !== 0">
          <BaseTable
            :view="activeModuleView.tableView"
            :items="sectionData.items"
          />

          <BasePagination
            :last-page="sectionData.lastResponseMeta.lastPage"
            :current-page="sectionData.lastResponseMeta.currentPage"
            class="section__pagination"
            @page-changed="handlePageChanging"
          />
        </template>

        <span
          v-else
          class="section__emptyItemsStub"
          v-text="'Нет данных'"
        />

      </template>
    </template>

  </BaseSectionLayout>
</template>

<script>
import { mapState } from 'vuex';

import BaseActionButton from '@x10d/vue-kit/src/components/BaseActionButton.vue';
import BasePagination from '@x10d/vue-kit/src/components/BasePagination.vue';
import BaseTable from '@x10d/vue-kit/src/components/BaseTable.vue';

import BaseSectionLayout from '@/components/BaseSectionLayout.vue';
import BaseSearchableInput from '@/components/BaseSearchableInput.vue';

import { moduleView } from '@/services';

import { FETCH_ITEMS } from '@/store/modules/table-section/action-types';

import {
  SET_SECTION_DATA_SOURCE_END_POINT,
  CLEAR_SECTION_DATA,
} from '@/store/modules/table-section/mutation-types';


export default {
  name: 'TheTableSection',

  components: {
    BaseActionButton,
    BasePagination,
    BaseSectionLayout,
    BaseSearchableInput,
    BaseTable,
  },

  watch: {
    activeModuleView(newValue) {
      this.$store.commit(CLEAR_SECTION_DATA);

      this.$store.commit(
        SET_SECTION_DATA_SOURCE_END_POINT,
        newValue.dataSourceEndPoint,
      );

      this.$store.dispatch(FETCH_ITEMS);
    },
  },

  computed: {
    ...mapState({
      sectionData: state => state.tableSectionData,
    }),

    activeModuleView() {
      return moduleView.getModuleView(this.$route.name);
    },

    isGlobalActionsShown() {
      return this.activeModuleView.globalActions
        && this.sectionData.loadingState === 'loaded';
    },
  },

  methods: {
    handlePageChanging(page) {
      this.$store.dispatch(FETCH_ITEMS, {
        page,
      });
    },
  },

  created() {
    this.$store.commit(
      SET_SECTION_DATA_SOURCE_END_POINT,
      this.activeModuleView.dataSourceEndPoint,
    );

    this.$store.dispatch(FETCH_ITEMS);
  },
};
</script>

<style lang="stylus" scoped>
@import "~@x10d/vue-kit/src/styles/variables/colors.styl"

.section__pagination
  margin-top 20px

.section__globalAction
  &:not(:first-child)
    margin-left 8px

.section__emptyItemsStub
    margin auto
    font-size 18px
    font-weight 400
    color $globalColorSlateGray
</style>
