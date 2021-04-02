import request from '@/utils/request'

export function add(data) {
  return request({
    url: '/user',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: '/user',
    method: 'delete',
    data
  })
}

export function edit(data) {
  return request({
    url: '/user',
    method: 'put',
    data
  })
}

export default { add, edit, del }

