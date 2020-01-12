import { Module } from 'vuex';
import { merge } from 'lodash-es';

import { api } from '@/services/api';

import { Dictionary } from '@/interfaces';

import {
  CLEAR_SECTION_DATA,
  MERGE_ITEM_BY_ID,
  SET_SECTION_DATA_SOURCE_END_POINT,
  SET_LAST_RESPONSE_META,
  SET_SECTION_ITEMS,
  SET_SECTION_LOADING_STATE,
  UPDATE_SECTION_PARAMS,
} from './mutation-types';

import {
  FETCH_ITEM,
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
  params: {
    sort: Dictionary
    filters: Dictionary
  }
  lastResponseMeta: any
}

const tableSectionModule: Module<TableSectionModule, any> = {
  state: {
    dataSourceEndPoint: '',
    loadingState: 'pending',
    items: [],
    params: {
      sort: {},
      filters: {
        fulltext: '',
      },
    },
    lastResponseMeta: null,
  },

  mutations: {
    [CLEAR_SECTION_DATA](state) {
      state.dataSourceEndPoint = '';
      state.loadingState = 'pending';
      state.items = [];
      state.params = {
        sort: {},
        filters: {
          fulltext: '',
        },
      };
      state.lastResponseMeta = null;
    },

    [MERGE_ITEM_BY_ID](state, { newItem, id }) {
      const itemIdx = state.items.findIndex(item => item.id === id);

      if (itemIdx === -1) {
        throw new Error('Setting non-existent item');
      }

      // TODO !!!Осторожно, изменяет объект!!! Это сделано из-за того,
      //      что при открытии модального окна нужно запросить детальные данные
      //      сущности у сервера и передать обновленные данные в модальное окно, НО
      //      x10d-vue-kit построен таким образом, что данные для модального окна
      //      передаются параметром в экшн таблицы ДО обновления данных.
      //      Строго говоря, нужно дорабатывать x10d-vue-kit, поскольку вышеописанное не хорошо.
      merge(state.items[itemIdx], newItem);
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

    [UPDATE_SECTION_PARAMS](state, params) {
      state.params = {
        ...state.params,
        ...params,
      };
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
        } = await api.fetchItems(state.dataSourceEndPoint, {
          ...state.params,
          ...params,
        });

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

    async [FETCH_ITEM]({ commit, state }, id) {
      commit(SET_SECTION_LOADING_STATE, 'pending');

      try {
        const { data: item } = await api.fetchItem(state.dataSourceEndPoint, id);

        commit(MERGE_ITEM_BY_ID, {
          id,
          newItem: item,
        });

        return item;
      } catch (error) {
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

        const { data: updatedItem } = await api.updateItem(state.dataSourceEndPoint, item);

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
