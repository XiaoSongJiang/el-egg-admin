'use strict';
const moment = require('moment');

module.exports = app => {
  const { STRING, BIGINT, BOOLEAN } = app.Sequelize;

  const User = app.model.define('User', {
    id: {
      type: STRING(25),
      primaryKey: true,
      comment: '用户id',
    },
    username: {
      type: STRING(50),
      unique: true,
      comment: '用户名',
      allowNull: false,
    },
    password: {
      type: STRING(100),
      comment: '密码',
      allowNull: false,
    },
    nickName: {
      type: STRING(50),
      field: 'nick_name',
      comment: '用户昵称',
    },
    mobile: {
      type: STRING(20),
      unique: true,
      comment: '手机号',
    },
    email: {
      type: STRING(20),
      unique: true,
      comment: '邮箱',
    },
    avatar: {
      type: STRING(100),
      comment: '头像',
    },
    creator: {
      type: STRING(100),
      comment: '创建人',
    },
    modifier: {
      type: STRING(100),
      comment: '修改人',
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
    enabled: {
      type: BOOLEAN,
      defaultValue: true,
      comment: '状态 true: 启用 false: 禁用',
    },
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'user',
    hooks: {
      beforeCreate: item => {
        const time = moment().valueOf();
        item.id = app.util.idMaker.generateId('USER', 15);
        item.createdAt = time;
        item.updatedAt = time;
      },
      beforeUpdate: item => {
        const time = moment().valueOf();
        item.updatedAt = time;
      },
    },
  });
  User.associate = function associate() {
    app.model.User.belongsToMany(app.model.Role, {
      as: 'roles',
      through: app.model.CasbinRule,
      foreignKey: 'v0',
    });

    app.model.User.hasMany(app.model.UserExtend, {
      as: 'userExtend',
      sourceKey: 'id',
      foreignKey: 'userId',
    });

  };
  return User;
};
