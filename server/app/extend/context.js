'use strict';

module.exports = {
  /**
   * 参数校验
   * @param rules 校验规则
   * @param data  检验数据
   */
  validate(rules, data) {
    data = data || this.request.body;
    const errors = this.app.validator.validate(rules, data);
    if (errors) {
      this.app.logger.warn(errors);
      return errors
    }
  },

  success({ code, data, message }) {
    code = code || this.app.constant.statusCode.STATUS_CODE.INTERNAL.RES.code;
    message = message || this.app.constant.statusCode.CODE_MSG_MAP[code];
    this.body = { code, message, data };
    this.status = 200;
  },
};
