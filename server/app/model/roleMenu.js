'use strict';
const moment = require('moment');

module.exports = app => {
  const { STRING, BIGINT } = app.Sequelize;
  const RoleMenu = app.model.define('RoleMenu', {
    rId: {
      type: STRING,
      field: 'r_id',
      comment: '角色唯一id',
    },
    mId: {
      type: STRING,
      field: 'm_id',
      comment: '菜单唯一id',
    },
    createdAt: {
      type: BIGINT,
      field: 'created_at',
      comment: '创建日期',
    },
    updatedAt: {
      type: BIGINT,
      field: 'updated_at',
      comment: '更新日期',
    },
  }, {
    timestamps: false,
    freezeTableName: true,
    comment: '角色菜单表',
    tableName: 'role_menu',
    hooks: {
      beforeCreate: item => {
        const time = moment().valueOf();
        item.createdAt = time;
        item.updatedAt = time;
      },
      beforeBulkCreate: list => {
        for (const item of list) {
          const time = moment().valueOf();
          item.createdAt = time;
          item.updatedAt = time;
        }
      },
      beforeUpdate: item => {
        const time = moment().valueOf();
        item.updatedAt = time;
      },
    },
  });
  return RoleMenu;
};
