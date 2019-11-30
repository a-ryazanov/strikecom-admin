import { format } from 'date-fns';
import { ModuleView } from '@/interfaces';

import { catalogs } from '@/services/catalogs';

import { CONFLICTS_ROUTE } from '@/router/route-names';
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
  name: CONFLICTS_ROUTE,
  dataSourceEndPoint: 'conflicts',
  title: 'Конфликты',
  tableView: {
    columns: [
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
        handler: () => alert('TODO'),
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
