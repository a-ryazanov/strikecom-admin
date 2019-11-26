<template>
  <TheTable
    :view="activeModuleView.tableView.columns"
  />
</template>

<script>
import TheTable from '@x10d/vue-kit/src/components/BaseTable.vue'
import { moduleView } from '@/services';


export default {
  name: 'TheMainSection',

  components: {
    TheTable,
  },

  computed: {
    activeModuleView() {
      return moduleView.getModuleView(this.$route.meta.moduleName);
    },
  },
};
</script>

<style scoped>

</style>
