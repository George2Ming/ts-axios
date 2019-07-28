import { AxiosTransformer } from '../types'

export default function transform(data:any, headers:any,
                                  fns?:AxiosTransformer|AxiosTransformer[]):any {
  if (!fns) {
    return data
  }
  // 转化为数组方便后续遍历
  if (!Array.isArray(fns)) {
    fns = [fns]
  }

  fns.forEach(fn => {
    data = fn(data, headers)
  })

  return data
}
