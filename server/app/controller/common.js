'use strict';

const BaseController = require('../core/baseController');
/**
 * @controller common
 */
class CommonController extends BaseController {
  /**
 * @summary 生成验证码
 * @description 生成验证码
 * @router get /api/captcha
 * @response 200 generateCodeResponse 成功
 */
  async getCaptcha() {
    const { ctx } = this;
    const code = await ctx.service.commonSvc.generateCaptcha();
    // 存入redis
    const codeKey = ctx.helper.generateId('captcha-key-', 22);
    const res = await this.app.redis.set(codeKey, code.text, 'EX', '120');
    if (res === 'OK') {
      return ctx.success({
        code: this.okCode,
        data:
        {
          img: code.data,
          captchaKey: codeKey,
        },
      });
    }
    return ctx.success({
      code: this.STATUS_CODE.ERROR.COMMON.CAPTCHA_GENERATE.code,
    });
  }
  /**
  * @summary 发邮件验证码
  * @description 发邮件验证码
  * @jwt jwt jwt
  * @router post /api/email_code
  * @request body sendEmailRequest *body
  * @response 200 sendEmailResponse 成功
  */
  async sendEmailCode() {
    const { ctx, app } = this;
    const body = ctx.request.body;
    const { email } = body;
    const content = ctx.helper.generateCustomId(6);
    body.content = content;
    body.subject = '邮箱验证码';
    body.content = `
      <div>
       <p>你好!</p>
       <p>
          你绑定的邮箱为：<a data-auto-link="1" href="mailto:${email}">${email}</a>。以下为绑定验证码：
        </p>
         <p style="word-wrap:break-word;word-break:break-all;color:blue">
            ${content}
         </p>
         <p>
             该验证码在15分钟内有效，15分钟后需要重新获取。
         </p>
         </div>
      `;

    const send = await ctx.service.commonSvc.sendEmail(body);
    console.log('send', send);
    if (send) {
      await this.app.redis.set(`mailbox_binding_${email}`, content, 'EX', app.config.email.expire);
      return ctx.success({
        code: this.okCode,
        message: '邮件发送成功',
      });
    }
    return ctx.success({
      code: this.STATUS_CODE.ERROR.COMMON.EMAIL_SEND.code,
    });

  }
}

module.exports = CommonController;
