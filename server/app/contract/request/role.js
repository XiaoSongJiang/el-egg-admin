'use strict';

module.exports = {
  createRoleRequest: {
    name: { type: 'string', required: true, max: 50, min: 2, description: '角色名称', example: '普通管理员' },
    level: { type: 'integer', required: false, max: 256, description: '级别', example: 1 },
    description: { type: 'string', required: false, example: '普通管理员', description: '普通管理员' },
  },

  updateRoleRequest: {
    id: { type: 'string', required: true, max: 50, min: 2, description: '角色id', example: 'ROLEUUx4QeWokk2' },
    name: { type: 'string', required: true, max: 50, min: 2, description: '角色名称', example: '普通管理员' },
    level: { type: 'integer', required: false, max: 256, description: '级别', example: 1 },
    description: { type: 'string', required: false, example: '普通管理员', description: '普通管理员' },
  },
  deleteRoleRequest: {
    ids: { type: 'array', required: true, min: 1, description: '角色id', itemType: 'string', example: ['ROLEUUx4QeWokk2'] },
  },

  pageListRoleRequest: {
    blurry: { type: 'string', required: false },
    page: { type: 'string', required: false },
    size: { type: 'string', required: false },
    startTime: { type: 'string', required: false },
    endTime: { type: 'string', required: false },
  },
};
