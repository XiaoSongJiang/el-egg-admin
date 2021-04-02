'use strict';

module.exports = app => {
  // 管理员
  app.router.post('/api/user', 'user.addUser');
  app.router.get('/api/user', 'user.listUsers');
  app.router.put('/api/user', 'user.updateUser');
  app.router.delete('/api/user', 'user.deleteUser');

  // 分配小助
  app.router.put('/api/user/assign_assit', 'user.assignAssistApps');
};
