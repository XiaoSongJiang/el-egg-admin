'use strict';
module.exports = () => {
  return async function notFoundHandler(ctx, next) {
    await next();
    if (ctx.status === 404 && !ctx.body) {
      return ctx.success({
        code: ctx.app.constant.statusCode.STATUS_CODE.ERROR.AUTHENTICATION.API_NOT_FOUND.code,
      });
    }
  };
};
