'use strict';

const BaseController = require('../core/baseController');
/**
 * @controller user 用户接口
 */
class UserController extends BaseController {

  /**
   * @summary 创建用户
   * @description 创建用户
   * @jwt jwt jwt
   * @router post /api/user
   * @request body createUserRequest *body
   * @response 200 createUserResponse 创建成功
   */
  async addUser() {
    const { ctx } = this;
    const clientData = ctx.request.body;
    // 校验参数
    const errorMsg = this.validateParams(ctx.rule.createUserRequest, clientData);
    if (errorMsg !== null) {
      return ctx.success({
        code: this.PAPRAMS_ERROR_CODE,
        message: errorMsg,
      });
    }
    const data = await ctx.service.userSvc.createUser(clientData);
    return ctx.success({
      code: this.okCode,
      data,
    });

  }

  /**
  * @summary 用户列表
  * @description 用户列表
  * @jwt jwt jwt
  * @router get /api/user
  * @request query string blurry 模糊筛选 用户名,邮箱，昵称
  * @request query integer size 每页数量 默认 10
  * @request query integer page 当前页 默认 0
  * @request query boolean enabled 启用状态 默认 true
  * @request query string startTime 创建时间 例：2021-03-09 00:00:00
  * @request query string endTime 创建时间 例：2021-03-09 23:59:59
  * @response 200 listUsersResponse 查询成功
  */
  async listUsers() {
    const { ctx } = this;
    const clientData = ctx.query;
    // 校验参数
    const errorMsg = this.validateParams(ctx.rule.pageListUserRequest, clientData);
    if (errorMsg !== null) {
      return ctx.success({
        code: this.PAPRAMS_ERROR_CODE,
        message: errorMsg,
      });
    }
    const data = await ctx.service.userSvc.listUsersWithRoles(clientData);
    return ctx.success({
      code: this.okCode,
      data,
    });
  }

  /**
   * @summary 更新用户信息
   * @description 更新用户信息
   * @jwt jwt jwt
   * @router put /api/user
   * @request body updateUserRequest *body
   * @response 200 updateUserResponse 成功
   */
  async updateUser() {
    const { ctx } = this;
    const clientData = ctx.request.body;
    // 校验参数
    const errorMsg = this.validateParams(ctx.rule.updateUserRequest, clientData);
    if (errorMsg !== null) {
      return ctx.success({
        code: this.PAPRAMS_ERROR_CODE,
        message: errorMsg,
      });
    }
    const data = await ctx.service.userSvc.updateUser(clientData);
    if (data.errcode === 1) {
      return ctx.success({
        code: this.STATUS_CODE.ERROR.USER.NOT_EXISTS.code,
      });
    }
    return ctx.success({
      code: this.okCode,
    });
  }

  /**
  * @summary 删除用户
  * @description 删除用户
  * @jwt jwt jwt
  * @router delete /api/user
  * @request body deleteUserRequest *body
  * @response 200 deleteUserResponse 成功
  */
  async deleteUser() {
    const { ctx } = this;
    const clientData = ctx.request.body;
    // 校验参数
    const errorMsg = this.validateParams(ctx.rule.deleteUserRequest, clientData);
    if (errorMsg !== null) {
      return ctx.success({
        code: this.PAPRAMS_ERROR_CODE,
        message: errorMsg,
      });
    }
    await ctx.service.userSvc.deleteUser(clientData);
    return ctx.success({
      code: this.okCode,
    });
  }

  /**
   * 分配小助
   */
  async assignAssistApps() {
    const { ctx } = this;
    const clientData = ctx.request.body;
    clientData.type = 'access_key_id';
    // 更新用户拓展信息
    const rst = await ctx.service.userSvc.assignAssistApps(clientData);
    if (rst) {
      return ctx.success({
        code: this.okCode,
      });
    }
    return ctx.success({
      message: '分配失败',
    });
  }
}


module.exports = UserController;
