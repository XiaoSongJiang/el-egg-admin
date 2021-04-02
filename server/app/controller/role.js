'use strict';

const BaseController = require('../core/baseController');
/**
 * @controller role 角色
 */
class RoleController extends BaseController {

  /**
  * @summary 获取用户角色列表
  * @description 获取用户角色列表
  * @jwt jwt jwt
  * @router get /api/role/all
  * @response 200 singleUserResponse 查询成功
  */
  async getAllRole() {
    const { ctx } = this;
    const res = await ctx.service.roleSvc.getAllRole();
    return ctx.success({
      code: this.okCode,
      data: res,
    });
  }
  /**
  * @summary 角色列表分页
  * @description 角色列表分页
  * @jwt jwt jwt
  * @router get /api/role
  * @request query string blurry 模糊筛选 角色名,角色描述
  * @request query integer size 每页数量 默认 10
  * @request query integer page 当前页 默认 0
  * @request query string startTime 创建时间 例：2021-03-09 00:00:00
  * @request query string endTime 创建时间 例：2021-03-09 23:59:59
  * @response 200 listRolesResponse 查询成功
  */
  async getRoleList() {
    const { ctx } = this;
    const clientData = ctx.query;
    // 校验参数
    const errorMsg = this.validateParams(ctx.rule.pageListRoleRequest, clientData);
    if (errorMsg !== null) {
      return ctx.success({
        code: this.PAPRAMS_ERROR_CODE,
        message: errorMsg,
      });
    }
    const data = await ctx.service.roleSvc.listPageRoles(clientData);
    return ctx.success({
      code: this.okCode,
      data,
    });
  }

  /**
   * @summary 修改角色
   * @description 修改角色
   * @jwt jwt jwt
   * @router put /api/role
   * @request body updateRoleRequest *body
   * @response 200 updateRoleResponse 成功
   */
  async updateRole() {
    const { ctx } = this;
    const clientData = ctx.request.body;
    // 校验参数
    const errorMsg = this.validateParams(ctx.rule.updateRoleRequest, clientData);
    if (errorMsg !== null) {
      return ctx.success({
        code: this.PAPRAMS_ERROR_CODE,
        message: errorMsg,
      });
    }
    await ctx.service.roleSvc.updateRole(clientData);
    return ctx.success({
      code: this.okCode,
    });
  }

  /**
   * @summary 创建角色
   * @description 创建角色
   * @jwt jwt jwt
   * @router post /api/role
   * @request body createRoleRequest *body
   * @response 200 createRoleResponse 创建成功
   */
  async addRole() {
    const { ctx } = this;
    const clientData = ctx.request.body;
    // 校验参数
    const errorMsg = this.validateParams(ctx.rule.createRoleRequest, clientData);
    if (errorMsg !== null) {
      return ctx.success({
        code: this.PAPRAMS_ERROR_CODE,
        message: errorMsg,
      });
    }
    const data = await ctx.service.roleSvc.createRole(clientData);
    return ctx.success({
      code: this.okCode,
      data,
    });

  }

  /**
  * @summary 删除角色
  * @description 删除角色
  * @jwt jwt jwt
  * @router delete /api/role
  * @request body deleteRoleRequest *body
  * @response 200 deleteRoleResponse 成功
  */
  async deleteRole() {
    const { ctx } = this;
    const clientData = ctx.request.body;
    // 校验参数
    const errorMsg = this.validateParams(ctx.rule.deleteRoleRequest, clientData);
    if (errorMsg !== null) {
      return ctx.success({
        code: this.PAPRAMS_ERROR_CODE,
        message: errorMsg,
      });
    }
    const data = await ctx.service.roleSvc.deleteRole(clientData);
    if (data && data.errcode === 1) {
      return ctx.success({
        code: this.STATUS_CODE.ERROR.ROLE.USER_EXISTS.code,
      });
    } else if (data && data.errcode === 2) {
      return ctx.success({
        code: this.STATUS_CODE.ERROR.ROLE.SUPER_DELETE.code,
      });
    }
    return ctx.success({
      code: this.okCode,
    });
  }

  /**
   * @summary 获取单个角色
   * @description 获取单个角色
   * @jwt jwt jwt
   * @router get /api/role/{id}
   * @request path string id 角色id
   */
  async getRoleById() {
    const { ctx } = this;
    const clientData = ctx.params;
    const data = await ctx.service.roleSvc.getRoleById(clientData.id);
    return ctx.success({
      code: this.okCode,
      data,
    });
  }
  /**
   * 设置角色菜单
   */
  async setRoleMenu() {
    const { ctx } = this;
    const clientData = ctx.request.body;
    await ctx.service.rbacSvc.distributeMenusForRole(clientData);
    return ctx.success({
      code: this.okCode,
    });
  }

}


module.exports = RoleController;
