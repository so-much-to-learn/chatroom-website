import axios, { AxiosResponse, AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios'
import { BaseURL } from 'constants/server'

const service: AxiosInstance = axios.create({
    baseURL: BaseURL,
    // paramsSerializer: params => qs.stringify(params, {arrayFormat: 'brackets'}),
    timeout: 5000
})

// request拦截器
service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // config 处理
        return config
    },
    (error: AxiosError) => {
        console.error('Error in fetch.ts:  ', error)
        return Promise.reject(error)
    })

// respone拦截器
service.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data
    },
    (error: AxiosError) => {
        error.message = '网络通讯异常，请检查！'
        return Promise.reject(error)
    }
)

export default service
