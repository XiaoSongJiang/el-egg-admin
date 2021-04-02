'use strict';

const idMaker = require('../util/idMaker');
const rsaEncrypt = require('../util/rsaEncrypt')


module.exports = {
  ...idMaker,
  ...rsaEncrypt,
  /**
   * 递归生成树状结构  createTree([], '0', 'id', 'parentId');
   * @param {*} originArr  数组
   * @param {*} pid 顶层id初始值
   * @param {*} indexId 标识唯一id 字段
   * @param {*} parentId 父级id 字段
   */
  createTree(originArr, pid, indexId, parentId) {
    const tree = [];
    for (let i = 0; i < originArr.length; i++) {
      const item = originArr[i];
      if (item[parentId] === pid) {
        item.children = this.createTree(originArr, item[indexId], indexId, parentId);
        tree.push(item);
      }
    }
    return tree;
  },
}
