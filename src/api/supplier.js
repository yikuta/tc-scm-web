import request, { Method } from '@/utils/request'
/**
 * @description: 查询供应商列表
 */
export const reqQuerySuppliers = data => {
  return request({
    headers: { 'Content-Type': 'application/json' },
    url: '/api/scm/web/supplier/querySuppliers',
    method: Method.POST,
    data
  })
}
/**
 * @description: 启用供应商
 */
export function supplierEnable({ id }) {
  return request({
    url: `/api/scm/web/supplier/enable/${id}`,
    method: Method.GET
  })
}
/**
 * @description: 禁用供应商
 */
export function supplierDisable({ id }) {
  return request({
    url: `/api/scm/web/supplier/disable/${id}`,
    method: Method.GET
  })
}
/**
 * @description: 供应商详情
 */
export function supplierGetInfo(id) {
  return request({
    url: `/api/scm/web/supplier/getInfo/${id}`,
    method: Method.GET
  })
}
/**
 * @description: 更新供应商认证信息
 */
export const reqUpdateLicense = data => {
  return request({
    headers: { 'Content-Type': 'application/json' },
    url: '/api/scm/web/supplier/updateLicense',
    method: Method.POST,
    data
  })
}
