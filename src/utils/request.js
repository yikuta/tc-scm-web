import axios from 'axios'
import qs from 'qs'
import router from '@/router/index'
import store from '../store'
import { Message } from 'element-ui'
import { filterEmptyParams } from '@/utils/util'

let noErrorToast = false

const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 5000,
  method: 'get,post,put,patch,delete',
  paramsSerializer: params => qs.stringify(filterEmptyParams(params), {
    arrayFormat: 'indices' // brackets | repeat
  }),
  headers: { 'Content-Type': 'application/json' }
})

// 请求拦截器
service.interceptors.request.use(config => {
  // 过滤空数据
  config.data = filterEmptyParams(config.data)
  console.log('config====>', config) // eslint-disable-line
  // 不展示提示
  noErrorToast = config.noErrorToast
  if (localStorage.getItem('token')) {
    config.headers.Authorization = localStorage.getItem('token')
  }
  return config
}, error => {
  Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 401) {
      store.dispatch('logout', '登录凭证失效')
    } else if (res.code === 403) {
      router.push('/dashboard')
    } else if (res.code !== 200 && !noErrorToast) {
      Message({
        message: res.message,
        type: 'error',
        duration: 3 * 1000
      })
    }
    return response.data
  }, error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export const Method = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete'
}

export default service
