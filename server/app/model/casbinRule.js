'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  const CasbinRule = app.model.define('CasbinRule', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ptype: {
      type: STRING,
      comment: 'p: 表示角色 - 权限 - 访问方式; g: 表示用户 - 角色',
    },
    v0: {
      type: STRING,
    },
    v1: {
      type: STRING,
    },
    v2: {
      type: STRING,
    },
    v3: {
      type: STRING,
    },
    v4: {
      type: STRING,
    },
    v5: {
      type: STRING,
    },
  }, {
    timestamps: false,
    freezeTableName: true,
    comment: '规则表',
    tableName: 'casbin_rule',
  });
  return CasbinRule;
};
