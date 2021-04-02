'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
const fs = require('fs');
const path = require('path');
function getFilePathsSync(startPath) {
  const result = [];

  function finder(root) {
    const files = fs.readdirSync(root);

    files.forEach(val => {
      const fPath = path.resolve(root, val);

      const stats = fs.statSync(fPath);

      if (stats.isDirectory()) finder(fPath);

      if (stats.isFile()) result.push(fPath);
    });
  }
  finder(startPath);
  return result;
}
module.exports = app => {
  const routpath = path.resolve(__dirname, './route');
  const routeFiles = getFilePathsSync(routpath);
  for (const routeFile of routeFiles) {
    require(routeFile)(app);
  }
};
