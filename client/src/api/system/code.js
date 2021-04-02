import request from '@/utils/request'

export function sendEmail(data) {
  return request({
    url: '/email_code',
    method: 'post',
    data
  })
}

export function getCodeImg() {
  return request({
    url: '/captcha',
    method: 'get'
  })
}
