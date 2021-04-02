
'use strict';
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const moment = require('moment');

const BaseServiceService = require('../core/baseService');

class UserService extends BaseServiceService {

  constructor(ctx) {
    super(ctx);
    this.model = this.ctx.model.User;
  }
  /**
   * 创建用户
   * @param {*} userInfo
   */
  async createUser(userInfo) {
    const { ctx } = this;
    const { roles, password = '123456' } = userInfo;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    userInfo.creator = ctx.user.id;
    userInfo.password = hash;
    const roleList = await this.service.roleSvc.getRolesByIds(roles);
    const roleIds = roleList.map(role => role.id);
    if (roleIds.length > 0) {
      const user = await this.model.create(userInfo);
      await this.service.rbacSvc.updateUserRoles({ uId: user.id, roleIds });
      const data = await this.getUser(user.id);
      return data;
    }
    return null;
  }

  async listUsersWithRoles(filter) {
    const { ctx } = this;
    let { blurry, size = 10, page = 0, enabled, startTime, endTime } = filter;
    const offset = Number(size) * Number(page);

    const where = {};
    if (!ctx.user.isSuper) {
      where[Op.and] = {
        creator: ctx.user.id,
      }
    }

    // 模糊搜索
    if (blurry) {
      where[Op.or] = [
        {
          username: {
            [Op.regexp]: blurry,
          },
        },
        {
          email: {
            [Op.regexp]: blurry,
          },
        },
        {
          nickName: {
            [Op.regexp]: blurry,
          },
        },
      ];
    }
    if (typeof enabled === 'string') {
      enabled = enabled === 'true'
      where[Op.and] = {
        enabled,
      }
    }
    this.generateTimeFilter(where, startTime, endTime);

    const RoleModel = ctx.model.Role;
    const UserExtendModel = ctx.model.UserExtend;
    let data = await this.model.findAll({
      where,
      attributes: { exclude: ['password'] },
      include: [{
        model: RoleModel,
        as: 'roles',
        attributes: ['id', 'name', 'parentId', 'enabled', 'level'],
        duplicating: false,
        through: {
          attributes: [],
        },
      }, {
        model: UserExtendModel,
        as: 'userExtend',
        attributes: ['extendField', 'extendValue', 'extendExtra'],
      }],
      limit: size,
      offset,
      order: [['updatedAt', 'DESC']],
    }).then(ds => ds.map(d => d.toJSON()));
    if (data.length === 0) {
      data = { rows: [], count: 0, page, totalPages: 0 }
    } else {
      const totalCount = await this.model.count({ where });
      const totalPages = Math.ceil(totalCount / size);
      data = { rows: data, count: totalCount, currentPage: page, totalPages };
    }
    return data;
  }
  /**
   * 获取所有的激活用户房估估次数配置
   */
  async getAllUserFggCountSetting() {
    const { ctx } = this;
    const UserExtendModel = ctx.model.UserExtend;
    const data = await this.model.findAll({
      where: {
        enabled: true,
      },
      attributes: ['id'],
      include: [{
        model: UserExtendModel,
        as: 'userExtend',
        attributes: ['extendField', 'extendValue', 'extendExtra'],
      }],
    }).then(ds => ds.map(d => d.toJSON()));
    const tmpArr = [];
    for (const item of data) {
      if (item.userExtend) {
        for (const extend of item.userExtend) {
          for (const value of extend.extendExtra) {
            if (value.configType === 1 && value.configContent && value.configContent.remainingTimes < 10) {
              tmpArr.push({ id: item.id, accessKeyId: value.accessKeyId, remainingTimes: value.configContent.remainingTimes });
            }
          }
        }
      }
    }
    return tmpArr;
  }

  async getUser(id) {
    const { ctx } = this;
    const RoleModel = ctx.model.Role;

    const rst = await this.model.findOne({
      where: {
        enabled: true,
        id,
      },
      attributes: { exclude: ['password'] },
      include: [{
        model: RoleModel,
        as: 'roles',
        attributes: ['id', 'name', 'parentId', 'enabled', 'level'],
        through: {
          attributes: [],
        },
      }],
    }).then(d => (d ? d.toJSON() : null));
    const newEnforcer = ctx.enforcer;
    const permissionsArr = []
    rst && rst.roles && rst.roles.forEach(role => {
      permissionsArr.push(newEnforcer.getPermissionsForUser(role.id))
    })
    const permissionList = [];
    const data = await Promise.all(permissionsArr);
    data.forEach(item => {
      item.forEach(v => {
        permissionList.push(`${v[2]}:${v[1]}`)
      })
    })
    // const permissionList = [];
    // permissions.forEach(item => {
    //   permissionList.push(`${item[1]}:${item[2]}`)
    // })
    rst.permissionList = [...new Set(permissionList)];
    return rst;
  }

  async updateUser(userInfo) {
    const { id, roles } = userInfo;
    if (!id) {
      return {
        errcode: 1,
      };
    }
    userInfo.modifier = this.ctx.user.id;
    await this.model.update(userInfo, {
      where: {
        id,
      },
      individualHooks: true,
    });
    // 在casbin_rule 中更新用户角色
    await this.service.rbacSvc.updateUserRoles({ uId: id, roleIds: roles });
    return {
      errcode: 0,
    };
  }

  async deleteUser(params) {
    const { ids } = params;
    // 先删除用户角色
    const deleteArr = ids.map(id => this.service.rbacSvc.deleteRolesForUserById(id))
    await Promise.all(deleteArr)
    const res = await this.model.destroy({
      where: {
        id: ids,
      },
    });
    return res;
  }

  async findOneUserById(id) {
    const user = await this.model.findOne({ where: { id }, raw: true });
    return user;
  }

  /**
  * 更新单个用户信息
  * @param {*} clientInfo
  */
  async updateSingleUser(clientInfo) {
    const { ctx, app } = this;
    const id = ctx.user.id;
    const { oldPass, newPass, confirmPass, email, emailCode } = clientInfo;
    if (!id) {
      return {
        errcode: 1,
      };
    }
    const userInfo = await this.findOneUserById(id);
    if (!userInfo) {
      return {
        errcode: 2,
      };
    } else if (userInfo && !userInfo.enabled) {
      return {
        errcode: 3,
      };
    }
    // 验证新密码和确认密码一致性
    if (newPass && newPass !== confirmPass) {
      return {
        errcode: 4,
      };
    } else if (newPass && newPass === confirmPass) {
      const pwdMatchFlag = bcrypt.compareSync(oldPass, userInfo.password);
      if (!pwdMatchFlag) {
        return {
          errcode: 5,
        };
      }
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(newPass, salt);
      clientInfo.password = hash;
    } else if (email) {
      if (!emailCode) {
        return {
          errcode: 6,
        };
      }
      const cacheEmailCode = await app.redis.get(`mailbox_binding_${email}`);
      if (!cacheEmailCode) {
        return {
          errcode: 7,
        };
      }
      // 邮箱验证码与缓存码不一致
      if (cacheEmailCode !== emailCode) {
        return {
          errcode: 8,
        };
      }
      const pwdMatchFlag = bcrypt.compareSync(oldPass, userInfo.password);
      if (!pwdMatchFlag) {
        return {
          errcode: 5,
        };
      }
      await app.redis.del(`mailbox_binding_${email}`);
    }
    userInfo.modifier = this.ctx.user.id;
    await this.model.update(clientInfo, {
      where: {
        id,
      },
      individualHooks: true,
    });
    return true;

  }
  /**
   * 获取用户拓展信息
   * @param {*} clientInfo
   */
  async getUserExtend(clientInfo) {
    const { ctx } = this;
    const { userId, type } = clientInfo;

    return await ctx.model.UserExtend.findAll({
      where: {
        userId,
        extendField: type,
      },
      raw: true,
    });
  }
  // /**
  //  * 更新用户拓展信息
  //  * @param {*} clientInfo
  //  */
  // async updateUserExtend(clientInfo) {
  //   const { ctx } = this;
  //   const { userId, assistApps, type } = clientInfo;

  //   await ctx.model.UserExtend.destroy({
  //     where: {
  //       userId,
  //       extendField: type,
  //     },
  //   });
  //   const insertData = [];
  //   assistApps.forEach(item => {
  //     const time = moment().valueOf();
  //     const obj = { userId }
  //     obj.extendField = type;
  //     obj.extendValue = item;
  //     obj.creator = ctx.user.id;
  //     obj.modifier = ctx.user.id;
  //     obj.createdAt = time;
  //     obj.updatedAt = time;
  //     insertData.push(obj);
  //   })
  //   await ctx.model.UserExtend.bulkCreate(insertData)
  // }
  // /**
  //  * 删除用户拓展信息
  //  * @param {*} clientInfo
  //  */
  // async deleteUserExtend(clientInfo) {
  //   const { ctx } = this;
  //   const { userId, assistApps, type } = clientInfo;
  //   const where = {
  //     userId,
  //     extendField: type,
  //   };
  //   if (assistApps) {
  //     where.extendValue = assistApps
  //   }
  //   await ctx.model.UserExtend.destroy({
  //     where,
  //   });
  // }

  /**
   * 分配小助
   * @param {*} clientInfo
   */
  async assignAssistApps(clientInfo) {
    const { ctx, config } = this;
    const { accessKeyIdInfos, userId, type } = clientInfo;
    const accessKeyIds = []
    let transaction;
    let submitTran = true;
    const { host, apiUris } = config.triApiConfig;
    const uri = apiUris.access;
    const queryStr = await this.generateSign();
    const insertData = []; // 需要插入的数据
    accessKeyIdInfos.forEach(item => {
      accessKeyIds.push(item.accessKeyId);

      const time = moment().valueOf();
      const obj = { userId }
      obj.extendField = type;
      obj.extendValue = item.accessKeyId;
      obj.extendExtra = item.AccessConfigs;
      obj.creator = ctx.user.id;
      obj.modifier = ctx.user.id;
      obj.createdAt = time;
      obj.updatedAt = time;
      insertData.push(obj);
    });
    const changeState = async params => {
      const data = await ctx.curl(`${host}${uri}?${queryStr}`, {
        method: 'PUT',
        data: params,
        // 自动解析 JSON response
        dataType: 'json',
        // 3 秒超时
        timeout: 3000,
        contentType: 'json',
      });
      if (data.status === 200) {
        if (data.data.code !== 20000) {
          submitTran = false;
        }
      } else {
        submitTran = false;
      }
    }
    try {
      // 建立事务对象
      transaction = await ctx.model.transaction();
      const userExtendInfo = await this.getUserExtend({ userId, type });
      // 当前用户未被分配 直接插入数据
      if (userExtendInfo && userExtendInfo.length === 0) {
        await ctx.model.UserExtend.bulkCreate(insertData, { transaction });
        // 更新三方小助应用使用状态
        const params = {
          accessKeyId: accessKeyIds,
          used: true,
        };
        await changeState(params);
      } else {
        // 先删除原来分配的用户拓展数据
        await ctx.model.UserExtend.destroy({
          where: {
            userId,
            extendField: type,
          },
        }, { transaction });
        // 更新之前三方小助应用使用状态
        const oldAccessKeyIds = userExtendInfo.map(info => info.extendValue)
        let params = {
          accessKeyId: oldAccessKeyIds,
          used: false,
        };
        await changeState(params);
        await ctx.model.UserExtend.bulkCreate(insertData, { transaction });
        // 更新三方小助应用使用状态
        params = {
          accessKeyId: accessKeyIds,
          used: true,
        };
        await changeState(params);
      }
      if (!submitTran) {
        await transaction.rollback();
        return false;
      }
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
module.exports = UserService;
