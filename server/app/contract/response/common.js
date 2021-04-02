'use strict';

module.exports = {
  generateCodeResponse: {
    data: {
      type: 'captcha',
    },
    message: { type: 'string' },
    code: { type: 'integer' },
  },
  sendEmailResponse: {
    code: { type: 'integer' },
  },
};
