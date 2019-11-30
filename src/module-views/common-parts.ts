import { flatten } from 'lodash-es';

import IFormView from '@x10d/vue-kit/src/types/IFormView.d';
import IModalPayload from '@x10d/vue-kit/src/types/IModalPayload.d';
import IPropertyFieldView from '@x10d/vue-kit/src/types/IPropertyFieldView.d';

import {
  CREATE_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
// @ts-ignore
} from '@/store/modules/table-section/action-types';

import { COMMON_MODAL_FORM_WIDTH } from '@/config';
import { Locale } from '@/interfaces';


// Общие обработчики элементов таблицы
export async function tableSectionCreateItemAction(
  vueComponent: any,
  model: any,
): Promise<any> {
  return vueComponent.$store.dispatch(CREATE_ITEM, model);
}

export async function tableSectionUpdateItemAction(
  vueComponent: any,
  model: any,
): Promise<any> {
  return vueComponent.$store.dispatch(UPDATE_ITEM, model);
}

export async function tableSectionDeleteItemAction(
  vueComponent: any,
  model: any,
): Promise<any> {
  return vueComponent.$store.dispatch(DELETE_ITEM, model);
}


// Вспомогательные функции
export function assembleCommonModalConfig(
  modalTitle: string,
  acceptButtonText: string,
  formView: IFormView,
): {
  payload: IModalPayload
  options: object
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
    },
    options: {
      width: COMMON_MODAL_FORM_WIDTH,
    },
  };
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
];

export const languageDependentFieldMappings : any = {
  titleRu: { id: Locale.RU, title: 'Русский' },
  titleEn: { id: Locale.EN, title: 'Английский' },
  titleEs: { id: Locale.ES, title: 'Испанский' },
  titleDe: { id: Locale.DE, title: 'Немецкий' },
};

export function setLanguageDependentFieldsVisibility(
  languages : Array<string>,
  formFields : Array<IPropertyFieldView>,
) : void {
  const languageDependentFieldNames = flatten(languageDependentFieldGroups);

  const languageDependentFieldsIdx = formFields.reduce<Array<number>>(
    (accumulator, field, index) => {
      if (languageDependentFieldNames.includes(field.name)) {
        accumulator.push(index);
      }

      return accumulator;
    }, [],
  );

  languageDependentFieldsIdx.forEach((index) => {
    const languageDependentField = formFields[index];

    languageDependentField.hidden = !languages.includes(languageDependentField.localeName);
  });
}
