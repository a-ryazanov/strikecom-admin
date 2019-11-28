<template>
  <BaseSectionLayout :title="activeModuleView.title">
    <template
      v-if="isGlobalActionsShown"
      slot="headerAddon"
    >

      <BaseActionButton
        v-for="action in activeModuleView.globalActions"
        :key="action.name"
        :action-view="action"
      />
    </template>


    <template slot="content">
      <template v-if="sectionData.loadingState === 'loaded'">
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
    </template>
  </BaseSectionLayout>
</template>

<script>
import { mapState } from 'vuex';

import BaseActionButton from '@x10d/vue-kit/src/components/BaseActionButton.vue';
import BasePagination from '@x10d/vue-kit/src/components/BasePagination.vue';
import BaseTable from '@x10d/vue-kit/src/components/BaseTable.vue';

import BaseSectionLayout from '@/components/BaseSectionLayout.vue';

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
    BaseTable,
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

  // !!! Не `created`, т.к. `created` вызывается раньше, чем `beforeDestroy` предыдущего роута,
  // и, соответственно, при переходе от одной секции с данными к другой,
  // с `created` новая секция запрашивает данные раньше, чем старая отчистила в `beforeDestroy`
  mounted() {
    this.$store.commit(
      SET_SECTION_DATA_SOURCE_END_POINT,
      this.activeModuleView.dataSourceEndPoint,
    );

    this.$store.dispatch(FETCH_ITEMS);
  },

  beforeDestroy() {
    this.$store.commit(CLEAR_SECTION_DATA);
  },
};
</script>

<style lang="stylus" scoped>
.section__pagination
  margin-top 20px
</style>
