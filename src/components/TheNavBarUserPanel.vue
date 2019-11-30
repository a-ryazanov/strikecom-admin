<template>
  <ElDropdown
    trigger="click"
    size="small"
    class="userPanel"
  >
    <div class="userPanel__main">
      <ElAvatar
        shape="square"
        size="small"
        :src="user ? user.imageUrl : null"
        icon="el-icon-user-solid"
        :alt="user ? user.name : null"
        class="userPanel__avatar"
      />

      <span
        class="userPanel__userName"
        v-text="user ? user.name : null"
      />

      <ElIcon
        name="arrow-down"
        class="userPanel__chevron"
      />
    </div>

    <ElDropdownMenu slot="dropdown" class="userPanel__dropdown">
      <ElDropdownItem>
        <span @click="signOut">Выйти</span>
      </ElDropdownItem>
    </ElDropdownMenu>
  </ElDropdown>
</template>

<script>
import { mapState } from 'vuex';
import {
  Avatar,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Icon,
} from 'element-ui';

import { firebase } from '@/services';

import { LOGIN_ROUTE } from '@/router/route-names';


export default {
  name: 'TheNavBarUserPanel',

  components: {
    [Avatar.name]: Avatar,
    [Dropdown.name]: Dropdown,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Icon.name]: Icon,
  },

  computed: {
    ...mapState({
      user: state => state.auth.user,
    }),
  },

  methods: {
    async signOut() {
      await firebase.signOut();
    },
  },
};
</script>

<style lang="stylus" scoped>
@import "~@x10d/vue-kit/src/styles/variables/colors.styl"


.userPanel
  width 100%
  padding 22px 20px 0 22px

.userPanel__main
  display flex
  align-items center

.userPanel__avatar
  margin-right 7px

.userPanel__userName,
.userPanel__chevron
  font-size 13px
  line-height 15px
  color $globalColorNileBlue

.userPanel__chevron
  display block
  margin-left auto
  font-weight 700

</style>
