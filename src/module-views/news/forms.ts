import {
  includes,
} from 'lodash-es';

import Vue from 'vue';

import IFormView from '@x10d/vue-kit/src/types/IFormView';
import IPropertyFieldView from '@qr/vue-kit/src/types/IPropertyFieldView';
import { api } from '@/services';

// @ts-ignore
import BaseSearchableMultiselect from '@/components/BaseSearchableMultiselect';


export const commonFormFields = [
  {
    name: 'titleRu',
    title: 'Заголовок',
    typeOfControl: 'string',
    labelPosition: 'top',
    validator: 'required',
  },
  {
    name: 'contentRu',
    title: 'Описание',
    typeOfControl: 'string',
    labelPosition: 'top',
    validator: 'required',
  },
  {
    name: 'date',
    title: 'Дата',
    typeOfControl: 'dateRange',
    labelPosition: 'top',
    specificControlProps: {
      pickerType: 'date',
    },
  },
] as Array<IPropertyFieldView>;


// Админская форма создания / редактирования облака
// export const createEditFormFields = [
//   ...commonCreateUpdateFormsFields,
//   {
//     name: 'alias',
//     title: 'Имя облака',
//     typeOfControl: 'string',
//     labelPosition: 'top',
//     validator: 'required|alpha_num',
//   },
//   {
//     name: 'cloud_type',
//     title: 'Тип облака',
//     typeOfControl: BillingEnumMultiselect,
//     specificControlProps: {
//       placeholder: 'Тип облака',
//     },
//     labelPosition: 'top',
//   },
//   {
//     name: 'send_invoice_to_email',
//     title: 'Отправлять счета на email компании',
//     typeOfControl: 'switch',
//     labelPosition: 'side',
//   },
//   {
//     name: 'send_act_to_email',
//     title: 'Отправлять акты на email компании',
//     typeOfControl: 'switch',
//     labelPosition: 'side',
//   },
// ] as Array<IPropertyFieldView>;
