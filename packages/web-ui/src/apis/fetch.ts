import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios'
import { CustomAxiosInstance } from 'typings/shims'
import { BaseURL } from 'constants/server'
import { message as Message } from 'antd'
import { createHashHistory } from 'history'

const history = createHashHistory()

const service: CustomAxiosInstance = axios.create({
  baseURL: BaseURL,
  timeout: 5000,
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
  }
)

// respone拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, data, message } = response.data as apiResponse
    const config = response.config

    if (![0].includes(code)) {
      // code为非0是抛错
      Message.error('Error in fetch.js respone interceptors:  ' + message)
      if (code === 40001) {
        // token失效等需要重新登录的情况
        history.push('/login')
      }
      return Promise.reject(new Error(message))
    }
    return data
  },
  (error: AxiosError) => {
    error.message = '网络通讯异常，请检查！'
    return Promise.reject(error)
  }
)

export default service.request
