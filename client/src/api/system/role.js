import request from '@/utils/request'

// 获取所有的Role
export function getAll() {
  return request({
    url: '/role/all',
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: '/role',
    method: 'post',
    data
  })
}

export function get(id) {
  return request({
    url: '/role/' + id,
    method: 'get'
  })
}

export function getLevel() {
  return request({
    url: '/role/level',
    method: 'get'
  })
}

export function del(ids) {
  return request({
    url: '/role',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: '/role',
    method: 'put',
    data
  })
}

export function editMenu(data) {
  return request({
    url: '/role/menu',
    method: 'put',
    data
  })
}

export default { add, edit, del, get, editMenu, getLevel }
