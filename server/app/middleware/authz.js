'use strict';

const casbin = require('casbin');
const { Enforcer } = casbin;

class BasicAuthorizer {
  constructor(ctx, enforcer) {
    this.ctx = ctx;
    this.enforcer = enforcer;
  }

  // getUserName gets the user name from the request.
  // Currently, only HTTP basic authentication is supported
  getUser() {
    // customize to get username from context
    const { user } = this.ctx;
    return user;
  }

  // checkPermission checks the user/method/path combination from the request.
  // Returns true (permission granted) or false (permission forbidden)
  async checkPermission() {
    const { ctx, enforcer } = this;
    const { originalUrl: path, method } = ctx;
    const skipUrls = ctx.app.config.ignoreRbacPath;
    const bool = skipUrls.findIndex(item => path.startsWith(item));
    if (bool > -1) {
      return true;
    }
    const user = this.getUser();
    // 验证是不是具有超级管理员权限
    if (user && user.isSuper) {
      return true;
    }
    console.log(user.id, path, method);
    const res = await enforcer.enforce(user.id, path, method);
    return res;
  }
}


module.exports = function authz(options) {
  return async (ctx, next) => {
    try {
      const STATUS_CODE = ctx.app.constant.statusCode.STATUS_CODE;
      const { authorizer } = options;
      const enforcer = ctx.app.rbacEnforcer;
      ctx.enforcer = enforcer;
      if (!(enforcer instanceof Enforcer)) {
        throw new Error('Invalid enforcer');
      }
      const authzorizer = authorizer ? authorizer(ctx, enforcer) : new BasicAuthorizer(ctx, enforcer);
      if (!(authzorizer instanceof BasicAuthorizer)) {
        throw new Error('Please extends BasicAuthorizer class');
      }
      const checkPerRst = await authzorizer.checkPermission()
      console.log('权限检查', checkPerRst);
      if (!checkPerRst) {
        return ctx.success({
          code: STATUS_CODE.ERROR.AUTHZ.PERMISSION.code,
        });
      }
      await next();
    } catch (e) {
      throw e;
    }
  };
};
