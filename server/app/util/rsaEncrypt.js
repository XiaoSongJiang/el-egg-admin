'use strict';
const crypto = require('crypto');
/**
 * RSA最大加密明文大小
 */
const MAX_ENCRYPT_BLOCK = 117 - 31;

/**
 * RSA最大解密密文大小
 */
const MAX_DECRYPT_BLOCK = 128;

/**
 * 私钥加密 返回16进制
 * @param {*} data 字符串
 * @param {*} privateKey 私钥
 */
function privateEncrypt(data, privateKey) {
  // 经过base64编码的密文转成buf
  const buf = Buffer.from(data);
  // buf转byte数组
  const inputLen = buf.byteLength;
  // 密文
  const bufs = [];
  // 开始长度
  let offSet = 0;
  // 结束长度
  let endOffSet = MAX_ENCRYPT_BLOCK;
  // 分段加密
  while (inputLen - offSet > 0) {
    if (inputLen - offSet > MAX_ENCRYPT_BLOCK) {
      const bufTmp = buf.slice(offSet, endOffSet);
      bufs.push(crypto.privateEncrypt({ key: privateKey, padding: crypto.constants.RSA_PKCS1_PADDING }, bufTmp));
    } else {
      const bufTmp = buf.slice(offSet, inputLen);
      bufs.push(crypto.privateEncrypt({ key: privateKey, padding: crypto.constants.RSA_PKCS1_PADDING }, bufTmp));
    }
    offSet += MAX_ENCRYPT_BLOCK;
    endOffSet += MAX_ENCRYPT_BLOCK;
  }
  const result = Buffer.concat(bufs);
  // 密文hex编码
  const base64Str = result.toString('hex');
  return base64Str;
}
/**
 * 公钥解密
 * @param {*} data 16进制数据
 * @param {*} publicKey
 */
function publicDecrypt(data, publicKey) {

  // 经过hex编码的密文转成buf
  const buf = Buffer.from(data, 'hex');

  // buf转byte数组
  const inputLen = buf.byteLength;
  // 密文
  const bufs = [];
  // 开始长度
  let offSet = 0;
  // 结束长度
  let endOffSet = MAX_DECRYPT_BLOCK;
  // 分段加密
  while (inputLen - offSet > 0) {

    if (inputLen - offSet > MAX_DECRYPT_BLOCK) {
      const bufTmp = buf.slice(offSet, endOffSet);
      bufs.push(crypto.publicDecrypt({ key: publicKey, padding: crypto.constants.RSA_PKCS1_PADDING }, bufTmp));
    } else {
      const bufTmp = buf.slice(offSet, inputLen);
      bufs.push(crypto.publicDecrypt({ key: publicKey, padding: crypto.constants.RSA_PKCS1_PADDING }, bufTmp));
    }
    offSet += MAX_DECRYPT_BLOCK;
    endOffSet += MAX_DECRYPT_BLOCK;
  }
  const result = Buffer.concat(bufs);
  return result.toString('utf8');
}
/**
 * 公钥加密 返回 16进制 数据
 * @param {*} data 字符串
 * @param {*} publicKey 公钥
 */
function publicEncrypt(data, publicKey) {
  // 经过base64编码的密文转成buf
  const buf = Buffer.from(data);
  // buf转byte数组
  const inputLen = buf.byteLength;
  // 密文
  const bufs = [];
  // 开始长度
  let offSet = 0;
  // 结束长度
  let endOffSet = MAX_ENCRYPT_BLOCK;
  // 分段加密
  while (inputLen - offSet > 0) {
    if (inputLen - offSet > MAX_ENCRYPT_BLOCK) {
      const bufTmp = buf.slice(offSet, endOffSet);
      bufs.push(crypto.publicEncrypt({ key: publicKey, padding: crypto.constants.RSA_PKCS1_PADDING }, bufTmp));
    } else {
      const bufTmp = buf.slice(offSet, inputLen);
      bufs.push(crypto.publicEncrypt({ key: publicKey, padding: crypto.constants.RSA_PKCS1_PADDING }, bufTmp));
    }
    offSet += MAX_ENCRYPT_BLOCK;
    endOffSet += MAX_ENCRYPT_BLOCK;
  }
  const result = Buffer.concat(bufs);
  // 密文hex编码
  const base64Str = result.toString('hex');
  return base64Str;
}

/**
 * 私钥解密
 * @param {*} data 16进制 数据
 * @param {*} privateKey 私钥
 */
function privateDecrypt(data, privateKey) {

  // 经过base64编码的密文转成buf
  const buf = Buffer.from(data, 'hex');

  // buf转byte数组
  // var inputLen = bytes(buf, "base64");
  const inputLen = buf.byteLength;
  // 密文
  const bufs = [];
  // 开始长度
  let offSet = 0;
  // 结束长度
  let endOffSet = MAX_DECRYPT_BLOCK;
  // 分段加密
  while (inputLen - offSet > 0) {

    if (inputLen - offSet > MAX_DECRYPT_BLOCK) {
      const bufTmp = buf.slice(offSet, endOffSet);
      bufs.push(crypto.privateDecrypt({ key: privateKey, padding: crypto.constants.RSA_PKCS1_PADDING }, bufTmp));
    } else {
      const bufTmp = buf.slice(offSet, inputLen);
      bufs.push(crypto.privateDecrypt({ key: privateKey, padding: crypto.constants.RSA_PKCS1_PADDING }, bufTmp));
    }
    offSet += MAX_DECRYPT_BLOCK;
    endOffSet += MAX_DECRYPT_BLOCK;
  }
  const result = Buffer.concat(bufs);
  return result.toString('utf8');
}

module.exports = {
  privateEncrypt,
  publicDecrypt,
  publicEncrypt,
  privateDecrypt,
}
