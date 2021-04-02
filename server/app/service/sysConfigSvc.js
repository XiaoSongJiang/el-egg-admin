'use strict';

const { Op } = require('sequelize');
const BaseServiceService = require('../core/baseService');

class SysConfigService extends BaseServiceService {
  constructor(ctx) {
    super(ctx);
    this.model = this.ctx.model.SystemConfig;
  }
  /**
   * 获取系统配置列表
   * @param {*} params
   */
  async getSysConfigs(params) {

    const { blurry } = params;

    const where = {};
    // 模糊搜索
    if (blurry) {
      where[Op.or] = [
        {
          name: {
            [Op.regexp]: blurry,
          },
        },
        {
          remark: {
            [Op.regexp]: blurry,
          },
        },
      ];
    }
    return await this.getDataList(where);
  }

  async updateSysConfig(params) {
    const { id, remark, value } = params
    const data = {
      remark,
      value,
    }
    await this.model.update(data, {
      where: {
        id,
      },
      individualHooks: true,
    });
    return true;
  }
}
module.exports = SysConfigService;
