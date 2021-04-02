'use strict';

module.exports = app => {
  app.router.get('/api/role/all', 'role.getAllRole');
  app.router.get('/api/role', 'role.getRoleList');
  app.router.put('/api/role', 'role.updateRole');
  app.router.post('/api/role', 'role.addRole');
  app.router.delete('/api/role', 'role.deleteRole');

  app.router.get('/api/role/:id', 'role.getRoleById');

  // 设置角色菜单
  app.router.put('/api/role/menu', 'role.setRoleMenu');

};
