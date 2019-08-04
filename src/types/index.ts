
export type Method = 'get' | 'GET'
  | 'DELETE' | 'delete'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'
  | 'POST' | 'post'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'

export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number // 超时时间
  transformRequest?:AxiosTransformer|AxiosTransformer[] // 请求配置
  transformResponse?:AxiosTransformer|AxiosTransformer[] // 响应配置
  cancelToken?:CancelToken // 请求取消的token
  withCredentials?:boolean // 跨域请求携带cookie

  [propName:string]:any
}

export interface AxiosResponse<T=any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise<T=any> extends Promise<AxiosResponse<T>>{}

export interface AxiosError extends Error{
  isAxiosError:boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
}

export interface Axios {
  defaults: AxiosRequestConfig
  // 拦截器定义
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }

  request<T=any>(config: AxiosRequestConfig): AxiosPromise<T>

  get<T=any>(url:string,config?:AxiosRequestConfig): AxiosPromise<T>

  delete<T=any>(url:string,config?:AxiosRequestConfig): AxiosPromise<T>

  head<T=any>(url:string,config?:AxiosRequestConfig): AxiosPromise<T>

  options<T=any>(url:string,config?:AxiosRequestConfig): AxiosPromise<T>

  post<T=any>(url:string, data?:any, config?:AxiosRequestConfig): AxiosPromise<T>

  put<T=any>(url:string, data?:any, config?:AxiosRequestConfig): AxiosPromise<T>

  patch<T=any>(url:string, data?:any, config?:AxiosRequestConfig): AxiosPromise<T>
}

// axios实例类型
export interface AxiosInstance extends Axios{
  // 直接传一个对象
  <T=any>(config:AxiosRequestConfig): AxiosPromise<T>
  // 第一个参数穿地址,后续config可选
  <T=any>(url:string, config?:AxiosRequestConfig): AxiosPromise<T>
}

// 静态方法,生成多个实例
export interface AxiosStatic extends AxiosInstance{
  create(config?: AxiosRequestConfig): AxiosInstance

  CancelToken:CancelTokenStatic
  Cancel:CancelStatic
  isCancel:(value:any) => boolean
}

// 拦截器
export interface AxiosInterceptorManager<T> {
  // 使用拦截器
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number
  // 删除拦截器
  eject(id: number): void
}

export interface ResolvedFn<T> {
  (val:T):T|Promise<T>
}

export interface RejectedFn {
  (error: any): any
}


export interface AxiosTransformer {
  (data:any,header?:any):any
}

// 取消token
export interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  throwIfRequested(): void
}

// 取消方法
export interface Canceler {
  (message?:string):void
}

// 传给cancelToken的参数
export interface CancelExecutor {
  (cancel:Canceler): void
}

// canceltoken通过source方法返回
export interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}

// cancelToken类类型
export interface CancelTokenStatic {
  new(executor: CancelExecutor): CancelToken

  source(): CancelTokenSource
}


export interface Cancel {
  message?: string
}

export interface CancelStatic {
  new(message?:string):Cancel
}
