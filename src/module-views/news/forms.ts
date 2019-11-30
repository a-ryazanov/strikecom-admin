import Vue from 'vue';
import { map } from 'lodash-es';

import IPropertyFieldView from '@x10d/vue-kit/src/types/IPropertyFieldView.d';
import IFormHandlers from '@x10d/vue-kit/src/types/IFormHandlers.d';

import { Locale, localesMappings } from '@/interfaces';

import {
  languageDependentFieldGroups,
  languageDependentFieldMappings,
  setLanguageDependentFieldsVisibility,
} from '@/module-views/common-parts';


const commonFormFields : Array<IPropertyFieldView> = [
  {
    name: 'date',
    title: 'Дата новости',
    typeOfControl: 'dateRange',
    labelPosition: 'top',
    validator: 'required',
    specificControlProps: {
      pickerType: 'date',
      valueFormat: 'timestamp',
    },
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
    name: 'contentRu',
    title: 'Описание на русском',
    typeOfControl: 'string',
    labelPosition: 'top',
    hidden: true,
    validator: 'required|min:3',
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
    name: 'contentEn',
    title: 'Описание на английском',
    typeOfControl: 'string',
    labelPosition: 'top',
    hidden: true,
    validator: 'required|min:3',
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
    name: 'contentEs',
    title: 'Описание на испанском',
    typeOfControl: 'string',
    labelPosition: 'top',
    hidden: true,
    validator: 'required|min:3',
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
  {
    name: 'contentDe',
    title: 'Описание на немецком',
    typeOfControl: 'string',
    labelPosition: 'top',
    hidden: true,
    validator: 'required|min:3',
    localeName: Locale.DE,
  },
  {
    name: 'sourceLink',
    title: 'Ссылка на источник',
    typeOfControl: 'string',
    labelPosition: 'top',
    validator: 'max:255',
  },
  {
    name: 'tag',
    title: 'Тэги',
    typeOfControl: 'tag',
    labelPosition: 'top',
    specificControlProps: {
      placeholder: 'Добавьте тэг',
    },
  },
  {
    name: 'photos',
    title: 'Фотографии',
    typeOfControl: 'tag',
    labelPosition: 'top',
    description: 'Ссылки на фотографии',
  },
];

const commonFormHandlers : IFormHandlers = {
  input: (model, formFields, changedField) => {
    if (changedField.name === '_languages') {
      // !!! Изменяет представление !!!
      setLanguageDependentFieldsVisibility(
        map(model._languages, 'id'),
        formFields,
      );
    }
  },
};


export const createFormFields : Array<IPropertyFieldView> = [
  ...commonFormFields,
  {
    name: 'published',
    title: 'Публикация',
    typeOfControl: 'switch',
    labelPosition: 'side',
    description: 'Опубликовать ли новость сразу после создания?',
  },
];

export const createFormHandlers : IFormHandlers = {
  ...commonFormHandlers,
};


export const updateFormFields : Array<IPropertyFieldView> = [
  ...commonFormFields,
];

export const updateFormHandlers : IFormHandlers = {
  ...commonFormHandlers,
  open: (model, formFields) => {
    languageDependentFieldGroups[0].forEach((fieldName) => {
      if (model[fieldName]) {
        Vue.set(
          model,
          '_languages',
          model._languages
            ? [
              ...model._languages,
              languageDependentFieldMappings[fieldName],
            ]
            : [languageDependentFieldMappings[fieldName]],
        );
      }
    });

    setLanguageDependentFieldsVisibility(
      map(model._languages, 'id'),
      formFields,
    );
  },
};
