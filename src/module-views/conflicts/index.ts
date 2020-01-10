import { format } from 'date-fns';

import store from '@/store';

import { ModuleView } from '@/interfaces';

import { catalogs } from '@/services/catalogs';

import { FETCH_ITEM } from '@/store/modules/table-section/action-types';
import { CONFLICTS_ROUTE } from '@/router/route-names';

import {
  assembleCommonModalConfig,
  tableSectionCreateItemAction,
  tableSectionDeleteItemAction,
  tableSectionUpdateItemAction,
} from '@/module-views/common-parts';

import {
  createFormFields as createEventFormFields,
  createFormHandlers as createEventFormHandlers,
} from '../events/forms';

import {
  createFormFields,
  createFormHandlers,
  updateFormFields,
  updateFormHandlers,
} from './forms';


export default {
  name: CONFLICTS_ROUTE,
  dataSourceEndPoint: 'conflicts',
  title: 'Конфликты',
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
        name: 'conflictResultId',
        title: 'Результат',
        typeOfCell: 'string',
        // @ts-ignore
        formatCellText: ({ data }) => catalogs.getCatalogValue('conflictResults', data).nameRu,
        minWidth: 120,
        nullPlaceholder: 'Не окончен',
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
            await store.dispatch(FETCH_ITEM, formData.id);
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
          'Создать',
          {
            fields: createEventFormFields,
            handlers: createEventFormHandlers,
          },
        ),
        handler: tableSectionUpdateItemAction,
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
