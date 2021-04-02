'use strict';
const moment = require('moment');
module.exports = app => {
  const { INTEGER, STRING, BIGINT, BOOLEAN } = app.Sequelize;
  const Menu = app.model.define('Menu', {
    id: {
      type: STRING,
      primaryKey: true,
      comment: '菜单id',
    },
    title: {
      type: STRING,
      comment: '菜单名',
    },
    parentId: {
      type: STRING,
      field: 'parent_id',
      comment: '上级菜单ID',
    },
    remarks: {
      type: STRING,
      comment: '备注',
    },
    icon: {
      type: STRING,
      comment: 'icon',
    },
    menuType: {
      type: INTEGER,
      field: 'menu_type',
      defaultValue: 0,
      comment: '菜单类型 0:目录 1:菜单 2: 按钮',
    },
    sort: {
      type: INTEGER,
      comment: '排序值',
    },
    path: {
      type: STRING,
      defaultValue: '',
      comment: 'path地址',
    },
    operateType: {
      type: STRING,
      field: 'operate_type',
      defaultValue: '*',
      comment: '操作类型：* GET POST DELETE PUT',
    },
    hidden: {
      type: BOOLEAN,
      defaultValue: true,
      comment: '菜单隐藏 false 显示，true 不显示',
    },
    permission: {
      type: STRING,
      comment: '权限标识',
    },
    component: {
      type: STRING,
      comment: '组件地址',
    },
    name: {
      type: STRING,
      comment: '组件名',
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
    comment: '菜单表',
    tableName: 'menu',
    hooks: {
      beforeCreate: item => {
        const time = moment().valueOf();
        item.id = app.util.idMaker.generateId('MENU', 15);
        item.createdAt = time;
        item.updatedAt = time;
        item.status = 1;
      },
      beforeUpdate: item => {
        const time = moment().valueOf();
        item.updatedAt = time;
      },
    },
  });
  Menu.associate = function associate() {
    app.model.Menu.belongsToMany(app.model.Role, { through: app.model.RoleMenu, foreignKey: 'mId' });
  };
  return Menu;
};
