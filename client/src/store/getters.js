const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  user: state => state.user.user,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userId: state => state.user.id,
  roles: state => state.user.roles,
  roleLevel: state => state.user.level,
  permissionRouters: state => state.permission.routers,
  permissionAddRouters: state => state.permission.addRouters,
  updateAvatarApi: state => state.api.updateAvatarApi
}
export default getters
