import { AxiosRequestConfig, AxiosPromise,AxiosResponse } from '../types'
import xhr from './xhr'
import {buildURL} from '../helpers/url'
import {transformRequest, transformResponse} from '../helpers/data'
import { flattenHeaders, processHeaders } from '../helpers/headers'
import transform from './transform'

export default function dispatchRequest(config:AxiosRequestConfig):AxiosPromise {
  throwIfCancellationRequested(config)
  processConfig(config)

  return xhr(config).then((res) => {
    return transformResponseData(res)
  })
}

function processConfig(config:AxiosRequestConfig):void {
  config.url = transformURL(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

// 转化请求地址
function transformURL(config:AxiosRequestConfig):string {
  const {url,params} = config
  return buildURL(url!, params) // 断言不为空
}



// 转化请求headers
// function transformHeaders(config: AxiosRequestConfig):any {
//   const {headers = {}, data} = config
//   return processHeaders(headers, data)
// }

function transformResponseData(res: AxiosResponse):AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}

// 已经取消过了就不再重复取消
function throwIfCancellationRequested(config: AxiosRequestConfig):void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}
