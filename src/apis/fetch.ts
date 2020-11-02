import axios, { AxiosResponse, AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios'

const BaseURL = 'http://mock.sherlocked93.club/mock/5f997599a934e3002d35f0e2/chat-web'

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
