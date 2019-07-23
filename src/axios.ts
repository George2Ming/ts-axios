import { AxiosInstance } from './types'
import Axios from './core/Axios'
import {extend} from './helpers/util'

function createInstance():AxiosInstance {
  const context = new Axios()
  // 绑定当前环境
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosInstance
}

const axios = createInstance()


export default axios
