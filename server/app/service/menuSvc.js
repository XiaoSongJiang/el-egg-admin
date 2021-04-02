
'use strict';

const BaseServiceService = require('../core/baseService');

class MenuService extends BaseServiceService {

  constructor(ctx) {
    super(ctx);
    this.model = this.ctx.model.Menu;
  }

  async addMenu(menu) {

    const parentMenu = await this.model.findOne({
      where: {
        id: menu.parentId || '',
      },
      raw: true,
    });
    if (!parentMenu) {
      menu.parentId = 0;
    }
    if (!menu.operateType) {
      menu.operateType = '*';
    }
    const res = await this.model.create(menu).then(d => d.toJSON());
    return res;
  }

  async updateMenu(menu) {
    const { id: uid } = menu;
    const parentMenu = await this.model.findOne({ where: { id: menu.parentId }, raw: true });
    if (menu.parentId && parentMenu) {
      menu.parentId = parentMenu.id;
    } else {
      menu.parentId = '0'
    }
    await this.model.update(menu, {
      where: {
        id: uid,
      },
      individualHooks: true,
    });
    return true
  }

  async deleteMenu(clientData) {
    const { ids } = clientData;
    console.log('clientData', clientData);
    const { ctx } = this;
    // 获取菜单的所有子菜单
    const menus = await this.model.findAll({ raw: true });
    let allIds = [];
    for (const mUid of ids) {
      const tree = ctx.helper.createTree(menus, mUid, 'id', 'parentId');
      const mUids = [mUid];
      const getAllIds = params => {
        for (const item of params) {
          if (item.children) {
            mUids.push(item.id);
            getAllIds(item.children);
          }
        }
      };
      getAllIds(tree);
      allIds = [...allIds, ...mUids]
    }
    allIds = [...allIds, ...ids];
    await Promise.all([
      this.ctx.model.RoleMenu.destroy({
        where: {
          mId: allIds,
        },
      }),
      this.model.destroy({
        where: {
          id: allIds,
        },
      }),
    ]);
    return true
  }

  async menuBuild() {
    const { ctx } = this;
    const userUid = ctx.user.id;
    let allMenu;
    // 获取当前用户所有角色
    const allUserRoles = await ctx.service.rbacSvc.getRolesByUid(userUid);
    const isSuper = allUserRoles.findIndex(item => item.level === 0);
    if (isSuper > -1) {
      allMenu = await ctx.model.Menu.findAll({
        where: {
          hidden: false,
        },
        order: [['createdAt', 'ASC']],
      });
    } else {
      const roleIds = allUserRoles.map(item => item.id) || [];
      allMenu = await ctx.model.Menu.findAll({
        where: {
          hidden: false,
        },
        include: [
          {
            model: this.app.model.Role,
            where: {
              id: roleIds,
            },
            attributes: [],
          },
        ],
        order: [['createdAt', 'ASC']],
      });
    }
    allMenu = allMenu.map(menu => menu.toJSON())
    if (allMenu && allMenu.length === 0) {
      return allMenu;
    }
    allMenu = allMenu.map(menu => {
      if (menu.menuType === 0) {
        menu.component = 'Layout';
      }
      return menu;
    });
    const tree = ctx.helper.createTree(allMenu, '0', 'id', 'parentId');
    return tree;
  }

  async menuTree() {
    const { ctx } = this;
    const allMenu = await ctx.model.Menu.findAll({ raw: true, order: [['createdAt', 'ASC']] });
    if (allMenu && allMenu.length === 0) {
      return allMenu;
    }
    const tree = ctx.helper.createTree(allMenu, '0', 'id', 'parentId');
    return tree;
  }
}
module.exports = MenuService;
