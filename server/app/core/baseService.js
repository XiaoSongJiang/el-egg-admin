/**
 * 公共service类
 */
'use strict';
const { Op } = require('sequelize');
const moment = require('moment');
const crypto = require('crypto');
const qs = require('qs')
const Service = require('egg').Service;

class BaseServiceService extends Service {
  /**
    * 按 id 查询
    * @param  {*} id 主键
    */
  async byPk(id) {
    const record = await this.model.findByPk(id, { raw: true });
    return record;
  }
  /**
   * 按条件查询数据
   * @param  {*} where 条件
   */
  async getData(where) {
    return await this.model.findOne({ where }).then(d => {
      if (!d) {
        return null;
      }
      return d.toJSON();
    });
  }
  /**
   * 按条件查询数据列表
   * @param  {*} where 条件
   * @param  {*} extraOptions 用于排序
   */
  async getDataList(where, extraOptions) {
    const order = [];
    if (extraOptions) {
      const { sort } = extraOptions;
      if (sort) {
        order.push(sort)
      }
    }
    order.push(['createdAt', 'DESC'])
    const query = {
      raw: true,
      order,
    };
    if (where) {
      query['where'] = where;
    }
    const list = await this.model.findAll(query);
    return list;
  }
  /**
   * 修改记录
   * @param {*} obj 新的记录
   */
  async update(obj) {
    obj.modifier = this.ctx.user.userId;
    return await this.model.update(obj, {
      where: {
        id: {
          [Op.eq]: obj.id,
        },
      },
      individualHooks: true,
      returning: true,
    }).then(dcs => {
      const dcsInfo = dcs[1].map(i => i.toJSON())
      return dcsInfo[0];
    });
  }
  /**
   * 按条件删除记录
   * @param  {*} where 条件
   */
  async delete(where) {
    if (!where || Object.keys(where).length === 0) {
      return
    }
    return await this.model.destroy({
      where,
    });
  }
  /**
   * 分页查询处理
   * @param pageSize 每页数量
   * @param currentPage 当前页码
   */
  getPageHandler(pageSize, currentPage) {
    return ds => {
      const rows = ds.rows.map(d => {
        const dt = d.toJSON();
        return dt;
      });
      const count = ds.count;
      const totalPages = Math.ceil(count / pageSize);
      return { rows, count, currentPage, totalPages };
    }
  }
  generateTimeFilter(where, createStartTime, createEndTime) {
    // console.log('createStartTime, createEndTime', createStartTime, createEndTime);
    // 创建开始时间
    let createdAt;
    let createdEndAt;
    if (createStartTime && typeof createStartTime === 'string') {
      createdAt = moment(createStartTime).valueOf();
      where[Op.and] = {
        createdAt: {
          [Op.gt]: createdAt,
        },
      }
    }

    if (createEndTime && typeof createEndTime === 'string') {
      createdEndAt = moment(createEndTime).valueOf();
      where[Op.and] = {
        createdAt: {
          [Op.gt]: createdAt,
          [Op.lt]: createdEndAt,
        },
      }
    }

    return where;
  }
}

module.exports = BaseServiceService;

