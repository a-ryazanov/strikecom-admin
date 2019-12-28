import Vue from 'vue';
import { map } from 'lodash-es';

import BaseInputImageTag from '@x10d/vue-kit/src/components/BaseInputImageTag.vue';
import BaseModalForm from '@x10d/vue-kit/src/components/BaseModalForm.vue';

import IPropertyFieldView from '@x10d/vue-kit/src/types/IPropertyFieldView.d';
import IFormHandlers from '@x10d/vue-kit/src/types/IFormHandlers.d';

import BaseSearchableMultiselect from '@/components/BaseSearchableMultiselect.vue';

import { catalogs } from '@/services/catalogs';
import { api } from '@/services/api';

import {
  Dictionary,
  Locale,
  localesMappings,
} from '@/interfaces';

import {
  setCatalogsDependentModelValues,
  setLanguageDependentModelValues,
  setLanguageDependentFieldsVisibility,
  setLocalityDependentModelValues,
  setLocalityDependentFieldVisibility,
} from '@/module-views/common-parts';


// Сопоставления локальных полей серверным
const catalogsFieldsMappings : Dictionary = {
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
      formatFieldTitle: (value : any) => value.nameRu,
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
      formatFieldTitle: (value : any) => value.nameRu,
    },
    catalogName: 'eventStatuses',
  },
  {
    name: '_country',
    title: 'Страна',
    // @ts-ignore
    typeOfControl: BaseSearchableMultiselect,
    specificControlProps: {
      async searchOptions(value: string) {
        return (await api.fetchItems('countries', {
          name: value,
        })).data;
      },
      validateQueryValue: (value : any) => value !== '' && value.length >= 2,
      async createItem(value : string, model : any, componentInstance : any) {
        const modalResult = await componentInstance.$qrKitOpenModal(
          BaseModalForm,
          {
            modalView: {
              title: 'Создание страны',
              actions: [
                {
                  title: 'Отмена',
                  reason: 'dismiss',
                },
                {
                  title: 'Создать',
                  reason: 'accept',
                  colorType: 'primary',
                },
              ],
            },
            formView: {
              fields: [
                {
                  name: 'nameRu',
                  title: 'Название на русском',
                  typeOfControl: 'string',
                  labelPosition: 'top',
                  validator: 'required|max:255',
                },
                {
                  name: 'nameEn',
                  title: 'Название на английском',
                  typeOfControl: 'string',
                  labelPosition: 'top',
                  validator: 'required|max:255',
                },
                {
                  name: 'nameEs',
                  title: 'Название на испанском',
                  typeOfControl: 'string',
                  labelPosition: 'top',
                  validator: 'required|max:255',
                },
                {
                  name: 'nameDe',
                  title: 'Название на немецком',
                  typeOfControl: 'string',
                  labelPosition: 'top',
                  validator: 'required|max:255',
                },
              ],
            },
            formData: {
              nameRu: value,
            },
          },
        );

        if (modalResult.reason === 'accept') {
          const { data } = await api.createItem('countries', {
            ...modalResult.payload.formData,
          });

          model._country = data;
        }
      },
      noResultOptionTextPrefix: 'страну',
      formatFieldTitle: (value : any) => value.nameRu,
    },
    labelPosition: 'top',
    validator: 'required',
  },
  {
    name: '_region',
    title: 'Регион',
    // @ts-ignore
    typeOfControl: BaseSearchableMultiselect,
    specificControlProps: {
      async searchOptions(value: string, model: any) {
        return (await api.fetchItems('regions', {
          countryId: model._country.id,
          name: value,
        })).data;
      },
      validateQueryValue: (value : any) => value !== '' && value.length >= 2,
      async createItem(value : string, model : any) {
        const { data } = await api.createItem('regions', {
          countryId: model._country.id,
          name: value,
        });

        model._region = data;
      },
      noResultOptionTextPrefix: 'регион',
      formatFieldTitle: (value : any) => value.name,
    },
    labelPosition: 'top',
    validator: 'required',
    hidden: true,
  },
  {
    name: '_locality',
    title: 'Населённый пункт',
    // @ts-ignore
    typeOfControl: BaseSearchableMultiselect,
    specificControlProps: {
      async searchOptions(value: string, model: any) {
        return (await api.fetchItems('localities', {
          regionId: model._region.id,
          name: value,
        })).data;
      },
      validateQueryValue: (value : any) => value !== '' && value.length >= 2,
      async createItem(value : string, model : any) {
        const { data } = await api.createItem('localities', {
          regionId: model._region.id,
          name: value,
        });

        model._locality = data;
      },
      noResultOptionTextPrefix: 'населённый пункт',
      formatFieldTitle: (value : any) => value.name,
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
      formatFieldTitle: (value : any) => value.titleRu || value.id,
    },
  },
  {
    name: '_languages',
    title: 'Языки',
    typeOfControl: 'multiselect',
    labelPosition: 'top',
    tooltip: 'Языки, на которые переведено событие',
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
    name: 'tags',
    title: 'Тэги',
    typeOfControl: 'tag',
    labelPosition: 'top',
    specificControlProps: {
      placeholder: 'Добавьте тэг',
    },
  },
  {
    name: 'photoUrls',
    title: 'Фотографии',
    typeOfControl: BaseInputImageTag,
    labelPosition: 'top',
    tooltip: 'Ссылки на фотографии',
  },
];

const commonFormHandlers : IFormHandlers = {
  input: (model, formFields, changedField) => {
    if (changedField.name === '_languages') {
      setLanguageDependentFieldsVisibility(model, formFields);
    }

    if (changedField.name === '_country') {
      const regionFieldViewIdx = formFields.findIndex(field => field.name === '_region');
      const localityFieldViewIdx = formFields.findIndex(field => field.name === '_locality');

      formFields[regionFieldViewIdx].hidden = !model._country;
      formFields[localityFieldViewIdx].hidden = !model._country || !model._region;
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
    tooltip: 'Опубликовать ли новость сразу после создания?',
  },
];

export const createFormHandlers : IFormHandlers = {
  ...commonFormHandlers,
  open: (model) => {
    model.date = Date.now();
    model.published = true;
  },
};


export const updateFormFields : Array<IPropertyFieldView> = [
  {
    name: 'createdAt',
    title: 'Дата создания события',
    typeOfControl: 'staticDate',
    labelPosition: 'side',
    tooltip: 'Дата создания сущности в базе данных Забастком',
    specificControlProps: {
      format: 'date',
    },
  },
  ...commonFormFields,
];

export const updateFormHandlers : IFormHandlers = {
  ...commonFormHandlers,
  open: async (model, formFields) => {
    setLocalityDependentModelValues(model);
    setLocalityDependentFieldVisibility(model, formFields);

    setLanguageDependentModelValues(model);
    setLanguageDependentFieldsVisibility(model, formFields);

    setCatalogsDependentModelValues(model, formFields, catalogsFieldsMappings);
  },
};
