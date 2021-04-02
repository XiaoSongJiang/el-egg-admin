'use strict';

module.exports = {
  createUserResponse: {
    data: {
      type: 'user',
    },
    message: { type: 'string' },
    code: { type: 'integer' },
  },
  updateUserResponse: {
    code: { type: 'integer' },
  },
  deleteUserResponse: {
    code: { type: 'integer' },
  },
  listUsersResponse: {
    data: {
      type: 'userList',
    },
    message: { type: 'string' },
    code: { type: 'integer' },
  },
  singleUserResponse: {
    data: {
      type: 'user',
    },
    message: { type: 'string' },
    code: { type: 'integer' },
  },
};
