import axios, { AxiosInstance, Method } from 'axios';
import { forEach, reject } from 'lodash-es';
import Qs from 'qs';

import { Dictionary, Locale } from '@/interfaces';


const dateFields = ['date', 'dateFrom', 'dateTo', 'createdAt'];

class Api {
  private axiosInstance: AxiosInstance

  private authToken: string | null

  private readonly locale: Locale

  constructor() {
    this.authToken = null;
    this.locale = Locale.ALL;
    this.axiosInstance = axios.create({
      // Определяется сервером в рантайме
      // @ts-ignore
      baseURL: document.apiUrl,
      headers: {
        Accept: 'application/json',
      },
      paramsSerializer: params => Qs.stringify(params, {
        encode: false,
        allowDots: true,
      }),
      transformRequest: [(model) => {
        if (model) {
          // По протоколу, при обновлении сущности, не должно быть данных о пользователе.
          delete model.user;

          // Также, удалим из модели служебные поля
          forEach(model, (value, key) => {
            if (key.charAt(0) === '_') {
              delete model[key];
            }
          });

          // Преобразуем поля, содержащие дату
          forEach(dateFields, (field) => {
            if (model[field]) model[field] /= 1000;
          });
        }

        return model;
      // @ts-ignore
      }, ...axios.defaults.transformRequest],
      // TODO перевести в конструкторы моделей
      transformResponse: [
        // @ts-ignore
        ...axios.defaults.transformResponse,
        (model) => {
          if (model && model.data) {
            // Если запрос списка сущностей, то для каждой из них преобразуем поля, содержащие дату
            if (model.meta) {
              forEach(model.data, (entity) => {
                forEach(dateFields, (field) => {
                  if (entity[field]) entity[field] *= 1000;
                });
              });
            } else {
              forEach(dateFields, (field) => {
                if (model.data[field]) model.data[field] *= 1000;
              });
            }
          }

          return model;
        },
      ],
    });

    this.axiosInstance.interceptors.request.use(
      (config) => {
        config.url = `${this.locale}/${config.url}`;

        if (this.authToken) {
          config.headers.common = {
            ...config.headers.common,
            Authorization: `Bearer ${this.authToken}`,
          };
        }

        return config;
      },
    );
  }

  private request<T>({
    url,
    method,
    data,
    params,
  } : {
    url: string,
    method: Method,
    data?: any,
    params?: any,
  }): Promise<T> {
    return this.axiosInstance.request<T>({
      url,
      method,
      data,
      params,
    }).then(response => response.data);
  }

  public setAuthToken(token: string | null) {
    this.authToken = token;
  }


  public async fetchUserInfo(): Promise<any> {
    return this.request({
      url: 'me',
      method: 'get',
    });
  }


  public async fetchCatalogs(): Promise<{ data: Dictionary<any[]>}> {
    return this.request<{ data: Dictionary<any[]>}>({
      url: 'references',
      method: 'get',
    });
  }

  public async fetchCatalogsChecksum(): Promise<string> {
    const { data } = await this.request<{ data: { checkSum: string }}>({
      url: 'references-checksum',
      method: 'get',
    });

    return data.checkSum;
  }


  public async fetchItems(endPoint: string, params?: any): Promise<any> {
    return this.request({
      url: endPoint,
      method: 'get',
      params,
    });
  }

  public async fetchItem(endPoint: string, id: number): Promise<any> {
    return this.request({
      url: `${endPoint}/${id}`,
      method: 'get',
    });
  }

  public async createItem(endPoint: string, item: any): Promise<any> {
    return this.request({
      url: endPoint,
      method: 'post',
      data: item,
    });
  }

  public async updateItem(endPoint: string, item: any): Promise<any> {
    const { id, ...restData } = item;

    return this.request({
      url: `${endPoint}/${id}`,
      method: 'put',
      data: restData,
    });
  }

  public async deleteItem(endPoint: string, item: any): Promise<any> {
    return this.request({
      url: `${endPoint}/${item.id}`,
      method: 'delete',
    });
  }

  public async fetchConflictLatestLocality(conflictId : number): Promise<any> {
    return this.request({
      url: `conflicts/${conflictId}/latest-locality`,
      method: 'get',
    })
      .catch((error) => {
        if (
          error.response
          && error.response.status
          && error.response.status === 404
        ) {
          return;
        }

        throw error;
      });
  }
}

export const api = new Api();
