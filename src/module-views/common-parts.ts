// @ts-ignore
import IFormView from '@x10d/vue-kit/src/types/IFormView.d';
// @ts-ignore
import IModalPayload from '@x10d/vue-kit/src/types/IModalPayload.d';

import {
  CREATE_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
// @ts-ignore
} from '@/store/modules/table-section/action-types';

import { COMMON_MODAL_FORM_WIDTH } from '@/config';


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
  // По протоколу, при обновлении сущности, не должно быть данных о пользователе
  const { user, ...restData } = model;

  return vueComponent.$store.dispatch(UPDATE_ITEM, restData);
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
