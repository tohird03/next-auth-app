import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {INetworkConfig, TMethod} from '../types/instance';

export class Instance {
  protected readonly instance: AxiosInstance;
  protected baseURL = 'https://jsonplaceholder.typicode.com';
  protected failedRequestsQueue: {
    method: TMethod;
    url: string;
    params?: any;
    config?: AxiosRequestConfig;
    base: string;
  } | null = null;

  public constructor({baseURL, headers, timeout = 65000}: INetworkConfig) {
    this.instance = axios.create({
      baseURL,
      timeout,
      headers,
    });
    // @ts-ignore
    this.instance.interceptors.request.use(this.handleRequest);
    this.instance.interceptors.response.use(this.handleResponse, this.handleResponseError);
  }

  handleResponse = <T>(response: AxiosResponse<T>) => response;

  private handleResponseError = (error: AxiosError) => {
    throw error;
  };

  private handleRequest = async ({headers, ...restConfig}: AxiosRequestConfig) => {
    return {
      headers,
      ...restConfig,
    };
  };

  public async get(url: string, params?: any) {
    const {data} = await this.instance.get(`${this.baseURL}${url}`, {...params});

    return data;
  }

  public async post(url: string, params?: any, config?: AxiosRequestConfig) {
    return this.instance.post(url, params, {...config, baseURL: `${this.baseURL}`});
  }

  public async delete(url: string, config?: AxiosRequestConfig) {
    return this.instance.delete(url, {...config, baseURL: `${this.baseURL}`});
  }

  public async patch(url: string, params?: any, config?: AxiosRequestConfig) {
    return this.instance.patch(url, params, {...config, baseURL: `${this.baseURL}`});
  }
}
