'use strict';

module.exports = {
  updateSysConfigRequest: {
    id: { type: 'integer', required: true, description: 'id', example: 1 },
    remark: { type: 'string', required: false, max: 100, min: 2, description: '配置说明', example: '房估估评估总次数' },
    value: { type: 'string', required: false, max: 100, min: 2, description: '配置值', example: '2000' },
  },
};
