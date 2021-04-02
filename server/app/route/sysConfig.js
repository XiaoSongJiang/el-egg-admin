'use strict';

module.exports = app => {
  // 配置列表
  app.router.get('/api/system/config', 'sysConfig.getSysConfigs');

  app.router.put('/api/system/config', 'sysConfig.updateSysConfig');
};
