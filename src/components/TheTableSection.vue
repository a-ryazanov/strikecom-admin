<template>
  <BaseSectionLayout :title="activeModuleView.title">
    <template slot="content">
      <BaseTable
        :view="activeModuleView.tableView"
        :items="sectionData.items"
      />
    </template>
  </BaseSectionLayout>
</template>

<script>
import { mapState } from 'vuex';

import BaseActionButton from '@x10d/vue-kit/src/components/BaseActionButton';
import BasePagination from '@x10d/vue-kit/src/components/BasePagination';
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
    BaseSectionLayout,
    BaseTable,
  },

  computed: {
    ...mapState({
      sectionData: state => state.tableSectionData,
    }),

    activeModuleView() {
      return moduleView.getModuleView(this.$route.meta.moduleName);
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

<style scoped>

</style>
