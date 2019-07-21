import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import {parseHeaders} from './helpers/headers'
import {createError} from './helpers/error'

export default function xhr(config:AxiosRequestConfig):AxiosPromise {
  return new Promise((resolve, reject) => {
    const {data=null, url, method='get', headers, responseType, timeout} = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    if (timeout) {
      request.timeout = timeout
    }

    request.open(method.toUpperCase(),url,true)

    request.onreadystatechange = function handleLood() {
      if ( request.readyState !== 4 ) {
        return
      }

      // 网络或超时错误
      if ( request.status === 0 ) {
        return
      }

      // 过滤返回头
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status:request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }

      handleResponse(response)
    }

    // 处理错误
    request.onerror = function handleError() {
      reject(createError('Network Error', config, null, request))
    }

    // 处理超时
    request.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
    }

    // 设置请求headers
    Object.keys(headers).forEach(name => {
      // data为空时不用设置header
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.send(data)

    // 处理状态码
    function handleResponse(response: AxiosResponse):void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(createError(`Request failed with status code ${response.status}`,
          config,
          null,
          request, response))
      }
    }
  })
}
