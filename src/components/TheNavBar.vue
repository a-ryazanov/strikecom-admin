<template>
    <div class="theNavBar">
        <TheNavBarUserPanel/>

        <ElMenu
            unique-opened
            :default-active="activeRouteName"
            class="theNavBar__menu"
        >
            <Component
                :is="route.children ? 'ElSubmenu' : 'ElMenuItem'"
                v-for="route in routes"
                :key="route.name"
                :index="route.name"
                class="theNavBarMenu__item"
                @click="handleMenuItemClick(route)"
            >
                <template v-if="route.children">
                    <span
                        slot="title"
                        v-text="route.meta.title"
                    />

                    <ElMenuItem
                        v-for="childRoute in route.children"
                        :key="childRoute.name"
                        :index="childRoute.name"
                        @click="handleMenuItemClick(childRoute)"
                        v-text="childRoute.meta.title"
                    />
                </template>

                <template v-else>
                    {{ route.meta.title }}
                </template>
            </Component>
        </ElMenu>
    </div>

</template>

<script>
import {
    Menu,
    Submenu,
    MenuItem,
} from 'element-ui'

import TheNavBarUserPanel from '@/components/TheNavBarUserPanel.vue'

// eslint-disable-next-line import/no-cycle
import { routes } from '@/router'


export default {
    name: 'TheNavBar',

    components: {
        [Menu.name]: Menu,
        [Submenu.name]: Submenu,
        [MenuItem.name]: MenuItem,
        TheNavBarUserPanel,
    },

    data: () => ({
        routes: null,
    }),

    computed: {
        activeRouteName() {
            return this.$route.name
        },
    },

    created() {
        this.routes = routes.filter(route => !!route.meta)
    },

    methods: {
        handleMenuItemClick(item) {
            if (this.$route.name !== item.name) {
                this.$router.push({
                    name: item.name,
                })
            }
        },
    },
}
</script>

<style lang="stylus">
@import '../styles/palette.styl'
@import '~@x10d/vue-kit/src/styles/mixins/text.styl'
@import '~@x10d/vue-kit/src/styles/variables/colors.styl'

.theNavBar__menu
  padding 0 20px
  background-color transparent
  border none

.theNavBarMenu__item
  commonTextStyles()
  height auto
  margin-top 4px
  padding 8px
  border-radius 4px
  color $globalColorNileBlue
  line-height unset

  &:first-child
    margin-top 22px

  &.is-active
    color $globalColorCobalt
    font-weight 500
    background-color $athens-grey

  &:hover:not(.is-active)
    color $globalColorNileBlue
    background-color $athens-grey

</style>
