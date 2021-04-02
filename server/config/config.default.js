/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1612692427483_9440';

  // add your middleware config here
  config.middleware = ['authentication', 'authz', 'notFoundHandler', 'errorHandler'];


  // add your user config here
  const userConfig = {

    ignoreJwtPath: [
      '/api/auth/login',
      '/api/captcha',
      '/swagger',
    ],
    ignoreRbacPath: [
      '/api/auth/login',
      '/api/captcha',
      '/api/email_code',
      '/swagger',
      '/api/auth',
      '/api/menu/build',

    ],
    // 密码rsa
    passwordRsa: {
      publicKey: `-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKFFoYGJ3GnXl/hDiQAsD7o2ezWVOjpF
2vtKfED5OQucyLkUou523JwPsZwyOKoSJiK8ZAzv7vsbrw0YTRVyt6ECAwEAAQ==
-----END PUBLIC KEY-----`,
      privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIIBOwIBAAJBAKFFoYGJ3GnXl/hDiQAsD7o2ezWVOjpF2vtKfED5OQucyLkUou52
3JwPsZwyOKoSJiK8ZAzv7vsbrw0YTRVyt6ECAwEAAQJAJ8I/3+y570ociDM2Klmy
guj9lSc2FLm2E++4FFic7LSVDkm0C3iD02BafcTkA4IJoYYfC8j2SrzuW+StqOV2
9QIhANjB8+S6pbDFwc1w3eRAjLJZnW8fD7aUG0Ka4seRSuE3AiEAvngXHr2HYOsC
nbTqzwLEy+dradTjj/K3E+jiTB5F+ecCIQDGhh1TSH+ov/cYql8QRu6WCu3ecJx7
pHqzLhi2n6PtUQIhAI50UxZyumYKXxKE1XmuoHHAy92DlA99gOArNdWobr3RAiB8
Hn5snlqcoarn8vgVyY0QiijgBs2YX2+RNyQYWYIwEw==
-----END RSA PRIVATE KEY-----`,
    },
  };

  config.security = {
    csrf: {
      enable: false, // 将内置的安全系统关闭
    },
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,OPTIONS,POST,DELETE,PATCH',
  };
  config.customLoader = {
    constant: {
      directory: 'app/constant',
      inject: 'app',
    },
    validateRule: {
      directory: 'app/validateRule',
      inject: 'app',
    },
    util: {
      directory: 'app/util',
      inject: 'app',
    },
  };
  config.swaggerdoc = {
    dirScanner: './app/controller',
    apiInfo: {
      title: '后台接口文档',
      description: '后台接口文档',
      version: '1.0.0',
    },
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
      jwt: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
    enableSecurity: true,
    // enableValidate: true,
    routerMap: false,
    enable: true,
  };
  config.email = {
    service: 'qq',
    user: '1273398724@qq.com',
    password: 'gqepggvwwisbhiaf',
    protocol: 'smtp',
    host: 'smtp.qq.com',
    port: 465,
    expire: 5 * 60,
  };
  return {
    ...config,
    ...userConfig,
  };
};
