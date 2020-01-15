import { format } from 'date-fns';

import store from '@/store';

import { ModuleView } from '@/interfaces';

import { api } from '@/services/api';
import { catalogs } from '@/services/catalogs';

import { CONFLICTS_ROUTE } from '@/router/route-names';

import {
  assembleCommonModalConfig,
  setLocalityDependentFieldVisibility,
  setLocalityDependentModelValues,
  tableSectionCreateItemAction,
  tableSectionDeleteItemAction,
  tableSectionUpdateItemAction,
} from '@/module-views/common-parts';

import {
  createFormFields as createEventFormFields,
  createFromConflictsFormHandlers as createEventFormHandlers,
} from '../events/forms';

import {
  createFormFields,
  createFormHandlers,
  updateFormFields,
  updateFormHandlers,
} from './forms';


import {
  MERGE_ITEM_BY_ID,
  SET_SECTION_LOADING_STATE,
} from '@/store/modules/table-section/mutation-types';


export default {
  name: CONFLICTS_ROUTE,
  dataSourceEndPoint: 'conflicts',
  title: 'Конфликты',
  allowSearch: true,
  tableView: {
    columns: [
      {
        name: 'id',
        title: 'ID',
        typeOfCell: 'string',
        minWidth: 80,
      },
      {
        name: 'titleRu',
        title: 'Заголовок',
        typeOfCell: 'html',
        formatCellText: ({ data }) => (data
          ? `<span>${data}</span>`
          : '<span style="color:#EB171F;">Не указан</span>'),
        minWidth: 240,
      },
      {
        name: 'createdAt',
        title: 'Дата создания',
        typeOfCell: 'string',
        formatCellText: ({ data }) => format(new Date(data), 'dd-MM-yyyy HH:mm'),
        minWidth: 120,
        sortable: true,
      },
      {
        name: 'conflictReasonId',
        title: 'Причина',
        typeOfCell: 'html',
        // @ts-ignore
        formatCellText: ({ data }) => (data
          // @ts-ignore
          ? `<span>${catalogs.getCatalogValue('conflictReasons', data).nameRu}</span>`
          : '<span style="color:#EB171F;">Не указана</span>'),
        minWidth: 120,
      },
      {
        name: 'dateTo',
        title: 'Дата окончания',
        typeOfCell: 'string',
        formatCellText: ({ data }) => format(new Date(data), 'dd-MM-yyyy HH:mm'),
        minWidth: 120,
        nullPlaceholder: '—',
      },
    ],
    itemActions: [
      {
        name: 'update',
        textContent: 'Изменить',
        modalConfig: assembleCommonModalConfig(
          'Редактирование конфликта',
          'Сохранить',
          {
            fields: updateFormFields,
            handlers: updateFormHandlers,
          },
          async (modalView, formView, formData) => {
            try {
              store.commit(SET_SECTION_LOADING_STATE, 'pending');

              store.commit(MERGE_ITEM_BY_ID, {
                id: formData.id,
                newItem: {
                  ...(await api.fetchItem('conflicts', formData.id)).data,
                  _isInherited: !!formData.parentEventId,
                  _parentEvent: formData.parentEventId
                    ? (await api.fetchItem('events', formData.parentEventId)).data
                    : null,
                },
              });
            } catch (error) {
              throw error;
            } finally {
              store.commit(SET_SECTION_LOADING_STATE, 'loaded');
            }
          },
        ),
        handler: tableSectionUpdateItemAction,
      },
      {
        name: 'remove',
        textContent: 'Удалить',
        confirmation: {
          title: 'Удаление конфликта',
          text: 'Вы точно хотите удалить конфликт?',
        },
        handler: tableSectionDeleteItemAction,
      },
      {
        name: 'addEvent',
        textContent: 'Добавить событие',
        modalConfig: assembleCommonModalConfig(
          'Создание события',
          'Добавить',
          {
            fields: createEventFormFields,
            handlers: createEventFormHandlers,
          },
          async (modalView, formView, formData) => {
            try {
              store.commit(SET_SECTION_LOADING_STATE, 'pending');

              const conflict = (await api.fetchItem('conflicts', formData.id)).data;
              const latestLocality = await api.fetchConflictLatestLocality(formData.id);

              const eventFormData = {
                conflict,
                conflictId: conflict.id,
                locality: latestLocality ? latestLocality.data : null,
                localityId: latestLocality ? latestLocality.data.id : null,
                latitude: formData.latitude,
                longitude: formData.longitude,
                date: Date.now(),
                published: true,
              };

              setLocalityDependentModelValues(eventFormData);
              // @ts-ignore
              setLocalityDependentFieldVisibility(eventFormData, formView.fields);

              return eventFormData;
            } catch (error) {
              throw error;
            } finally {
              store.commit(SET_SECTION_LOADING_STATE, 'loaded');
            }
          },
        ),
        handler: async (vueComponent: any, model: any) => {
          try {
            vueComponent.$store.commit(SET_SECTION_LOADING_STATE, 'pending');

            await api.createItem('events', model);
          } catch (error) {
            throw error;
          } finally {
            vueComponent.$store.commit(SET_SECTION_LOADING_STATE, 'loaded');
          }
        },
      },
    ],
  },
  globalActions: [
    {
      name: 'create',
      textContent: 'Создать',
      colorType: 'primary',
      modalConfig: assembleCommonModalConfig(
        'Создание конфликта',
        'Создать',
        {
          fields: createFormFields,
          handlers: createFormHandlers,
        },
      ),
      handler: tableSectionCreateItemAction,
    },
  ],
} as ModuleView;
