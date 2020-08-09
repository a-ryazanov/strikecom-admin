import { map } from 'lodash-es'

import IPropertyFieldView from '@x10d/vue-kit/src/types/IPropertyFieldView.d'
import IFormHandlers from '@x10d/vue-kit/src/types/IFormHandlers.d'

import BaseVideoInput from '@/components/BaseVideoInput.vue'

import {
    Locale,
    localesMappings,
    networksMappings,
} from '@/interfaces'

import {
    extendVideosValues,
    setLanguageDependentModelValuesFromLocalValue,
    setLanguageDependentModelValuesFromServerValues,
    setLanguageDependentFieldsVisibility,
    setNetworksDependentModelValuesFromLocalValue, setNetworksDependentModelValuesFromServerValues,
} from '@/module-views/common-parts'


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
        hidden: false,
        validator: 'required|max:255',
        localeName: Locale.RU,
    },
    {
        name: 'contentRu',
        title: 'Описание на русском',
        typeOfControl: 'string',
        labelPosition: 'top',
        hidden: false,
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
        name: 'networks',
        title: 'Cоцсети',
        typeOfControl: 'multiselect',
        labelPosition: 'top',
        tooltip: 'Cоцсети, в которые пойдет публикация',
        specificControlProps: {
            incomingOptions: map(networksMappings, (value, key) => ({
                // Поле id нужно для  BaseMultiselect, чтобы он мог отслеживать уникальность
                // элементов массива.
                id: key,
                title: value,
            })),
            multiple: true,
            placeholder: 'Выберите соцсети',
        },
        validator: 'required',
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
        typeOfControl: 'tag',
        labelPosition: 'top',
        tooltip: 'Ссылки на фотографии',
    },
    {
        name: 'videos',
        title: 'Видео',
        typeOfControl: BaseVideoInput,
        labelPosition: 'top',
    },
]

const commonFormHandlers : IFormHandlers = {
    input: (model, formFields, changedField) => {
        if (changedField.name === '_languages') {
            setLanguageDependentFieldsVisibility(model, formFields)
            setLanguageDependentModelValuesFromLocalValue(model)
        }

        if (changedField.name === '_networks') {
            setNetworksDependentModelValuesFromLocalValue(model)
        }
    },
}


export const createFormFields : Array<IPropertyFieldView> = [
    ...commonFormFields,
    {
        name: 'published',
        title: 'Публикация',
        typeOfControl: 'switch',
        labelPosition: 'side',
        tooltip: 'Опубликовать ли новость сразу после создания?',
    },
]

export const createFormHandlers : IFormHandlers = {
    ...commonFormHandlers,
    open: (model) => {
        model.date = Date.now()
        model.published = true
        model._languages = [{
            id: Locale.RU,
            title: localesMappings[Locale.RU],
        }]
    },
}


export const updateFormFields : Array<IPropertyFieldView> = [
    {
        name: 'createdAt',
        title: 'Дата создания новости',
        typeOfControl: 'staticDate',
        labelPosition: 'side',
        tooltip: 'Дата создания сущности в базе данных Забастком',
        specificControlProps: {
            format: 'date',
        },
    },
    ...commonFormFields,
]

export const updateFormHandlers : IFormHandlers = {
    ...commonFormHandlers,
    open: (model, formFields) => {
        setLanguageDependentModelValuesFromServerValues(model)
        setLanguageDependentFieldsVisibility(model, formFields)

        setNetworksDependentModelValuesFromServerValues(model)

        extendVideosValues(model)
    },
}
