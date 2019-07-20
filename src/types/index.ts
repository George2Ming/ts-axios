export type Method = 'get' | 'GET'
  | 'DELETE' | 'delete'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'
  | 'POST' | 'post'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'

export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
}
