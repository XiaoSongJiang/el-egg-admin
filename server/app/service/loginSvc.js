'use strict';
const bcrypt = require('bcryptjs');
const Service = require('egg').Service;

class LoginService extends Service {
  /**
   * 登录验证
   * @param {*} user 登录信息
   */
  async loginCheck(user) {
    const { ctx, app } = this;
    // 验证码验证
    const clientCode = user.captchaCode;
    const clientKey = user.captchaKey;
    const realCode = await app.redis.get(clientKey);
    if (!realCode) {
      return {
        errcode: 3,
      };
    }
    if (realCode && clientCode !== realCode) {
      return {
        errcode: 4,
      };
    }
    await app.redis.del(clientKey);
    // 查找当前用户是否存在
    const { username } = user;
    let userInfo = await ctx.model.User.findOne({ where: { username }, raw: true });
    if (!userInfo) {
      userInfo = await ctx.model.User.findOne({ where: { email: username }, raw: true });
    }
    if (userInfo && userInfo.enabled) {
      const { password, id } = userInfo;
      const decPass = ctx.helper.privateDecrypt(Buffer.from(user.password, 'base64').toString('hex'), app.config.passwordRsa.privateKey);
      console.log('dePass', decPass);
      const pwdMatchFlag = bcrypt.compareSync(decPass, password);
      if (pwdMatchFlag) {
        // 验证超级管理员
        const superRole = await ctx.model.Role.findOne({ where: { level: 0 }, raw: true });
        if (superRole) {
          const newEnforcer = ctx.enforcer;
          const userOfRoles = await newEnforcer.getRolesForUser(id);
          if (userOfRoles.includes(superRole.id)) {
            userInfo.isSuper = true;
          } else {
            userInfo.isSuper = false;
          }
        }
        return userInfo;
      }
      return {
        errcode: 2,
      };

    } else if (userInfo && userInfo.status === 0) {
      return {
        errcode: 1,
      };
    }
    return {
      errcode: 2,
    };


  }
}
module.exports = LoginService;
