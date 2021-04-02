'use strict';

const BaseServiceService = require('../core/baseService');
const _ = require('lodash')

class RbacService extends BaseServiceService {
  /**
  *修改用户角色
  * @param {*} clientInfo
  */
  async updateUserRoles(clientInfo) {
    const { ctx } = this;
    const { uId, roleIds } = clientInfo;
    const user = await ctx.service.userSvc.byPk(uId);
    if (!user) {
      return {
        errcode: 1,
      };
    }
    const newEnforcer = ctx.enforcer;
    // 先删除用户的所有所属角色
    await this.deleteRolesForUserById(uId)
    const arr = [];
    if (roleIds && Array.isArray(roleIds)) {
      for (const item of roleIds) {
        arr.push(newEnforcer.addRoleForUser(uId, item));
      }
    } else if (roleIds && !Array.isArray(roleIds)) {
      arr.push(newEnforcer.addRoleForUser(uId, roleIds));
    }
    const data = await Promise.all(arr);
    return data;
  }

  /**
   *获取单个用户所属所有角色
  * @param {*} uid 用户id
  */
  async getRolesByUid(uid) {
    const { ctx } = this;
    const newEnforcer = ctx.enforcer;
    const roles = await newEnforcer.getRolesForUser(uid);
    if (Array.isArray && roles.length === 0) {
      return [];
    }
    const res = await ctx.model.Role.findAll({
      where: {
        id: roles,
      },
      raw: true,
    });
    return res;
  }
  /**
   * 删除用户的所有所属角色
   * @param {*} id 用户id
   */
  async deleteRolesForUserById(id) {
    const { ctx } = this;
    const newEnforcer = ctx.enforcer;
    const _arr = [];
    const roles = await newEnforcer.getRolesForUser(id);
    for (const _role of roles) {
      _arr.push(newEnforcer.deleteRoleForUser(id, _role));
    }
    await Promise.all(_arr);
  }

  /**
   * 获取具有角色的用户
   * @param {*} roleIds
   */
  async getUsersForRole(roleIds) {
    const { ctx } = this;
    const newEnforcer = ctx.enforcer;
    const arr = []
    roleIds.forEach(id => {
      arr.push(newEnforcer.getUsersForRole(id))
    });
    const data = await Promise.all(arr);
    return _.flattenDeep(data)
  }

  /**
   * 给角色分配菜单
   * @param {*} params
   */
  async distributeMenusForRole(params) {
    const { id: rId, menus } = params;
    let transaction;
    try {
      // 建立事务对象
      transaction = await this.ctx.model.transaction();
      // 先删除角色菜单表对应角色的所有记录
      await this.ctx.model.RoleMenu.destroy({
        where: {
          rId,
        },
      }, {
        transaction,
      });
      // 写入角色菜单表
      const roleMenusData = [];
      const permissions = [];
      for (const item of menus) {
        roleMenusData.push({ rId, mId: item.id });
        if (item.menuType === 2) {
          permissions.push({ ptype: 'p', v0: rId, v1: item.permission, v2: item.operateType });
        }
      }
      await this.ctx.model.RoleMenu.bulkCreate(roleMenusData, {
        transaction,
      });
      // 先删除权限表角色的所有记录
      await this.ctx.model.CasbinRule.destroy({
        where: {
          ptype: 'p',
          v0: rId,
        },
      }, {
        transaction,
      });
      await this.ctx.model.CasbinRule.bulkCreate(permissions, {
        transaction,
      });
      // 提交事务
      await transaction.commit();
      return true;
    } catch (err) {
      // 事务回滚
      console.log('事务异常', err);
      await transaction.rollback();
      return false;
    }
  }
}

module.exports = RbacService;
