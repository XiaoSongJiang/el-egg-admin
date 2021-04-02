'use strict';

module.exports = {
  createMenuRequest: {
    title: { type: 'string', required: true, max: 50, min: 2, description: '菜单名称', example: '用户管理' },
    parentId: { type: 'string', required: true, description: '父级菜单id', example: '0' },
    icon: { type: 'string', required: false, max: 50, description: '图标', example: '测试' },
    menuType: { type: 'integer', required: true, example: 0, description: '菜单类型' },
    sort: { type: 'integer', required: false, example: 99, description: '排序' },
    path: { type: 'string', required: false, description: '地址', example: 'user' },
    operateType: { type: 'string', required: false, description: '操作类型', example: 'GET' },
    hidden: { type: 'boolean', required: false, example: false, description: '菜单是否隐藏' },
    permission: { type: 'string', required: false, description: 'api地址', example: '/api/user' },
    name: { type: 'string', required: false, description: '组件名', example: 'User' },
    component: { type: 'string', required: false, description: '组件地址', example: 'system/user/index' },
  },
  updateMenuRequest: {
    id: { type: 'string', required: true, max: 50, min: 2, description: '菜单id', example: 'ROLEi3sZCYcSTnG' },
    title: { type: 'string', required: true, max: 50, min: 2, description: '菜单名称', example: '用户管理' },
    parentId: { type: 'string', required: true, description: '父级菜单id', example: '0' },
    icon: { type: 'string', required: false, max: 50, description: '图标', example: '测试' },
    menuType: { type: 'integer', required: true, example: 0, description: '菜单类型' },
    sort: { type: 'integer', required: false, example: 99, description: '排序' },
    path: { type: 'string', required: false, description: '地址', example: 'user' },
    operateType: { type: 'string', required: false, description: '操作类型', example: 'GET' },
    hidden: { type: 'boolean', required: false, example: false, description: '菜单是否隐藏' },
    permission: { type: 'string', required: false, description: 'api地址', example: '/api/user' },
    name: { type: 'string', required: false, description: '组件名', example: 'User' },
    component: { type: 'string', required: false, description: '组件地址', example: 'system/user/index' },
  },
  deleteMenuRequest: {
    ids: { type: 'array', required: true, min: 1, description: '菜单id', itemType: 'string', example: ['MENUUUx4QeWokk2'] },
  },
};
