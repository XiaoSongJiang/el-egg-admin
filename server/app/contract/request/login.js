'use strict';

module.exports = {
  loginRequest: {
    username: { type: 'string', required: true, max: 50, min: 2, description: '用户名', example: 'admin' },
    password: { type: 'string', required: true, description: '密码', example: 'miXXK+DurUhw47PcwC2klnNq1v2qm3UOYtWMZa7t+ioVUwNVryNStCFWmRQvFvjBAVCnu1vhdU11hgRaK7lViw==' },
    captchaCode: { type: 'string', required: true, description: '验证码', example: '1' },
    captchaKey: { type: 'string', required: true, description: '验证码id', example: 'captcha-key-n3sr69rgOy' },
  },
};
