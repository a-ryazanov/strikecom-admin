import axios, { AxiosInstance, Method } from 'axios';
import Qs from 'qs';

import { BASE_API_URL } from '@/config';

import { Dictionary, Locale } from '@/interfaces';


// // Пользователь
// export async function fetchUserInfo() {
//   return axiosInstance.request<Dictionary<string>>({
//     method: 'GET',
//     url: 'user',
//   }).then(response => response.data);
// }
//
// // Общие функции
// export async function fetchItems<T>(
//   endPoint: string,
//   params: any = {},
// ): Promise<ServerResponse<T>> {
//   return axiosInstance.request<ServerResponse<T>>({
//     method: 'GET',
//     url: `${endPoint}`,
//     params,
//   }).then(response => response.data);
// }
//
// export async function fetchItem<T>(
//   endPoint: string,
//   params: any = {},
// ) {
//   const { id, ...restParams } = params;
//
//   return axiosInstance.request<ServerResponse<T>>({
//     method: 'GET',
//     url: `${endPoint}/${id}`,
//     params: restParams,
//   }).then(response => response.data);
// }
//
// export async function createItem<T>(
//   endPoint: string,
//   data: Dictionary<any>,
//   params: any = {},
// ) {
//   return axiosInstance.request<ServerResponse<T>>({
//     method: 'POST',
//     url: endPoint,
//     data,
//     params,
//   }).then(response => response.data);
// }
//
// export async function deleteItem<T>(
//   endPoint: string,
//   params: any = {},
// ) {
//   return axiosInstance.request<ServerResponse<T>>({
//     method: 'DELETE',
//     url: endPoint,
//     params,
//   }).then(response => response.data);
// }

class Api {
  private axiosInstance: AxiosInstance

  private authToken: string | null

  private readonly locale: Locale

  constructor() {
    this.authToken = null;
    this.locale = Locale.ALL;
    this.axiosInstance = axios.create({
      baseURL: BASE_API_URL,

      paramsSerializer: params => Qs.stringify(params, {
        encode: false,
      }),
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

  private request<T>(url: string, method: Method): Promise<T> {
    return this.axiosInstance.request<T>({
      url,
      method,
    }).then(response => response.data);
  }

  public setAuthToken(token: string | null) {
    this.authToken = token;
  }

  public async fetchCatalogs(): Promise<{ data: Dictionary<any[]>}> {
    return this.request<{ data: Dictionary<any[]>}>(
      'references',
      'get',
    );
  }

  public async fetchCatalogsChecksum(): Promise<string> {
    const { data } = await this.request<{ data: { checkSum: string }}>(
      'references-checksum',
      'get',
    );

    return data.checkSum;
  }
}

export const api = new Api();
