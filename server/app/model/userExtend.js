'use strict';
// 用户拓展表


module.exports = app => {
  const { STRING, BIGINT, JSON } = app.Sequelize;

  const UserExtend = app.model.define('UserExtend', {
    userId: {
      type: STRING(25),
      field: 'user_id',
      comment: '用户id',
    },
    extendField: {
      type: STRING(50),
      field: 'extend_field',
      comment: '拓展字段',
      allowNull: false,
    },
    extendValue: {
      type: STRING(100),
      comment: '拓展字段值',
      field: 'extend_value',
      allowNull: false,
    },
    extendExtra: {
      type: JSON,
      comment: '拓展字段值额外信息',
      field: 'extend_extra',
      allowNull: true,
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
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'user_extend',
    hooks: {

    },
  });
  UserExtend.associate = function associate() {
    app.model.UserExtend.belongsTo(app.model.User, {
      foreignKey: 'userId',
      targetKey: 'id',
    });
  };
  return UserExtend;
};
