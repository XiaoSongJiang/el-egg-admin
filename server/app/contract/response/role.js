'use strict';

module.exports = {
  getAllRoleResponse: {
    data: {
      type: 'array',
      itemType: 'role',
    },
    message: { type: 'string' },
    code: { type: 'integer' },
  },
  updateRoleResponse: {
    code: { type: 'integer' },
  },
  createRoleResponse: {
    data: {
      type: 'array',
      itemType: 'role',
    },
    message: { type: 'string' },
    code: { type: 'integer' },
  },
  deleteRoleResponse: {
    code: { type: 'integer' },
  },

  listRolesResponse: {
    data: {
      type: 'roleList',
    },
    message: { type: 'string' },
    code: { type: 'integer' },
  },
}
