import Vue from 'vue';
import { map, forEach } from 'lodash-es';

import IPropertyFieldView from '@x10d/vue-kit/src/types/IPropertyFieldView.d';
import IFormHandlers from '@x10d/vue-kit/src/types/IFormHandlers.d';

import BaseSearchableMultiselect from '@/components/BaseSearchableMultiselect.vue';

import { catalogs } from '@/services/catalogs';
import { api } from '@/services/api';

import { Locale, localesMappings } from '@/interfaces';

import {
  languageDependentFieldGroups,
  languageDependentFieldMappings,
  setLanguageDependentFieldsVisibility,
} from '@/module-views/common-parts';


// Сопоставления локальных полей серверным
const catalogsFieldsMappings = {
  _eventStatus: 'eventStatusId',
  _eventType: 'eventTypeId',
};

const commonFormFields : Array<IPropertyFieldView> = [
  {
    name: '_eventType',
    title: 'Тип события',
    typeOfControl: 'multiselect',
    labelPosition: 'top',
    specificControlProps: {
      incomingOptions: catalogs.getCatalog('eventTypes'),
      formatFieldTitle: value => value.nameRu,
    },
    catalogName: 'eventTypes',
  },
  {
    name: '_eventStatus',
    title: 'Статус события',
    typeOfControl: 'multiselect',
    labelPosition: 'top',
    specificControlProps: {
      incomingOptions: catalogs.getCatalog('eventStatuses'),
      formatFieldTitle: value => value.nameRu,
    },
    catalogName: 'eventStatuses',
  },
  {
    name: '_country',
    title: 'Страна',
    typeOfControl: BaseSearchableMultiselect,
    specificControlProps: {
      async searchOptions(value: string) {
        return (await api.fetchItems('countries', {
          name: value,
        })).data;
      },
      validateQueryValue: value => value !== '' && value.length >= 3,
      formatFieldTitle: value => value.nameRu,
    },
    labelPosition: 'top',
    validator: 'required',
  },
  {
    name: '_region',
    title: 'Регион',
    typeOfControl: BaseSearchableMultiselect,
    specificControlProps: {
      async searchOptions(value: string, model: any) {
        return (await api.fetchItems('regions', {
          countryId: model._country.id,
          name: value,
        })).data;
      },
      validateQueryValue: value => value !== '' && value.length >= 3,
      formatFieldTitle: value => value.name,
    },
    labelPosition: 'top',
    validator: 'required',
    hidden: true,
  },
  {
    name: '_locality',
    title: 'Населенный пункт',
    typeOfControl: BaseSearchableMultiselect,
    specificControlProps: {
      async searchOptions(value: string, model: any) {
        return (await api.fetchItems('localities', {
          regionId: model._region.id,
          name: value,
        })).data;
      },
      validateQueryValue: value => value !== '' && value.length >= 3,
      formatFieldTitle: value => value.name,
    },
    labelPosition: 'top',
    validator: 'required',
    hidden: true,
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
    name: 'date',
    title: 'Дата события',
    typeOfControl: 'dateRange',
    labelPosition: 'top',
    validator: 'required',
    specificControlProps: {
      pickerType: 'date',
      valueFormat: 'timestamp',
    },
  },
  {
    name: 'conflict',
    title: 'Конфликт',
    typeOfControl: 'multiselect',
    labelPosition: 'top',
    tooltip: 'Конфликт, к которому привязано событие',
    validator: 'required',
    specificControlProps: {
      fetchOptions: async () => {
        const { data } = await api.fetchItems('conflicts', {
          brief: true,
          // Для того, чтобы не делать пагинацию в мультиселекте. Равно максимальному
          // числу элементов, отображаемых в мультиселекте
          perPage: 99999,
        });

        return data;
      },
      formatFieldTitle: value => value.titleRu || value.id,
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

    if (changedField.name === '_country') {
      const regionFieldViewIdx = formFields.findIndex(field => field.name === '_region');

      formFields[regionFieldViewIdx].hidden = !model._country;
    }

    if (changedField.name === '_region') {
      const localityFieldViewIdx = formFields.findIndex(field => field.name === '_locality');

      formFields[localityFieldViewIdx].hidden = !model._region;
    }

    if (changedField.name === '_locality') {
      Vue.set(
        model,
        'localityId',
        model._locality ? model._locality.id : null,
      );
    }

    if (changedField.name === 'conflict') {
      model.conflictId = model.conflict.id;
    }

    if (Object.keys(catalogsFieldsMappings).includes(changedField.name)) {
      const mappedFieldName = catalogsFieldsMappings[changedField.name];

      model[mappedFieldName] = model[changedField.name].id;
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

    forEach(catalogsFieldsMappings, (serverFieldName, localFieldName) => {
      if (model[serverFieldName]) {
        const fieldView = formFields.find(field => field.name === localFieldName);

        Vue.set(
          model,
          localFieldName,
          catalogs.getCatalogValue(fieldView.catalogName, model[serverFieldName]),
        );
      }
    });
  },
};
