'use strict';
const { nanoid, customAlphabet } = require('nanoid');
const { format } = require('util');

module.exports = {
  /**
   * 生成id
   * @param {*} prefix 前缀
   * @param {*} length 长度
   */
  generateId(prefix, length = 10) {
    prefix = prefix.toString();
    const prefixLength = prefix.length;
    return format('%s%s', prefix, nanoid(length - prefixLength));
  },
  /**
   * 生成自定义范围的id
   * @param {*} length id 长度
  * @param {*} customLetters 自定义id范围
   */
  generateCustomId(length, customLetters) {
    length = length || 10;
    customLetters = customLetters || '0123456789';
    const nanoid = customAlphabet(customLetters, length)
    return format('%s', nanoid());
  },
}
