import permission, { checkPer } from './permission'
const install = function (Vue) {
  Vue.directive('permission', permission)
  Vue.prototype.checkPer = checkPer
}

if (window.Vue) {
  window['permission'] = permission
  Vue.use(install); // eslint-disable-line
}

permission.install = install
export default permission
