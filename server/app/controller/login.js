'use strict';

const BaseController = require('../core/baseController');
/**
 * @controller login
 */
class LoginController extends BaseController {
  /**
  * @summary 登录
  * @description 用户登录
  * @router post /api/auth/login
  * @request body loginRequest *body
  * @response 200 loginResponse 登录成功
  */
  async loginCheck() {
    const { ctx, app } = this;
    const body = ctx.request.body;
    // 校验参数
    const errorMsg = this.validateParams(ctx.rule.loginRequest, body);
    if (errorMsg !== null) {
      return ctx.success({
        code: this.PAPRAMS_ERROR_CODE,
        message: errorMsg,
      });
    }
    // 登录校验
    const data = await ctx.service.loginSvc.loginCheck(body);
    let code;
    if (data.errcode === 1) {
      code = this.STATUS_CODE.ERROR.USER.FORBIDDEN.code;
    } else if (data.errcode === 2) {
      code = this.STATUS_CODE.ERROR.USER.NAME_PASS_ERR.code;
    } else if (data.errcode === 3) {
      code = this.STATUS_CODE.ERROR.COMMON.IMG_CODE_EXPIRED.code;
    } else if (data.errcode === 4) {
      code = this.STATUS_CODE.ERROR.COMMON.IMG_CODE_NO_MATCH.code;
    }
    if (code) {
      return ctx.success({ code });
    }
    const token = app.jwt.sign({
      id: data.id,
      isSuper: data.isSuper,
      username: data.username, // 需要存储的 token 数据
      nickName: data.nickName,
    }, app.config.jwt.secret, { expiresIn: app.config.jwt.expire });
    // await this.app.redis.set(`user_info_${data.id}`, JSON.stringify(data), 'EX', app.config.jwt.expire);
    return ctx.success({
      code: this.okCode,
      data:
      {
        token,
        username: data.username,
        nickName: data.nickName,
        face: data.face,
        isSuper: data.isSuper,
      },
    });
  }

  /**
  * @summary 用户个人信息
  * @description 用户个人信息
  * @jwt jwt jwt
  * @router get /api/auth/info
  * @response 200 singleUserResponse 查询成功
  */
  async getUser() {
    const { ctx } = this;
    const id = ctx.user.id;
    // 校验参数
    if (!id) {
      return ctx.success({
        code: this.PAPRAMS_ERROR_CODE,
        message: '请确保已经登录',
      });
    }
    const res = await ctx.service.userSvc.getUser(id);
    return ctx.success({
      code: this.okCode,
      data: res,
    });
  }

  async editUser() {
    const { ctx } = this;
    const clientData = ctx.request.body;
    const data = await ctx.service.userSvc.updateSingleUser(clientData);
    const ERROR = this.STATUS_CODE.ERROR;
    const { errcode } = data
    let code = this.okCode;
    if (errcode) {
      switch (errcode) {
        case 1:
          code = ERROR.AUTHENTICATION.NEED_TOKEN.code;
          break;
        case 2:
          code = ERROR.USER.FORBIDDEN.code;
          break;
        case 3:
          code = ERROR.USER.NOT_EXISTS.code;
          break;
        case 4:
          code = ERROR.USER.PASS_BF_ERR.code;
          break;
        case 5:
          code = ERROR.USER.NAME_PASS_ERR.code;
          break;
        case 6:
          code = ERROR.COMMON.EMAIL_CODE_NEED.code;
          break;
        case 7:
          code = ERROR.COMMON.EMAIL_CODE_EXPIRED.code;
          break;
        case 8:
          code = ERROR.COMMON.EMAIL_CODE_NO_MATCH.code;
          break;
        default:
          break;
      }
    }
    return ctx.success({
      code,
    });
  }
}

module.exports = LoginController;
