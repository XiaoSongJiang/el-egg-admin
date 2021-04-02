'use strict';

module.exports = () => {
  return async function authentication(ctx, next) {
    const { request: req, app } = ctx;
    const { config } = app;
    const path = req.url;
    const STATUS_CODE = ctx.app.constant.statusCode.STATUS_CODE;
    // 校验token
    let token = null;
    if (
      ctx.headers.authorization &&
      ctx.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      token = ctx.headers.authorization.split(' ')[1];
    } else if (ctx.query && ctx.query.token) {
      token = ctx.query.token;
    } else if (req.body && req.body.authorization) {
      token = ctx.body.token;
    }

    if (config.ignoreJwtPath.findIndex(item => path.startsWith(item)) > -1) {
      await next();
    } else {
      if (token) {
        try {
          const decoded = app.jwt.verify(token, config.jwt.secret);
          ctx.user = decoded;
          await next();
        } catch (err) {
          // err
          const { message } = err;
          if (message === 'jwt expired') {
            return ctx.success({
              code: STATUS_CODE.ERROR.AUTHENTICATION.TOKEN_EXPIRE.code,
            });
          } else if (message === 'invalid signature') {
            return ctx.success({
              code: STATUS_CODE.ERROR.AUTHENTICATION.BAD_TOKEN.code,
            });
          }
        }
      } else {
        ctx.success({
          code: STATUS_CODE.ERROR.AUTHENTICATION.NEED_TOKEN.code,
        });
      }
    }

  };
};
