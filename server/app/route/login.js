'use strict';

module.exports = app => {
  app.router.post('/api/auth/login', 'login.loginCheck');
  // 登录人个人信息
  app.router.get('/api/auth/info', 'login.getUser');
  // 修改个人信息
  app.router.put('/api/auth/edit', 'login.editUser');
};
