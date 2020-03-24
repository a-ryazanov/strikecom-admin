import Vue from 'vue'
import {
    flatten,
    forEach,
    map,
    some,
} from 'lodash-es'

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


const videoTypesMappings : Dictionary = {
    other: 'Другое',
    vk_link: 'Вконтакте',
    youtube_link: 'Youtube',
}

export const addVideoFormView : IFormView = {
    fields: [
        {
            name: 'url',
            title: 'URL',
            typeOfControl: 'string',
            labelPosition: 'top',
            validator: 'required',
        },
        {
            name: '_videoType',
            title: 'Тип видео',
            typeOfControl: 'multiselect',
            labelPosition: 'top',
            validator: 'required',
            specificControlProps: {
                incomingOptions: catalogs.getCatalog('videoTypes'),
                formatFieldTitle: (value : any) => videoTypesMappings[value.code],
            },
        },
        {
            name: 'previewUrl',
            title: 'Превью',
            tooltip: 'URL изображения, отображающегося в предпросмотре видео',
            typeOfControl: 'string',
            labelPosition: 'top',
        },
    ],
    handlers: {
        open: () => {},
        input: (model, formFields, changedField) => {
            if (changedField.name === '_videoType') {
                model.videoTypeId = model._videoType.id
            }
        },
    },
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


export const languageDependentFieldMappings : Dictionary<any> = {
    [Locale.RU]: {
        id: Locale.RU,
        title: 'Русский',
        dependentModelFields: ['titleRu', 'contentRu'],
    },
    [Locale.EN]: {
        id: Locale.EN,
        title: 'Английский',
        dependentModelFields: ['titleEn', 'contentEn'],
    },
    [Locale.ES]: {
        id: Locale.ES,
        title: 'Испанский',
        dependentModelFields: ['titleEs', 'contentEs'],
    },
    [Locale.DE]: {
        id: Locale.DE,
        title: 'Немецкий',
        dependentModelFields: ['titleDe', 'contentDe'],
    },
}

export function setLanguageDependentFieldsVisibility(
    model : any,
    formFields : Array<IPropertyFieldView>,
) : void {
    const modelLanguages = map(model._languages, 'id')
    const languageDependentFieldNames =
        flatten(map(languageDependentFieldMappings, 'dependentModelFields'))

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

export function setLanguageDependentModelValuesFromServerValues(model : any) : void {
    forEach(languageDependentFieldMappings, (value, key) => {
        const areModelContainLanguageFields =
            some(value.dependentModelFields, field => !!model[field])

        if (areModelContainLanguageFields) {
            Vue.set(
                model,
                '_languages',
                model._languages
                    ? [
                        ...model._languages,
                        languageDependentFieldMappings[key],
                    ]
                    : [ languageDependentFieldMappings[key] ],
            )
        }
    })
}

export function setLanguageDependentModelValuesFromLocalValue(model : any) : void {
    const modelLanguages = map(model._languages, 'id')

    forEach(languageDependentFieldMappings, (value) => {
        if (!modelLanguages.includes(value.id)) {
            forEach(value.dependentModelFields, (field) => {
                model[field] = null
            })
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

    model[mappedFieldName] = model[changedField.name] ? model[changedField.name].id : null
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


export function extendVideosValues(model : any) : void {
    forEach(model.videos, (video) => {
        Vue.set(
            video,
            '_videoType',
            catalogs.getCatalogValue('videoTypes', video.videoTypeId),
        )
    })
}
