'use strict';

module.exports = {
  createMenuResponse: {
    data: {
      type: 'menu',
    },
    message: { type: 'string' },
    code: { type: 'integer' },
  },

  buildMenuResponse: {
    data: {
      type: 'menuTree',
    },
    message: { type: 'string' },
    code: { type: 'integer' },
  },

  updateMenuResponse: {
    code: { type: 'integer' },
  },

  deleteMenuResponse: {
    code: { type: 'integer' },
  },
};
