/**
 * 工具方法
 * 根据参数params返回拼接后的url
 */
import { isDate, isObject } from './util'

// 对特殊字符串做处理,有些不需要转义
function encode(val:string):string {
  return encodeURIComponent(val)
    .replace('/%40/g', '@')
    .replace('/%3A/ig', ':')
    .replace('/$24/g', '$')
    .replace('/%2C/ig', ',')
    .replace('/%20/g', '+')
    .replace('/%5B/ig', '[')
    .replace('/%5D/ig', ']')
}

export function buildURL(url:string, params?:any):string {
  if (!params) {
    return url
  }

  const parts:string[] = []

  // 获取参数来拼接
  Object.keys(params).forEach(key => {
    const val = params[key]
    if (val === null || typeof val === 'undefined') {
      // foreach中return跳到笑一次循环
      return
    }
    let values = [];
    // 判断参数是不是数组来统一处理
    if (Array.isArray(val)) {
      values = val
      key+='[]'
    }else{
      values = [val]
    }
    // 日期或者对象
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isObject(val)) {
        val = JSON.stringify(val)
      }
    })
    parts.push(`${encode(key)}=${encode(val)}`)
  })

  let serializedParams = parts.join('&')

  if (serializedParams) {
    // 有哈希的话取哈希之前的地址
    const markIndex = url.indexOf('#')
    if(markIndex !== -1){
      url = url.slice(0,markIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}
