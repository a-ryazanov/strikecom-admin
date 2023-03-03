import { map } from 'lodash-es'

import IPropertyFieldView from '@x10d/vue-kit/src/types/IPropertyFieldView.d'
import IFormHandlers from '@x10d/vue-kit/src/types/IFormHandlers.d'

import BaseSearchableMultiselect from '@/components/BaseSearchableMultiselect.vue'

import { api } from '@/services/api'
import { catalogs } from '@/services/catalogs'

import {
    Dictionary,
    Locale,
    localesMappings,
} from '@/interfaces'

import {
    setCoordsDependentModelValuesFromLocalValue,
    setCoordsDependentModelValuesFromServerValues,
    setLanguageDependentModelValuesFromServerValues,
    setLanguageDependentModelValuesFromLocalValue,
    setLanguageDependentFieldsVisibility,
    setCatalogsDependentModelValueFromLocalValue,
    setCatalogsDependentModelValuesFromServerValues,
} from '@/module-views/common-parts'


// Сопоставления локальных полей серверным
const catalogsFieldsMappings : Dictionary = {
    _conflictReason: 'conflictReasonId',
    _conflictResult: 'conflictResultId',
    _conflictType: 'mainTypeId',
    _industry: 'industryId',
}

function setInheritDependentFieldsVisibility(
    model : any,
    formFields : Array<IPropertyFieldView>,
) : void {
    const parentEventFieldView = formFields.find(field => field.name === '_parentEvent')

    // @ts-ignore
    parentEventFieldView.hidden = !model._isInherited
}

function setInheritDependentModelValuesFromLocalValues(model : any) : void {
    if (!model._isInherited) {
        model._parentEvent = null
        model.parentEventId = null
    }
}


const commonFormFields : Array<IPropertyFieldView> = [
    {
        name: '_isInherited',
        title: 'Вытекает из события',
        typeOfControl: 'switch',
        labelPosition: 'side',
        tooltip: 'Флаг, говорящий о том, вытекает ли конфликт из события другого конфликта.',
    },
    {
        name: '_parentEvent',
        title: 'Родительское событие',
        // @ts-ignore
        typeOfControl: BaseSearchableMultiselect,
        labelPosition: 'top',
        specificControlProps: {
            async searchOptions(value : string) {
                return (await api.fetchItems('events', {
                    filters: {
                        fulltext: value,
                    },
                })).data
            },
            formatFieldTitle: (value : any) => value.titleRu,
            debouncedInputSearch: false,
            placeholder: 'Поиск',
        },
        hidden: true,
    },
    {
        name: '_conflictReason',
        title: 'Причина конфликта',
        typeOfControl: 'multiselect',
        labelPosition: 'top',
        specificControlProps: {
            fetchOptions: () => catalogs.getCatalog('conflictReasons') || [],
            formatFieldTitle: (value : any) => value.nameRu,
        },
        catalogName: 'conflictReasons',
        validator: 'required',
    },
    {
        name: '_conflictType',
        title: 'Тип конфликта',
        typeOfControl: 'multiselect',
        labelPosition: 'top',
        specificControlProps: {
            fetchOptions: () => catalogs.getCatalog('eventTypes') || [],
            formatFieldTitle: (value : any) => value.nameRu,
        },
        catalogName: 'eventTypes',
    },
    {
        name: 'companyName',
        title: 'Компания',
        typeOfControl: 'string',
        labelPosition: 'top',
        validator: 'min:3|max:500',
    },
    {
        name: '_industry',
        title: 'Отрасль производства',
        typeOfControl: 'multiselect',
        labelPosition: 'top',
        specificControlProps: {
            fetchOptions: () => catalogs.getCatalog('industries') || [],
            formatFieldTitle: (value : any) => value.nameRu,
        },
        catalogName: 'industries',
    },
    {
        name: '_googleCoords',
        title: 'Координаты',
        typeOfControl: 'string',
        labelPosition: 'top',
        tooltip: 'Широта и долгота через запятую, без пробелов',
        validator: 'required',
    },
    {
        name: 'dateFrom',
        title: 'Дата начала',
        typeOfControl: 'dateRange',
        labelPosition: 'top',
        validator: 'required',
        specificControlProps: {
            pickerType: 'datetime',
            valueFormat: 'timestamp',
        },
    },
    {
        name: 'dateTo',
        title: 'Дата окончания',
        typeOfControl: 'dateRange',
        labelPosition: 'top',
        specificControlProps: {
            pickerType: 'datetime',
            valueFormat: 'timestamp',
        },
    },
    {
        name: '_conflictResult',
        title: 'Результат конфликта',
        typeOfControl: 'multiselect',
        labelPosition: 'top',
        specificControlProps: {
            fetchOptions: () => catalogs.getCatalog('conflictResults') || [],
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
        hidden: false,
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
]

const commonFormHandlers : IFormHandlers = {
    input: (model, formFields, changedField) => {
        if (changedField.name === '_isInherited') {
            setInheritDependentFieldsVisibility(model, formFields)
            setInheritDependentModelValuesFromLocalValues(model)
        }

        if (changedField.name === '_parentEvent') {
            model.parentEventId = model._parentEvent
                ? model._parentEvent.id
                : null
        }

        if (changedField.name === '_languages') {
            setLanguageDependentFieldsVisibility(model, formFields)
            setLanguageDependentModelValuesFromLocalValue(model)
        }

        if (changedField.name === '_googleCoords') {
            setCoordsDependentModelValuesFromLocalValue(model)
        }

        if (Object.keys(catalogsFieldsMappings).includes(changedField.name)) {
            setCatalogsDependentModelValueFromLocalValue(
                model,
                changedField,
                catalogsFieldsMappings,
            )
        }
    },
}


export const createFormFields : Array<IPropertyFieldView> = [
    ...commonFormFields,
]

export const createFormHandlers : IFormHandlers = {
    ...commonFormHandlers,
    open: (model) => {
        model.dateFrom = Date.now()
        model.conflictResultId = 7
        model._conflictResult = {
            id: 7,
            nameDe: 'Im Gange',
            nameEn: 'In progress',
            nameEs: 'En progreso',
            nameRu: 'В прогрессе',
        }
        model._languages = [{
            id: Locale.RU,
            title: localesMappings[Locale.RU],
        }]
    },
}


export const updateFormFields : Array<IPropertyFieldView> = [
    {
        name: 'createdAt',
        title: 'Дата создания конфликта',
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
        setInheritDependentFieldsVisibility(model, formFields)

        setLanguageDependentModelValuesFromServerValues(model)

        setLanguageDependentFieldsVisibility(model, formFields)

        setCoordsDependentModelValuesFromServerValues(model)

        setCatalogsDependentModelValuesFromServerValues(model, formFields, catalogsFieldsMappings)
    },
}
