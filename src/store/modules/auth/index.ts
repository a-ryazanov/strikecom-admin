import { Module } from 'vuex';

import { UserRole } from '@/interfaces';

import { SET_USER } from './mutation-types';

import { HAS_PERMISSIONS } from './getter-types';


interface AuthModule {
  user: any
}

const authModule : Module<AuthModule, any> = {

  state: {
    user: null,
  },

  getters: {

    [HAS_PERMISSIONS]: state => state.user
      && (
        state.user.roles.includes(UserRole.ADMIN)
        || state.user.roles.includes(UserRole.MODERATOR)
      ),

  },

  mutations: {

    [SET_USER]: (state, user: any) => {
      state.user = user;
    },

  },

};

export default authModule;
