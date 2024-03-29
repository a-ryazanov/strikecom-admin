<template>
    <BaseSectionLayout
        v-loading="sectionData.loadingState === 'pending'"
        element-loading-background="rgba(17,32,57,0.45)"
        :title="activeModuleView.title"
    >

        <template
            v-show="isGlobalActionsShown"
            slot="headerAddon"
        >
            <BaseSearch
                v-if="activeModuleView.allowSearch"
                :value="sectionData.params.filters.fulltext"
                class="sectionHeader__search"
                @search="handleSearch"
            />

            <BaseActionButton
                v-for="action in activeModuleView.globalActions"
                :key="action.name"
                :action-view="action"
                class="sectionHeader__action"
            />
        </template>

        <template slot="content">
            <template v-if="sectionData.loadingState === 'loaded'">

                <template v-if="sectionData.items.length !== 0">
                    <BaseTable
                        :view="activeModuleView.tableView"
                        :items="sectionData.items"
                        :sorting-direction="sortingDirection"
                        :sorting-column-name="sortingColumnName"
                        class="section__table"
                        @sorting-parameters-changed="changeSortingParameters"
                    />

                    <section
                        class="section__pagination"
                    >
                        <BasePagination
                            :last-page="sectionData.lastResponseMeta.lastPage"
                            :current-page="sectionData.lastResponseMeta.currentPage"
                            @page-changed="handlePageChanging"
                        />

                        <BaseInput
                            :value="sectionData.lastResponseMeta.currentPage.toString()"
                            class="sectionPagination__input"
                            @input="debouncedOnPageChange"
                        />
                    </section>
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
import { mapState } from 'vuex'
import { debounce } from 'lodash-es'

import BaseActionButton from '@x10d/vue-kit/src/components/BaseActionButton.vue'
import BasePagination from '@x10d/vue-kit/src/components/BasePagination.vue'
import BaseTable from '@x10d/vue-kit/src/components/BaseTable.vue'
import BaseInput from '@x10d/vue-kit/src/components/BaseInput.vue'

// eslint-disable-next-line import/no-cycle
import BaseSectionLayout from '@/components/BaseSectionLayout.vue'
import BaseSearch from '@/components/BaseSearch.vue'

import { moduleView } from '@/services'

import { FETCH_ITEMS } from '@/store/modules/table-section/action-types'

import {
    CLEAR_SECTION_DATA,
    SET_SECTION_DATA_SOURCE_END_POINT,
    UPDATE_SECTION_PARAMS,
} from '@/store/modules/table-section/mutation-types'


export default {
    name: 'TheTableSection',

    components: {
        BaseActionButton,
        BasePagination,
        BaseSectionLayout,
        BaseSearch,
        BaseTable,
        BaseInput,
    },

    data() {
        return {
            debouncedOnPageChange: () => {},
        }
    },

    computed: {
        ...mapState({
            sectionData: state => state.tableSectionData,
        }),

        activeModuleView() {
            return moduleView.getModuleView(this.$route.name)
        },

        isGlobalActionsShown() {
            return this.activeModuleView.globalActions &&
        this.sectionData.loadingState === 'loaded'
        },

        sortingColumnName() {
            return this.sectionData.params.sort.field || null
        },

        sortingDirection() {
            return this.sectionData.params.sort.order || null
        },
    },

    watch: {
        activeModuleView(newValue) {
            this.$store.commit(CLEAR_SECTION_DATA)

            this.$store.commit(
                SET_SECTION_DATA_SOURCE_END_POINT,
                newValue.dataSourceEndPoint,
            )

            this.$store.dispatch(FETCH_ITEMS)
        },
    },

    created() {
        this.$store.commit(
            SET_SECTION_DATA_SOURCE_END_POINT,
            this.activeModuleView.dataSourceEndPoint,
        )

        this.$store.dispatch(FETCH_ITEMS)

        this.debouncedOnPageChange = debounce(this.handlePageChanging, 400)
    },

    methods: {
        changeSortingParameters(field, order) {
            if (order) {
                this.$store.commit(UPDATE_SECTION_PARAMS, {
                    sort: {
                        field,
                        order,
                    },
                })
            }
            else {
                this.$store.commit(UPDATE_SECTION_PARAMS, {
                    sort: {},
                })
            }

            this.$store.dispatch(FETCH_ITEMS)
        },

        handlePageChanging(page) {
            if (page > 0) {
                this.$store.dispatch(FETCH_ITEMS, {
                    page,
                })
            }
        },

        async handleSearch() {
            await this.$store.dispatch(FETCH_ITEMS)
        },
    },
}
</script>

<style lang="stylus" scoped>
@import "~@x10d/vue-kit/src/styles/variables/colors.styl"

.sectionHeader__search
  margin-left 20px
  margin-right auto

.sectionHeader__action
  margin-left auto

  &:not(:first-child)
    margin-left 8px

.section__table
  flex-grow 1

.section__emptyItemsStub
    margin auto
    font-size 18px
    font-weight 400
    color $globalColorSlateGray

.section__pagination
  display flex
  flex-direction row
  margin-top 20px

.sectionPagination__input
  width 32px
  margin-left 12px
</style>
