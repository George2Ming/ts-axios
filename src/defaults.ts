import {AxiosRequestConfig} from './types'
import {processHeaders} from './helpers/headers'
import {transformRequest, transformResponse} from './helpers/data'

const defaults:AxiosRequestConfig = {
  method: 'get',

  timeout: 0,

  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },

  xsrfCookieName: 'XSRF-TOKEN',

  xsrfHeaderName: 'X-XSRF-TOKEN',

  transformRequest: [
    function(data:any, headers:any):any {
      processHeaders(headers,data)
      return transformRequest(data)
    }
  ],
  transformResponse: [
    function(data:any):any {
      return transformResponse(data)
    }
  ]
}

const methodsNoData = ['delete', 'get', 'head', 'options']

// 这几类请求头部无需添加
methodsNoData.forEach(method => {
  defaults.headers[method] = {}
})

const methodsWithData = ['post', 'put', 'patch']

methodsWithData.forEach(method => {
  defaults.headers[method] = {
    'content-type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
