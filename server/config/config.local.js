
'use strict';
const casbin = require('casbin');
const path = require('path');

const { SequelizeAdapter } = require('casbin-sequelize-adapter');
module.exports = appInfo => {
  const config = exports = {};
  exports.sequelize = {
    dialect: 'postgres', // support: mysql, mariadb, postgres, mssql
    host: '127.0.0.1',
    port: 5432,
    username: 'postgres',
    password: '123456',
    database: 'ele-admin-server',
    timezone: '+08:00',
    define: {
      underscored: false,
    },
  };
  config.jwt = {
    secret: 'jbr!@#123',
    expire: 4 * 60 * 60,
  };
  config.authz = {
    enable: true,
    newEnforcer: async () => {
      const a = await SequelizeAdapter.newAdapter({
        dialect: 'postgres',
        host: '127.0.0.1',
        port: 5432,
        username: 'postgres',
        password: '123456',
        database: 'ele-admin-server',
        timezone: '+08:00',
        define: {
          underscored: false,
        },
      });
      const enforcer = await casbin.newEnforcer(path.join(appInfo.baseDir, 'config/rbac.model.conf'), a);
      enforcer.addFunction('keyMatchWithQuery', function keyMatchWithQuery(key1, key2) {
        return key1.startsWith(key2);
      })
      return enforcer;
    },
  };
  // redis缓存配置
  config.redis = {
    client: {
      port: 6378, // Redis port
      host: '127.0.0.1', // Redis host
      password: '123456',
      db: 0,
    },
  };
  config.redlock = {
    options: {
      driftFactor: 0.01, // time in ms
      retryCount: 5,
      retryDelay: 200, // time in ms
      retryJitter: 50, // time in ms
    },
  };
  config.bulls = {
    app: true,
    clients: {
      queue: { topic: 'queue' },
    },
    default: {
      queueOptions: {
        redis: {
          port: 6378, // Redis port
          host: '127.0.0.1', // Redis host
          password: '123456',
          db: 4,
        },
        defaultJobOptions: {
          removeOnComplete: true,
          removeOnFail: false,
        },
      },
    },
  };
  return config;
};
