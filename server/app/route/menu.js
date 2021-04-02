'use strict';

module.exports = app => {
  app.router.post('/api/menu', 'menu.addMenu'); // 新增菜单
  app.router.get('/api/menu/build', 'menu.menuBuild'); // 左侧菜单树状结构
  app.router.get('/api/menu/tree', 'menu.menuTree'); // 菜单树状结构

  app.router.get('/api/menu', 'menu.getMenuTree'); // 菜单树状结构

  app.router.put('/api/menu', 'menu.updateMenu'); // 修改
  app.router.delete('/api/menu', 'menu.deleteMenu'); // 删除
};
