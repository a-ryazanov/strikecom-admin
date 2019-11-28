import { format } from 'date-fns';

import { ModuleView } from '@/interfaces';

import {
  assembleCommonModalConfig,
  tableSectionCreateItemAction,
  tableSectionDeleteItemAction,
  tableSectionUpdateItemAction,
} from '@/module-views/common-parts';

import { commonFormFields } from '@/module-views/news/forms';

import { NEWS_ROUTE } from '@/router/route-names';


export default {
  name: NEWS_ROUTE,
  dataSourceEndPoint: 'news',
  title: 'Новости',
  tableView: {
    columns: [
      {
        name: 'titleRu',
        title: 'Номер',
        typeOfCell: 'string',
        minWidth: 240,
        nullPlaceholder: 'Заголовок не указан',
      },
      {
        name: 'date',
        title: 'Дата новости',
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
        name: 'update',
        textContent: 'Изменить',
        modalConfig: assembleCommonModalConfig(
          'Редактирование новости',
          'Сохранить',
          {
            fields: commonFormFields,
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
          fields: commonFormFields,
        },
      ),
      handler: tableSectionCreateItemAction,
    },
  ],
} as ModuleView;
