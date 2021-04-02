'use strict';

const moment = require('moment');

module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      const startTime = moment().valueOf();
      await next();
      // 请求日志
      const endTime = moment().valueOf();
      const time = endTime - startTime;
      const req = ctx.request;
      const requestBody = { body: req.body, query: ctx.query };
      const operator = (ctx.user ? ctx.user.username : '') || ctx.state.accessKey;
      const responseBody = ctx.body;
      const data = {
        operator,
        path: req.url,
        method: req.method,
        ip: req.ip,
        request_header: req.headers,
        request_body: requestBody,
        response_header: ctx.response.headers,
        response_body: responseBody,
        duration: time,
      };
      ctx.logger.info(JSON.stringify(data));

    } catch (err) {
      console.error(err);
      ctx.app.emit('error', err, ctx);
      const status = err.status || 500;
      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      err.msg = status === 500 && ctx.app.config.env === 'prod'
        ? 'Internal Server Error'
        : JSON.stringify(err);
      ctx.success({ message: err.msg })
    }
  };
};
