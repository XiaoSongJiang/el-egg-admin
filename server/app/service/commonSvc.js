'use strict';

const Service = require('egg').Service;
const svgCaptcha = require('svg-captcha');
const nodemailer = require('nodemailer');

class CommonService extends Service {

  /**
   * 生成验证码
   * @param {*} type 字符和数字类型
   */
  async generateCaptcha(type = 'math') {
    let captcha = {};
    let codeConfig = {};
    if (type === 'math') {
      codeConfig = {
        noise: 2,
        color: true,
        background: 'white',
        mathMin: 1,
        mathMax: 9,
        mathOperator: '+-',
      };
      captcha = svgCaptcha.createMathExpr(codeConfig);
    } else if (type === 'math') {
      codeConfig = {
        size: 5, // 验证码长度
        ignoreChars: '0o1i', // 验证码字符中排除 0o1i
        noise: 2, // 干扰线条的数量
        height: 44,
      };
      captcha = svgCaptcha.create(codeConfig);
    }
    return captcha;
  }
  async sendEmail(params) {
    const { config } = this;
    const {
      email: to,
      subject,
      content,
    } = params;
    const email = config.email;

    const mailOptions = {
      from: `<${email.user}>`,
      to,
      subject,
      html: content,
    };
    const transport = nodemailer.createTransport({
      service: email.service,
      auth: {
        user: email.user,
        pass: email.password,
      },
      secureConnection: true,
      port: email.port,
    });

    const sendMail = () => {
      return new Promise((resolve, reject) => {
        transport.sendMail(mailOptions, (error, info) => {
          if (error) {
            reject(error);
          } else {
            resolve(info);
          }
        });
      });
    };

    const res = await sendMail();
    console.log('res', res);
    if (res && res.accepted.length) {
      return true;
    }
    return false;

  }
}
module.exports = CommonService;
