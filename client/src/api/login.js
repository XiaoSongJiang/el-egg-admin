import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/auth/info',
    method: 'get'
  })
}

export function editUser(data) {
  return request({
    url: '/auth/edit',
    method: 'put',
    data
  })
}
