import { AxiosRequestConfig, AxiosResponse } from '../types'

export class AxiosError extends Error{
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?:string|null
  request?:any
  response?:AxiosResponse

  constructor(
    message:string,
    config:AxiosRequestConfig,
    code?:string|null,
    request?:any,
    response?:AxiosResponse
  ) {
    super(message)

    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isAxiosError = true

    // 修复typescript继承内置对象无法调方法的坑
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

export function createError(
  message:string,
  config:AxiosRequestConfig,
  code?:string|null,
  request?:any,
  response?:AxiosResponse
):AxiosError {
  const error = new AxiosError(message, config, code, request, response)
  return error
}
