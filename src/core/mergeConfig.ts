/**
 * 自定义和默认配置的合并
 */

import {AxiosRequestConfig} from '../types'
import { isPlainObject, deepMerge } from '../helpers/util'

const strats = Object.create(null)

// 用户配置覆盖默认配置
function defaultStrat(val1:any, val2:any):any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

// 只取用户配置
function fromVal2Strat(val1:any, val2:any) {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

// 深度合并策略
function deepMergeStrat(val1: any, val2: any):any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  }  else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}

const straKeysFromVal2 = ['url', 'params', 'data']

straKeysFromVal2.forEach(key => {
  strats[key] = fromVal2Strat
})

const stratKeysDeepMerge = ['headers', 'auth']

stratKeysDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat
})

export default function mergeConfig(config1:AxiosRequestConfig, config2?:AxiosRequestConfig) {
  if (!config2) {
    config2 = {}
  }

  const config = Object.create(null)

  for(let key in config2) {
    mergeField(key)
  }

  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string):void {
    const strat = strats[key] || defaultStrat
    config[key] = strat(config1[key], config2![key])
  }

  return config
}
