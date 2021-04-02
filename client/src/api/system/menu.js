import request from '@/utils/request'

export function buildMenus() {
  return request({
    url: '/menu/build',
    method: 'get'
  })
}

export function getMenusTree() {
  return request({
    url: '/menu/tree',
    method: 'get'
  })
}

export function edit(data) {
  return request({
    url: '/menu',
    method: 'put',
    data
  })
}

export function add(data) {
  return request({
    url: '/menu',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: '/menu',
    method: 'delete',
    data: ids
  })
}
export default { add, edit, del, buildMenus, getMenusTree }

