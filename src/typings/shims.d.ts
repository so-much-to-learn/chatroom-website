import { AxiosInterceptorManager, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios'

declare interface CustomAxiosInstance {
    interceptors: {
        request: AxiosInterceptorManager<AxiosRequestConfig>;
        response: AxiosInterceptorManager<AxiosResponse>;
    }

    get: <T = any>(url: string, config?: AxiosRequestConfig) => Promise<T>;

    post: <T = any>(url: string, config?: AxiosRequestConfig) => Promise<T>;

    <T = any>(config: AxiosRequestConfig): Promise<T>;
}
