import request, { Method } from '@/utils/request'
/**
 * @description: 代发订单列表
 */
export const reqQueryOmsOrders = data => {
  return request({
    headers: { 'Content-Type': 'application/json' },
    url: '/api/scm/web/omsOrder/queryOrders',
    method: Method.POST,
    data
  })
}
/**
 * @description: 代发订单详情
 */
export function omsOrderInfo(id) {
  return request({
    url: `/api/scm/web/omsOrder/getInfo/${id}`,
    method: Method.GET
  })
}
/**
 * @description: 获取所有物流公司
 */
export const getAllTransCompany = data => {
  return request({
    headers: { 'Content-Type': 'application/json' },
    url: '/api/scm/web/omsOrder/getAllTransCompany',
    method: Method.POST,
    data
  })
}
/**
 * @description: 快递发货
 */
export const omsOrderSend = data => {
  return request({
    headers: { 'Content-Type': 'application/json' },
    url: '/api/scm/web/omsOrder/send',
    method: Method.POST,
    data
  })
}
/**
 * @description: 获取物流信息
 */
export const getTransData = (id) => {
  return request({
    headers: { 'Content-Type': 'application/json' },
    url: `/api/scm/web/omsOrder/getTransData/${id}`,
    method: Method.POST
  })
}

/**
 * @description: 采购订单列表
 */
export const reqQueryPurchaseOrderOrders = data => {
  return request({
    headers: { 'Content-Type': 'application/json' },
    url: '/api/scm/web/purchaseOrder/queryOrders',
    method: Method.POST,
    data
  })
}
/**
 * @description: 采购订单详情
 */
export function purchaseOrderInfo(id) {
  return request({
    url: `/api/scm/web/purchaseOrder/getInfo/${id}`,
    method: Method.GET
  })
}
/**
 * @description: 采购订单发货
 */
export const purchaseOrderSend = data => {
  return request({
    headers: { 'Content-Type': 'application/json' },
    url: '/api/scm/web/purchaseOrder/send',
    method: Method.POST,
    data
  })
}
