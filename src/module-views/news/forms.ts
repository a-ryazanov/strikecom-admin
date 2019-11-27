import {
  includes,
} from 'lodash-es';

import Vue from 'vue';

import IFormView from '@qr/vue-kit/src/types/IFormView';
import IPropertyFieldView from '@qr/vue-kit/src/types/IPropertyFieldView';
import { api } from '@/services';

// @ts-ignore
import BaseSearchableMultiselect from '@/components/BaseSearchableMultiselect';


const subscribePriceCalculationFields = [
  'tariff_id',
  'terminal_count',
  '_tmp_subscribeDateRange',
];

// Общие поля для форм в модалках 'Создание' 'Админское создание', 'Редактирование'
const commonCreateUpdateFormsFields = [
  {
    name: 'company',
    title: 'Компания',
    typeOfControl: BaseSearchableMultiselect,
    specificControlProps: {
      async searchOptions(value: string) {
        return (await fetchSearch('billing/search/company', {
          q: value,
        })).data;
      },
      validateQueryValue(value: string) {
        return value !== '' && value.length >= 3;
      },
      formatFieldTitle(item: any) {
        return item.short_name;
      },
    },
    // eslint-disable-next-line max-len
    description: 'Для поиска введите минимум 3 символа имени, телефона, ИНН или адреса компании',
    labelPosition: 'top',
    validator: 'required',
  },
  {
    name: 'terminal_count',
    title: 'Кол-во терминалов',
    typeOfControl: 'number',
    labelPosition: 'side',
    validator: 'numeric|min_value:1',
  },
  {
    name: 'tariff',
    title: 'Тариф',
    typeOfControl: 'multiselect',
    specificControlProps: {
      async fetchOptions(): Promise<any[]> {
        return (await fetchList('/billing/tariff/reference')).data;
      },
      formatFieldTitle(item: any) {
        return item.title;
      },
      placeholder: 'Выберите тариф',
    },
    labelPosition: 'top',
  },
  // Временное поле где пользователь выбирает длительность подписки.
  // В `change` обработчике распиливается на `start_date` и `expiration_date`
  {
    name: '_tmp_subscribeDateRange',
    title: 'Длительность подписки',
    typeOfControl: 'dateRange',
    labelPosition: 'side',
    validator: 'required',
    specificControlProps: {
      pickerType: 'daterange',
      shortcuts: [
        // TODO. Сделать по ТЗ
        {
          text: 'Неделя',
          onClick(vm: any) {
            const start = new Date();
            const end = new Date();

            // "Прибавляем неделю" к концу периода
            end.setTime(end.getTime() + 3600 * 1000 * 24 * 7);

            vm.$emit('pick', [start, end]);
          },
        },
      ],
    },
  },
  {
    name: 'recurrent_pay',
    title: 'Использовать рекуррентные платежи',
    typeOfControl: 'switch',
    labelPosition: 'side',
  },
];

export const commonFormInputHandler = (
  model: any,
  formFields: Array<IPropertyFieldView>,
  changedField: IPropertyFieldView,
): void => {
  // Дата подписки представлено контролом "date-range",
  // значение которого массив с 2 значениями.
  // На сервер нужно отправлять 2 поля модели со стартом подписки и ее окончанием.
  if (changedField.name === '_tmp_subscribeDateRange') {
    // Сбросить поля, если значение промежутка сброшено
    if (model._tmp_subscribeDateRange === null) {
      model.start_date = null;
      model.expiration_date = null;
    }
    // Иначе присвоить полям значение и отформатировать
    else {
      model.start_date = Vue.filter('formatDate')(
        model._tmp_subscribeDateRange[0],
        'YYYY-MM-DD HH:mm:ss',
      );

      model.expiration_date = Vue.filter('formatDate')(
        model._tmp_subscribeDateRange[1],
        'YYYY-MM-DD HH:mm:ss',
      );
    }

    if (
      includes(
        subscribePriceCalculationFields,
        changedField.name,
      )
    ) {
      console.log('calculating');

      // TODO Отпавить куда-то объект с каким-то значением
    }
  }
};


export const commonCreateFormOpenHandler = (
  model: any,
): void => {
  // При создании облака необходимо указывать
  // минимальное необходимое количество терминалов
  model.terminal_count = 1;
};


// Обычная клиентская форма создания облака.
export const commonCreateFormFields = [
  ...commonCreateUpdateFormsFields,
  // Временное поле, которое рассчитывается в `change` обработчике
  {
    name: '_tmp_subscribeSum',
    title: 'Сумма подписки',
    typeOfControl: 'staticNumber',
    labelPosition: 'side',
  },
] as Array<IPropertyFieldView>;

// Админская форма создания / редактирования облака
export const createEditFormFields = [
  ...commonCreateUpdateFormsFields,
  {
    name: 'alias',
    title: 'Имя облака',
    typeOfControl: 'string',
    labelPosition: 'top',
    validator: 'required|alpha_num',
  },
  {
    name: 'cloud_type',
    title: 'Тип облака',
    typeOfControl: BillingEnumMultiselect,
    specificControlProps: {
      placeholder: 'Тип облака',
    },
    labelPosition: 'top',
  },
  {
    name: 'send_invoice_to_email',
    title: 'Отправлять счета на email компании',
    typeOfControl: 'switch',
    labelPosition: 'side',
  },
  {
    name: 'send_act_to_email',
    title: 'Отправлять акты на email компании',
    typeOfControl: 'switch',
    labelPosition: 'side',
  },
] as Array<IPropertyFieldView>;
