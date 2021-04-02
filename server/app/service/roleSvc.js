'use strict';

const BaseServiceService = require('../core/baseService');
const { Op } = require('sequelize');

class RoleService extends BaseServiceService {

  constructor(ctx) {
    super(ctx);
    this.model = this.ctx.model.Role;
  }

  async createRole(role) {
    const res = await this.model.create(role, { raw: true });
    return res;
  }
  async getRolesByIds(ids) {
    const roleList = await this.getDataList({ id: ids });
    return roleList;
  }

  async getAllRole() {
    const roleList = await this.getDataList();
    return roleList;
  }
  /**
   * 角色分页
   * @param {*} filter
   */
  async listPageRoles(filter) {
    const { blurry, size = 10, page = 0, startTime, endTime } = filter;
    const offset = Number(size) * Number(page);

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
          description: {
            [Op.regexp]: blurry,
          },
        },
      ];
    }
    this.generateTimeFilter(where, startTime, endTime);
    const MenuModel = this.ctx.model.Menu;

    let data = await this.model.findAndCountAll({
      where,
      include: [{
        model: MenuModel,
        as: 'menus',
        attributes: ['id', 'title', 'menuType', 'operateType', 'permission'],
        through: {
          attributes: [],
        },
      }],
      limit: size,
      offset,
      order: [['updatedAt', 'DESC']],
    }).then(this.getPageHandler(size, page));
    if (!data) {
      data = { rows: [], count: 0, page, totalPages: 0 }
    }
    return data;
  }

  /**
   * 更新角色基本信息
   * @param {*} clientInfo
   */
  async updateRole(clientInfo) {

    const { name, level, id, description } = clientInfo;
    const data = {
      name,
    };
    if (level) {
      data.level = level
    }
    if (description) {
      data.description = description
    }
    await this.model.update(data, {
      where: {
        id,
      },
      individualHooks: true,
    });
    return true;
  }
  /**
   * 删除角色
   * @param {*} params
   */
  async deleteRole(params) {
    const { ids } = params;
    // 超级管理员角色禁止删除
    const roleList = await this.getDataList({ id: ids, level: 0 });
    if (roleList && roleList.length > 0) {
      return {
        errcode: 2,
      }
    }
    // 验证是否还有用户是当前角色
    const userIds = await this.service.rbacSvc.getUsersForRole(ids);
    if (userIds && userIds.length > 0) {
      return {
        errcode: 1,
      }
    }
    await this.model.destroy({
      where: {
        id: ids,
      },
    });
    return true;
  }

  async getRoleById(id) {
    const { ctx } = this;
    const MenuModel = ctx.model.Menu;
    const where = {
      id,
    }
    const data = await this.model.findOne({
      where,
      include: [{
        model: MenuModel,
        as: 'menus',
        attributes: ['id', 'title', 'menuType', 'operateType', 'permission'],
        through: {
          attributes: [],
        },
      }],
    }).then(d => (d ? d.toJSON() : null))
    return data;
  }
}

module.exports = RoleService;
