import request from '@/utils/request'

// 查询用户列表
export function fetchUsers(data) {
  return request({
    url: '/api/scm/web/user/queryUsers',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: data
  })
}

// 删除用户
export function deleteUser(data) {
  return request({
    url: '/api/scm/web/user/delete/' + data.id,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
}
// 添加用户
export function addUser(data) {
  return request({
    url: '/api/scm/web/user/save',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: data
  })
}

// 编辑用户
export function updateUser(data) {
  return request({
    url: '/api/scm/web/user/update',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: data
  })
}
