import axios, { AxiosInstance, Method } from 'axios';
import Qs from 'qs';

import { BASE_API_URL } from '@/config';

import { Dictionary, Locale } from '@/interfaces';


class Api {
  private axiosInstance: AxiosInstance

  private authToken: string | null

  private readonly locale: Locale

  constructor() {
    this.authToken = null;
    this.locale = Locale.ALL;
    this.axiosInstance = axios.create({
      baseURL: BASE_API_URL,
      headers: {
        Accept: 'application/json',
      },

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
}

export const api = new Api();
