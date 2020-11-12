import request, { Method } from '@/utils/request'
/**
 * @description: 查询商品列表
 */
export const reqQueryCommodity = data => {
  return request({
    headers: { 'Content-Type': 'application/json' },
    url: '/api/scm/web/goods/queryGoodsList',
    method: Method.POST,
    data
  })
}
/**
 * @description: 启用商品
 */
export function commodityEnable({ id }) {
  return request({
    url: `/api/scm/web/goods/enable/${id}`,
    method: Method.GET
  })
}
/**
 * @description: 禁用商品
 */
export function commodityDisable({ id }) {
  return request({
    url: `/api/scm/web/goods/disable/${id}`,
    method: Method.GET
  })
}
/**
 * @description: 商品详情
 */
export function commodityGetInfo(id) {
  return request({
    url: `/api/scm/web/goods/getInfo/${id}`,
    method: Method.GET
  })
}
