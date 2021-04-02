'use strict';

const BaseController = require('../core/baseController');
/**
 * @controller sysConfig
 */
class SysConfigController extends BaseController {

  /**
   * @summary 修改系统配置
   * @description 修改系统配置
   * @jwt jwt jwt
   * @router put /api/system/config
   * @request body updateSysConfigRequest *body
   * @response 200 updateSysConfigResponse 成功
   */
  async updateSysConfig() {
    const { ctx } = this;
    const body = ctx.request.body;
    // 校验参数
    const errorMsg = this.validateParams(ctx.rule.updateSysConfigRequest, body);
    if (errorMsg !== null) {
      return ctx.success({
        code: this.PAPRAMS_ERROR_CODE,
        message: errorMsg,
      });
    }
    await ctx.service.sysConfigSvc.updateSysConfig(body);
    return ctx.success({
      code: this.okCode,
    });
  }

  /**
  * @summary 获取所有系统配置
  * @description 获取所有系统配置
  * @jwt jwt jwt
  * @router get /api/system/config
  * @request query string blurry 模糊筛选 配置字段,配置说明
  * @response 200 listSysConfigResponse 查询成功
  */
  async getSysConfigs() {
    const { ctx } = this;
    const query = ctx.query;
    const data = await ctx.service.sysConfigSvc.getSysConfigs(query);
    return ctx.success({
      code: this.okCode,
      data,
    });
  }
}

module.exports = SysConfigController;
