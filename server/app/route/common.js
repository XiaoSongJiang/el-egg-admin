'use strict';
module.exports = app => {
  app.router.get('/api/captcha', 'common.getCaptcha');
  app.router.post('/api/email_code', 'common.sendEmailCode');
};
