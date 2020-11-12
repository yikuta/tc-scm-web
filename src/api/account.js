import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: '/api/scm/web/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: data
  })
}
