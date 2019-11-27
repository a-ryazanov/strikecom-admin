<template>
  <ElMenu
    unique-opened
    :default-active="activeRouteName"
    class="navMenu"
  >
    <Component
      v-for="route in routes"
      :key="route.name"
      :is="route.children ? 'ElSubmenu' : 'ElMenuItem'"
      :index="route.name"
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
</template>

<script>
import {
  Menu,
  Submenu,
  MenuItem,
} from 'element-ui';

import { routes } from '@/router';


export default {
  name: 'TheNavBar',

  data: () => ({
    routes: null,
  }),

  components: {
    [Menu.name]: Menu,
    [Submenu.name]: Submenu,
    [MenuItem.name]: MenuItem,
  },

  computed: {
    activeRouteName() {
      return this.$route.name;
    },
  },

  methods: {
    handleMenuItemClick(item) {
      if (this.$route.name !== item.name) {
        this.$router.push({
          name: item.name,
        });
      }
    },
  },

  created() {
    this.routes = routes.filter(route => route.path !== '/');
  },
};
</script>

<style lang="stylus">
@import '../styles/palette.styl'

.el-menu
  background-color transparent
  border none

.el-menu-item, .el-submenu__title
  &:hover
    background-color $athens-grey
</style>
