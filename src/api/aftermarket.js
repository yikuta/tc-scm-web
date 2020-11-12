import request, { Method } from '@/utils/request'
/**
 * @description: 代发订单列表
 */
export const reqAfterSaleOrderList = (type, data) => {
  return request({
    headers: { 'Content-Type': 'application/json' },
    url: '/api/scm/web/afterSaleOrder/queryOrders/' + type,
    method: Method.POST,
    data
  })
}
/**
 * @description: 代发订单详情
 */
export function omsAfterSaleOrderInfo(id) {
  return request({
    url: `/api/scm/web/afterSaleOrder/getInfo/${id}`,
    method: Method.GET
  })
}
/**
 * @description: 售后订单发货
 */
export const afterSaleOrderSend = (data) => {
  return request({
    headers: { 'Content-Type': 'application/json' },
    url: '/api/scm/web/afterSaleOrder/send',
    method: Method.POST,
    data
  })
}
/**
 * @description: 售后订单快递信息
 */
export const getTransData = (data) => {
  return request({
    headers: { 'Content-Type': 'application/json' },
    url: '/api/scm/web/afterSaleOrder/getTransData/' + data,
    method: Method.POST
  })
}
/**
 * @description: 售后审核
 */
export const auditAfterSale = (data) => {
  return request({
    headers: { 'Content-Type': 'application/json' },
    url: '/api/scm/web/afterSaleOrder/auditAfterSale',
    method: Method.POST,
    data
  })
}
