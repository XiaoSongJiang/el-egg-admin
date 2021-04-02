'use strict';

module.exports = {
  listSysConfigResponse: {
    data: {
      type: 'array',
      itemType: 'sysConfig',
    },
    message: { type: 'string' },
    code: { type: 'integer' },
  },
  updateSysConfigResponse: {
    code: { type: 'integer' },
  },
};
