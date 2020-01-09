import { format } from 'date-fns';

import BasePublicationStatusCell from '@/components/BasePublicationStatusCell.vue';

import store from '@/store';

import { ModuleView } from '@/interfaces';

import { FETCH_ITEM } from '@/store/modules/table-section/action-types';
import { EVENTS_ROUTE } from '@/router/route-names';

import {
  assembleCommonModalConfig,
  tableSectionCreateItemAction,
  tableSectionDeleteItemAction,
  tableSectionUpdateItemAction,
} from '@/module-views/common-parts';

import {
  createFormFields,
  createFormHandlers,
  updateFormFields,
  updateFormHandlers,
} from './forms';


export default {
  name: EVENTS_ROUTE,
  dataSourceEndPoint: 'events',
  title: 'События',
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
        name: 'conflict',
        title: 'Конфликт',
        typeOfCell: 'html',
        formatCellText: ({ data }) => (data.titleRu
          ? `<span>${data.titleRu}</span>`
          : '<span style="color:#EB171F;">Заголовок не указан</span>'),
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
        name: 'views',
        title: 'Просмотры',
        typeOfCell: 'string',
        minWidth: 60,
      },
      {
        name: 'published',
        title: 'Публикация',
        typeOfCell: BasePublicationStatusCell,
        minWidth: 60,
      },
    ],
    itemActions: [
      {
        name: 'publish',
        textContent: 'Опубликовать',
        hiddenCondition: item => item.published,
        confirmation: {
          title: 'Публикация новости',
          text: 'Вы точно хотите опубликовать новость?',
        },
        handler: async (vueComponent, model) => {
          await tableSectionUpdateItemAction(
            vueComponent,
            {
              id: model.id,
              published: true,
            },
          );
        },
      },
      {
        name: 'unPublish',
        textContent: 'Снять с публикации',
        hiddenCondition: item => !item.published,
        confirmation: {
          title: 'Снятие новости с публикации',
          text: 'Вы точно хотите снять новость с публикации?',
        },
        handler: async (vueComponent, model) => {
          await tableSectionUpdateItemAction(
            vueComponent,
            {
              id: model.id,
              published: false,
            },
          );
        },
      },
      {
        name: 'update',
        textContent: 'Изменить',
        modalConfig: assembleCommonModalConfig(
          'Редактирование события',
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
          title: 'Удаление новости',
          text: 'Вы точно хотите удалить новость?',
        },
        handler: tableSectionDeleteItemAction,
      },
    ],
  },
  globalActions: [
    {
      name: 'create',
      textContent: 'Создать',
      colorType: 'primary',
      modalConfig: assembleCommonModalConfig(
        'Создание события',
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
