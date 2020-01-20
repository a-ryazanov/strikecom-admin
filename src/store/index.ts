import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import tableSectionData from './modules/table-section'


Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth,
        tableSectionData,
    },
    state: {
    },
    mutations: {
    },
    actions: {
    },
})
