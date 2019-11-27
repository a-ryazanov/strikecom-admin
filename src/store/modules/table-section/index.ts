import { Module } from 'vuex';

import { api } from '@/services';

import {
  CLEAR_SECTION_DATA,
  SET_SECTION_DATA_SOURCE_END_POINT,
  SET_LAST_RESPONSE_META,
  SET_SECTION_ITEMS,
  SET_SECTION_LOADING_STATE,
  MERGE_ITEM_BY_ID,
} from './mutation-types';

import {
  FETCH_ITEMS,
  CREATE_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
} from './action-types';


type LoadingState = 'pending' | 'loaded'

interface TableSectionModule {
  dataSourceEndPoint: string
  loadingState: LoadingState
  items: Array<any>
  lastResponseMeta: {

  } | null
}

const tableSectionModule: Module<any, TableSectionModule> = {
  state: {
    dataSourceEndPoint: '',
    loadingState: 'pending',
    items: [],
    lastResponseMeta: null,
  },

  mutations: {
    [CLEAR_SECTION_DATA](state) {
      state.dataSourceEndPoint = '';
      state.loadingState = 'pending';
      state.items = [];
      state.lastResponseMeta = null;
    },

    [SET_SECTION_DATA_SOURCE_END_POINT](state, dataSourceEndPoint: string) {
      state.dataSourceEndPoint = dataSourceEndPoint;
    },

    [SET_LAST_RESPONSE_META](state, meta) {
      state.lastResponseMeta = meta;
    },

    [SET_SECTION_ITEMS](state, items: Array<any>) {
      state.items = items;
    },

    [SET_SECTION_LOADING_STATE](state, loadingState: LoadingState) {
      state.loadingState = loadingState;
    },

    [MERGE_ITEM_BY_ID](state, { newItem, id }) {
      const itemIdx = state.items.findIndex(item => item.id === id);

      if (itemIdx === -1) {
        throw new Error('Setting non-existent item');
      }

      state.items.splice(itemIdx, 1, {
        ...state.items[itemIdx],
        ...newItem,
      });
    },
  },

  actions: {

    async [FETCH_ITEMS]({ commit, state }, params) {
      const preRequestItems = state.items;

      commit(SET_SECTION_ITEMS, []);
      commit(SET_SECTION_LOADING_STATE, 'pending');

      try {
        const {
          data: items,
          meta,
        } = await api.fetchItems(state.dataSourceEndPoint, params);

        commit(SET_SECTION_ITEMS, items);

        commit(SET_LAST_RESPONSE_META, meta);

        return items;
      } catch (error) {
        commit(SET_SECTION_ITEMS, preRequestItems);

        throw error;
      } finally {
        commit(SET_SECTION_LOADING_STATE, 'loaded');
      }
    },

    async [CREATE_ITEM]({ dispatch, commit, state }, item) {
      try {
        commit(SET_SECTION_LOADING_STATE, 'pending');

        const createdItem = await api.createItem(state.dataSourceEndPoint, item);

        await dispatch(FETCH_ITEMS);

        return createdItem;
      } catch (error) {
        commit(SET_SECTION_LOADING_STATE, 'loaded');

        throw error;
      }
    },

    async [UPDATE_ITEM]({ commit, state }, item) {
      try {
        commit(SET_SECTION_LOADING_STATE, 'pending');

        const updatedItem = await api.updateItem(state.dataSourceEndPoint, item);

        commit(MERGE_ITEM_BY_ID, {
          id: item.id,
          newItem: updatedItem,
        });

        return updatedItem;
      } catch (error) {
        throw error;
      } finally {
        commit(SET_SECTION_LOADING_STATE, 'loaded');
      }
    },

    async [DELETE_ITEM]({ dispatch, commit, state }, item) {
      try {
        commit(SET_SECTION_LOADING_STATE, 'pending');

        const deletedItem = await api.deleteItem(state.dataSourceEndPoint, item);

        await dispatch(FETCH_ITEMS);

        return deletedItem;
      } catch (error) {
        commit(SET_SECTION_LOADING_STATE, 'loaded');

        throw error;
      }
    },
  },
};

export default tableSectionModule;
