'use strict';
/**
 * 响应码说明，需要修改两处
 */
exports.STATUS_CODE = {
  SUCCESS: {
    COMMON: {
      OK: {
        code: 20000,
        msg: '成功',
      },
    },
  },
  ERROR: {
    // 用户认证 登录 40000 - 40109
    AUTHENTICATION: {
      SIGN: {
        code: 40001,
        msg: '签名校验失败',
      },
      NEED_TOKEN: {
        code: 40002,
        msg: '需要token',
      },
      TOKEN_EXPIRE: {
        code: 40003,
        msg: '过期的token',
      },
      BAD_TOKEN: {
        code: 40005,
        msg: '无效的token',
      },
      API_NOT_FOUND: {
        code: 40004,
        msg: '接口不存在',
      },
    },
    AUTHZ: {
      PERMISSION: {
        code: 40030,
        msg: '未授权',
      },
    },
    // 公共 40110 - 40400
    COMMON: {
      PAPRAMS_VALIDATE_ERROR: {
        code: 40115,
        msg: '参数校验不通过',
      },
      CAPTCHA_GENERATE: {
        code: 40116,
        msg: '验证码生成失败',
      },
      EMAIL_SEND: {
        code: 40117,
        msg: '邮件发送失败',
      },
      EMAIL_CODE_NEED: {
        code: 40118,
        msg: '邮件验证码不能为空',
      },
      EMAIL_CODE_NO_MATCH: {
        code: 40119,
        msg: '邮件验证码不匹配',
      },
      EMAIL_CODE_EXPIRED: {
        code: 40120,
        msg: '邮件验证码已过期',
      },
      IMG_CODE_NEED: {
        code: 40121,
        msg: '图片验证码不能为空',
      },
      IMG_CODE_NO_MATCH: {
        code: 40122,
        msg: '图片验证码不匹配',
      },
      IMG_CODE_EXPIRED: {
        code: 40123,
        msg: '图片验证码已过期',
      },
    },
    USER: {
      FORBIDDEN: {
        code: 40301,
        msg: '用户被禁用',
      },
      NOT_EXISTS: {
        code: 40302,
        msg: '用户不存在',
      },
      NAME_PASS_ERR: {
        code: 40303,
        msg: '用户名或密码错误',
      },
      PASS_BF_ERR: {
        code: 40304,
        msg: '前后密码不一致',
      },
    },
    ROLE: {
      USER_EXISTS: {
        code: 40401,
        msg: '当前角色被用户使用',
      },
      SUPER_DELETE: {
        code: 40402,
        msg: '超级管理员角色禁止删除',
      },
    },
  },
  INTERNAL: {
    RES: {
      code: 50000,
      msg: '请求异常',
    },
  },
};
exports.CODE_MSG_MAP = {
  20000: '成功',

  40001: '签名校验失败',
  40002: '需要token',
  40003: '过期的token',
  40004: '接口不存在',
  40005: '无效的token',

  40030: '未授权',

  40115: '参数校验不通过',
  40116: '验证码生成失败',
  40117: '邮件发送失败',
  40118: '邮件验证码不能为空',
  40119: '邮件验证码不匹配',
  40120: '邮件验证码已过期',
  40121: '图片验证码不能为空',
  40122: '图片验证码不匹配',
  40123: '图片验证码已过期',

  40301: '用户被禁用',
  40302: '用户不存在',
  40303: '用户名或密码错误',
  40304: '前后密码不一致',

  40401: '当前角色被用户使用',
  40402: '超级管理员角色禁止删除',

  50000: '请求异常',
}

