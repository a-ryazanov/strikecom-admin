import { format } from 'date-fns';

import store from '@/store';

import { ModuleView } from '@/interfaces';

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
} from '@/module-views/news/forms';

import { FETCH_ITEM } from '@/store/modules/table-section/action-types';

import { NEWS_ROUTE } from '@/router/route-names';


export default {
  name: NEWS_ROUTE,
  dataSourceEndPoint: 'news',
  title: 'Новости',
  tableView: {
    columns: [
      {
        name: 'id',
        title: 'ID',
        typeOfCell: 'string',
        minWidth: 40,
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
        formatCellText: ({ data }) => format(new Date(data * 1000), 'dd-MM-yyyy HH:mm'),
        minWidth: 80,
      },
      {
        name: 'views',
        title: 'Просмотры',
        typeOfCell: 'string',
        minWidth: 40,
      },
      {
        name: 'published',
        title: 'Публикация',
        typeOfCell: 'string',
        formatCellText: ({ data }) => (data ? 'Да' : 'Нет'),
        minWidth: 40,
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
              ...model,
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
              ...model,
              published: false,
            },
          );
        },
      },
      {
        name: 'update',
        textContent: 'Изменить',
        modalConfig: assembleCommonModalConfig(
          'Редактирование новости',
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
        'Создание новости',
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
