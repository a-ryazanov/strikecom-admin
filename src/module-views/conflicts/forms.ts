import { map } from 'lodash-es';

import IPropertyFieldView from '@x10d/vue-kit/src/types/IPropertyFieldView.d';
import IFormHandlers from '@x10d/vue-kit/src/types/IFormHandlers.d';

import { catalogs } from '@/services/catalogs';
import {
  Dictionary,
  Locale,
  localesMappings,
} from '@/interfaces';

import {
  setLanguageDependentModelValues,
  setLanguageDependentFieldsVisibility,
  setCatalogsDependentModelValues,
} from '@/module-views/common-parts';


// Сопоставления локальных полей серверным
const catalogsFieldsMappings : Dictionary = {
  _conflictReason: 'conflictReasonId',
  _conflictResult: 'conflictResultId',
  _industry: 'industryId',
};

const commonFormFields : Array<IPropertyFieldView> = [
  {
    name: '_conflictReason',
    title: 'Причина конфликта',
    typeOfControl: 'multiselect',
    labelPosition: 'top',
    specificControlProps: {
      incomingOptions: catalogs.getCatalog('conflictReasons'),
      formatFieldTitle: (value : any) => value.nameRu,
    },
    catalogName: 'conflictReasons',
    validator: 'required',
  },
  {
    name: 'companyName',
    title: 'Компания',
    typeOfControl: 'string',
    labelPosition: 'top',
    validator: 'required|min:3|max:500',
  },
  {
    name: '_industry',
    title: 'Отрасль производства',
    typeOfControl: 'multiselect',
    labelPosition: 'top',
    specificControlProps: {
      incomingOptions: catalogs.getCatalog('industries'),
      formatFieldTitle: (value : any) => value.nameRu,
    },
    catalogName: 'industries',
  },
  {
    name: 'latitude',
    title: 'Широта',
    typeOfControl: 'number',
    labelPosition: 'side',
    specificControlProps: {
      showSpinners: false,
    },
    validator: 'required|max_value:90|min_value:-90',
  },
  {
    name: 'longitude',
    title: 'Долгота',
    typeOfControl: 'number',
    labelPosition: 'side',
    specificControlProps: {
      showSpinners: false,
    },
    validator: 'required|max_value:180|min_value:-180',
  },
  {
    name: 'dateFrom',
    title: 'Дата начала',
    typeOfControl: 'dateRange',
    labelPosition: 'top',
    validator: 'required',
    specificControlProps: {
      pickerType: 'date',
      valueFormat: 'timestamp',
    },
  },
  {
    name: 'dateTo',
    title: 'Дата окончания',
    typeOfControl: 'dateRange',
    labelPosition: 'top',
    specificControlProps: {
      pickerType: 'date',
      valueFormat: 'timestamp',
    },
  },
  {
    name: '_conflictResult',
    title: 'Результат конфликта',
    typeOfControl: 'multiselect',
    labelPosition: 'top',
    specificControlProps: {
      incomingOptions: catalogs.getCatalog('conflictResults'),
      formatFieldTitle: (value : any) => value.nameRu,
    },
    catalogName: 'conflictResults',
  },
  {
    name: '_languages',
    title: 'Языки',
    typeOfControl: 'multiselect',
    labelPosition: 'top',
    tooltip: 'Языки, на которые переведена новость',
    specificControlProps: {
      incomingOptions: map(localesMappings, (value, key) => ({
        // Поле id нужно для  BaseMultiselect, чтобы он мог отслеживать уникальность
        // элементов массива.
        id: key,
        title: value,
      })),
      multiple: true,
      placeholder: 'Выберите языки',
    },
    validator: 'required',
  },
  {
    name: 'titleRu',
    title: 'Заголовок на русском',
    typeOfControl: 'string',
    labelPosition: 'top',
    hidden: true,
    validator: 'required|max:255',
    localeName: Locale.RU,
  },
  {
    name: 'titleEn',
    title: 'Заголовок на английском',
    typeOfControl: 'string',
    labelPosition: 'top',
    hidden: true,
    validator: 'required|max:255',
    localeName: Locale.EN,
  },
  {
    name: 'titleEs',
    title: 'Заголовок на испанском',
    typeOfControl: 'string',
    labelPosition: 'top',
    hidden: true,
    validator: 'required|max:255',
    localeName: Locale.ES,
  },
  {
    name: 'titleDe',
    title: 'Заголовок на немецком',
    typeOfControl: 'string',
    labelPosition: 'top',
    hidden: true,
    validator: 'required|max:255',
    localeName: Locale.DE,
  },
];

const commonFormHandlers : IFormHandlers = {
  input: (model, formFields, changedField) => {
    if (changedField.name === '_languages') {
      setLanguageDependentFieldsVisibility(model, formFields);
    }

    if (Object.keys(catalogsFieldsMappings).includes(changedField.name)) {
      const mappedFieldName = catalogsFieldsMappings[changedField.name];

      model[mappedFieldName] = model[changedField.name].id;
    }
  },
};


export const createFormFields : Array<IPropertyFieldView> = [
  ...commonFormFields,
];

export const createFormHandlers : IFormHandlers = {
  ...commonFormHandlers,
  open: (model) => {
    model.dateFrom = new Date();
  },
};


export const updateFormFields : Array<IPropertyFieldView> = [
  {
    name: 'createdAt',
    title: 'Дата создания конфликта',
    typeOfControl: 'staticDate',
    labelPosition: 'side',
    tooltip: 'Дата создания сущности в базе данных ЗабастКом',
    specificControlProps: {
      format: 'date',
    },
  },
  ...commonFormFields,
];

export const updateFormHandlers : IFormHandlers = {
  ...commonFormHandlers,
  open: (model, formFields) => {
    setLanguageDependentModelValues(model);
    setLanguageDependentFieldsVisibility(model, formFields);

    setCatalogsDependentModelValues(model, formFields, catalogsFieldsMappings);
  },
};
