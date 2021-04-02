import request from '@/utils/request'

// 修改
export function edit(data) {
  return request({
    url: '/system/config',
    method: 'put',
    data
  })
}

export default { edit }
