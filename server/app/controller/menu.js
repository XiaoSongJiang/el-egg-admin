'use strict';

const BaseController = require('../core/baseController');
/**
* @controller menu
*/

class MenuController extends BaseController {

  /**
  * @summary 添加菜单
  * @description 添加菜单
  * @jwt jwt jwt
  * @router post /api/menu
  * @request body createMenuRequest *body
  * @response 200 createMenuResponse 创建成功
  */
  async addMenu() {
    const { ctx } = this;
    const clientData = ctx.request.body;
    // 校验参数
    const errorMsg = this.validateParams(ctx.rule.createMenuRequest, clientData);
    if (errorMsg !== null) {
      return ctx.success({
        code: this.PAPRAMS_ERROR_CODE,
        message: errorMsg,
      });
    }
    const data = await ctx.service.menuSvc.addMenu(clientData);
    return ctx.success({
      code: this.okCode,
      data,
    });
  }

  /**
  * @summary 构建左侧菜单
  * @description 构建左侧菜单树状结构
  * @jwt jwt jwt
  * @router get /api/menu/build
  * @response 200 buildMenuResponse 成功
  */
  async menuBuild() {
    const { ctx } = this;
    const data = await ctx.service.menuSvc.menuBuild();
    return ctx.success({
      code: this.okCode,
      data,
    });
  }

  /**
  * @summary 菜单树(角色分配)
  * @description 菜单树(角色分配)
  * @jwt jwt jwt
  * @router get /api/menu/tree
  * @response 200 buildMenuResponse 成功
  */

  async menuTree() {
    const { ctx } = this;
    const data = await ctx.service.menuSvc.menuTree();
    return ctx.success({
      code: this.okCode,
      data,
    });
  }
  /**
  * @summary 菜单树(列表)
  * @description 菜单树(列表)
  * @jwt jwt jwt
  * @router get /api/menu
  * @response 200 buildMenuResponse 成功
  */
  async getMenuTree() {
    const { ctx } = this;
    const data = await ctx.service.menuSvc.menuTree();
    return ctx.success({
      code: this.okCode,
      data,
    });
  }

  /**
  * @summary 更新菜单
  * @description 更新菜单
  * @jwt jwt jwt
  * @request body updateMenuRequest *body
  * @router put /api/menu
  * @response 200 updateMenuResponse 成功
  */

  async updateMenu() {
    const { ctx } = this;
    const clientData = ctx.request.body;
    // 校验参数
    const errorMsg = this.validateParams(ctx.rule.updateMenuRequest, clientData);
    if (errorMsg !== null) {
      return ctx.success({
        code: this.PAPRAMS_ERROR_CODE,
        message: errorMsg,
      });
    }
    await ctx.service.menuSvc.updateMenu(clientData);
    return ctx.success({
      code: this.okCode,
    });
  }

  /**
  * @summary 删除菜单
  * @description 删除菜单
  * @jwt jwt jwt
  * @router delete /api/menu
  * @request body deleteMenuRequest *body
  * @response 200 deleteMenuResponse 成功
  */
  async deleteMenu() {
    const { ctx } = this;
    const clientData = ctx.request.body;
    // 校验参数
    const errorMsg = this.validateParams(ctx.rule.deleteMenuRequest, clientData);
    if (errorMsg !== null) {
      return ctx.success({
        code: this.PAPRAMS_ERROR_CODE,
        message: errorMsg,
      });
    }
    await ctx.service.menuSvc.deleteMenu(clientData);
    return ctx.success({
      code: this.okCode,
    });
  }
}

module.exports = MenuController;
