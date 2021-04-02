'use strict';
const moment = require('moment');

module.exports = app => {
  const { INTEGER, STRING, BIGINT, BOOLEAN } = app.Sequelize;
  const Role = app.model.define('Role', {
    id: {
      type: STRING,
      primaryKey: true,
      comment: '角色唯一id',
    },
    name: {
      type: STRING,
    },
    parentId: {
      type: STRING,
      field: 'parent_id',
      comment: '角色父级id',
    },
    description: {
      type: STRING,
      field: 'description',
      comment: '描述',
    },
    sort: {
      type: INTEGER,
      comment: '排序值',
    },
    level: {
      type: INTEGER,
      field: 'level',
      defaultValue: 1,
      comment: '角色等级 0:超级 1:普通',
    },
    enabled: {
      type: BOOLEAN,
      defaultValue: true,
      comment: '状态 true: 启用 false: 禁用',
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
    comment: '角色表',
    tableName: 'role',
    hooks: {
      beforeCreate: role => {
        const time = moment().valueOf();
        role.id = app.util.idMaker.generateId('ROLE', 15);
        role.createdAt = time;
        role.updatedAt = time;
      },
      beforeUpdate: role => {
        const time = moment().valueOf();
        role.updatedAt = time;
      },
    },
  });
  Role.associate = function associate() {
    app.model.Role.belongsToMany(app.model.User, {
      as: 'users',
      through: app.model.CasbinRule,
      foreignKey: 'v1',
    });
    app.model.Role.belongsToMany(app.model.Menu, { through: app.model.RoleMenu, foreignKey: 'rId', as: 'menus' });
  };
  return Role;
};
