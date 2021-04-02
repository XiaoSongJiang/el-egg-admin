'use strict';

const Controller = require('egg').Controller;
const moment = require('moment');
const crypto = require('crypto');
const qs = require('qs')

class BaseController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.STATUS_CODE = this.app.constant.statusCode.STATUS_CODE;
    this.okCode = this.STATUS_CODE.SUCCESS.COMMON.OK.code;
    this.PAPRAMS_ERROR_CODE = this.STATUS_CODE.ERROR.COMMON.PAPRAMS_VALIDATE_ERROR.code;
  }
  validateParams(rule, params) {
    const { ctx } = this;
    const errors = ctx.validate(rule, params);
    if (errors) {
      const field = errors[0].field;
      return `'${field}' ${errors[0].message}`;
    }
    return null;
  }
}

module.exports = BaseController;
