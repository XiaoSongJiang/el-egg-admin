'use strict';

module.exports = {
  createUserRequest: {
    username: { type: 'string', required: true, max: 50, min: 2, description: '用户名', example: 'test' },
    nickName: { type: 'string', required: true, max: 256, description: '昵称', example: '测试' },
    email: { type: 'string', required: true, example: '952766532@qq.com', format: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, description: '邮箱' },
    mobile: { type: 'string', required: true, example: '18801731528', format: /^1[34578]\d{9}$/, description: '电话' },
    enabled: { type: 'boolean', required: true, example: true, description: '状态' },
    roles: { type: 'array', required: false, min: 1, description: '角色', itemType: 'string', example: ['ROLEUUx4QeWokk2'] },
  },
  updateUserRequest: {
    id: { type: 'string', required: true, max: 50, min: 2, description: '用户id', example: 'USERi3sZCYcSTnG' },
    username: { type: 'string', required: true, max: 50, min: 2, description: '用户名', example: 'test' },
    nickName: { type: 'string', required: true, max: 256, description: '昵称', example: '测试' },
    email: { type: 'string', required: true, example: '952766532@qq.com', format: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, description: '邮箱' },
    mobile: { type: 'string', required: true, example: '18801731528', format: /^1[34578]\d{9}$/, description: '电话' },
    enabled: { type: 'boolean', required: true, example: true, description: '状态' },
    roles: { type: 'array', required: true, min: 1, description: '角色', itemType: 'string', example: ['ROLEUUx4QeWokk2'] },
  },
  deleteUserRequest: {
    ids: { type: 'array', required: true, min: 1, description: '用户id', itemType: 'string', example: ['USERi3sZCYcSTnG'] },
  },
  pageListUserRequest: {
    blurry: { type: 'string', required: false },
    size: { type: 'string', required: false },
    page: { type: 'string', required: false },
    enabled: { type: 'string', required: false },
    startTime: { type: 'string', required: false },
    endTime: { type: 'string', required: false },
  },
};
