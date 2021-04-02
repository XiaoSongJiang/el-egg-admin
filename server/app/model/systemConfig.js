'use strict';
// 系统设置表


module.exports = app => {
  const { STRING, BIGINT, TEXT } = app.Sequelize;

  const SystemConfig = app.model.define('SystemConfig', {
    name: {
      type: STRING(50),
      field: 'name',
      comment: '配置名称',
      allowNull: false,
    },
    value: {
      type: TEXT,
      comment: '配置值',
      field: 'value',
      allowNull: false,
    },
    remark: {
      type: STRING(255),
      comment: '配置说明',
      field: 'remark',
      allowNull: false,
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
    tableName: 'sys_config',
    comment: '系统设置表',
    hooks: {

    },
  });
  SystemConfig.associate = function associate() {

  };
  return SystemConfig;
};
