import Vue from 'vue'
import { flatten, forEach, map } from 'lodash-es'

import IFormView from '@x10d/vue-kit/src/types/IFormView.d'
import IModalPayload from '@x10d/vue-kit/src/types/IModalPayload.d'
import IPropertyFieldView from '@x10d/vue-kit/src/types/IPropertyFieldView.d'

import { catalogs } from '@/services/catalogs'

import { Dictionary, Locale } from '@/interfaces'

import {
    CREATE_ITEM,
    UPDATE_ITEM,
    DELETE_ITEM,
} from '@/store/modules/table-section/action-types'

import { COMMON_MODAL_FORM_WIDTH } from '@/config'


// Общие обработчики элементов таблицы
export async function tableSectionCreateItemAction(
    vueComponent : any,
    model : any,
) : Promise<any> {
    return vueComponent.$store.dispatch(CREATE_ITEM, model)
}

export async function tableSectionUpdateItemAction(
    vueComponent : any,
    model : any,
) : Promise<any> {
    return vueComponent.$store.dispatch(UPDATE_ITEM, model)
}

export async function tableSectionDeleteItemAction(
    vueComponent : any,
    model : any,
) : Promise<any> {
    return vueComponent.$store.dispatch(DELETE_ITEM, model)
}


// Вспомогательные функции
export function assembleCommonModalConfig(
    modalTitle : string,
    acceptButtonText : string,
    formView : IFormView,
    preinit ?: IModalPayload['preinit'],
) : {
        payload : IModalPayload
        options : object
    } {
    return {
        payload: {
            modalView: {
                title: modalTitle,
                actions: [
                    {
                        title: 'Отмена',
                        reason: 'dismiss',
                    },
                    {
                        title: acceptButtonText,
                        reason: 'accept',
                        colorType: 'primary',
                    },
                ],
            },
            formView,
            preinit,
        },
        options: {
            width: COMMON_MODAL_FORM_WIDTH,
        },
    }
}


// Сделано так, чтобы при открытии формы редактирования проверять наличие в серверной модели
// только одного поля из пары, для того, чтобы установить значение мультиселекта выбора языка
export const languageDependentFieldGroups = [
    [
        'titleRu',
        'titleEn',
        'titleEs',
        'titleDe',
    ],
    [
        'contentRu',
        'contentEn',
        'contentEs',
        'contentDe',
    ],
]

export const languageDependentFieldMappings : Dictionary<any> = {
    titleRu: { id: Locale.RU, title: 'Русский' },
    titleEn: { id: Locale.EN, title: 'Английский' },
    titleEs: { id: Locale.ES, title: 'Испанский' },
    titleDe: { id: Locale.DE, title: 'Немецкий' },
}

export function setLanguageDependentFieldsVisibility(
    model : any,
    formFields : Array<IPropertyFieldView>,
) : void {
    const modelLanguages = map(model._languages, 'id')
    const languageDependentFieldNames = flatten(languageDependentFieldGroups)

    const languageDependentFieldsIdx = formFields.reduce<Array<number>>(
        (accumulator, field, index) => {
            if (languageDependentFieldNames.includes(field.name)) {
                accumulator.push(index)
            }

            return accumulator
        }, [],
    )

    languageDependentFieldsIdx.forEach((index) => {
        const languageDependentField = formFields[index]

        languageDependentField.hidden = !modelLanguages.includes(languageDependentField.localeName)
    })
}

export function setLanguageDependentModelValues(model : any) : void {
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
            )
        }
    })
}


export function setCatalogsDependentModelValuesFromServerValues(
    model : any,
    formFields : Array<IPropertyFieldView>,
    catalogsFieldsMappings : Dictionary,
) : void {
    forEach(catalogsFieldsMappings, (serverFieldName : string, localFieldName : string) => {
        if (model[serverFieldName]) {
            const fieldView = formFields.find(field => field.name === localFieldName)

            Vue.set(
                model,
                localFieldName,
                // @ts-ignore
                fieldView.typeOfControl === 'staticText'
                // @ts-ignore
                    ? catalogs.getCatalogValue(fieldView.catalogName, model[serverFieldName]).nameRu
                // @ts-ignore
                    : catalogs.getCatalogValue(fieldView.catalogName, model[serverFieldName]),
            )
        }
    })
}

export function setCatalogsDependentModelValueFromLocalValue(
    model : any,
    changedField : IPropertyFieldView,
    catalogsFieldsMappings : Dictionary,
) : void {
    const mappedFieldName = catalogsFieldsMappings[changedField.name]

    model[mappedFieldName] = model[changedField.name].id
}


const localityDependentFieldNames = ['_region', '_locality']

export function setLocalityDependentModelValues(model : any) : void {
    if (model.locality) {
        const { id: regionId, name: regionName, country } = model.locality.region
        const { id: localityId, name: localityName } = model.locality

        Vue.set(model, '_country', country)
        Vue.set(model, '_region', {
            id: regionId,
            name: regionName,
        })
        Vue.set(model, '_locality', {
            id: localityId,
            name: localityName,
        })
    }
}

export function setLocalityDependentFieldVisibility(
    model : any,
    formFields : Array<IPropertyFieldView>,
) : void {
    const localityDependentFieldsIdx = formFields.reduce<Array<number>>(
        (accumulator, field, index) => {
            if (localityDependentFieldNames.includes(field.name)) {
                accumulator.push(index)
            }

            return accumulator
        }, [],
    )

    localityDependentFieldsIdx.forEach((index) => {
        const localityDependentField = formFields[index]

        localityDependentField.hidden = !model[localityDependentField.name]
    })
}
