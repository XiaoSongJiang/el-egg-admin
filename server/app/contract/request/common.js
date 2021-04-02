'use strict';

module.exports = {
  sendEmailRequest: {
    email: { type: 'string', required: true, example: '952766532@qq.com', format: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, description: '邮箱' },
  },
};
