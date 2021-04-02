<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <crudOperation :permission="permission" />
    </div>
    <!--表单渲染-->
    <el-dialog append-to-body :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="580px">
      <el-form ref="form" :inline="true" :model="form" :rules="rules" size="small" label-width="80px">
        <el-form-item label="菜单类型" prop="menuType">
          <el-radio-group v-model="form.menuType" size="mini" style="width: 178px">
            <el-radio-button :label="0">目录</el-radio-button>
            <el-radio-button :label="1">菜单</el-radio-button>
            <el-radio-button :label="2">按钮</el-radio-button>
          </el-radio-group>

        </el-form-item>
        <el-form-item v-show="form.menuType.toString() !== '2'" label="菜单图标" prop="icon">
          <el-popover
            placement="bottom-start"
            width="450"
            trigger="click"
            @show="$refs['iconSelect'].reset()"
          >
            <IconSelect ref="iconSelect" @selected="selected" />
            <el-input slot="reference" v-model="form.icon" style="width: 450px;" placeholder="点击选择图标" readonly>
              <svg-icon v-if="form.icon" slot="prefix" :icon-class="form.icon" class="el-input__icon" style="height: 32px;width: 16px;" />
              <i v-else slot="prefix" class="el-icon-search el-input__icon" />
            </el-input>
          </el-popover>
        </el-form-item>
        <el-form-item v-show="form.menuType.toString() !== '2'" label="菜单可见" prop="hidden">
          <el-radio-group v-model="form.hidden" size="mini">
            <el-radio-button :label="false">是</el-radio-button>
            <el-radio-button :label="true">否</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="form.menuType.toString() !== '2'" label="菜单标题" prop="title">
          <el-input v-model="form.title" :style=" form.menuType.toString() === '0' ? 'width: 450px' : 'width: 178px'" placeholder="菜单标题" />
        </el-form-item>
        <el-form-item v-if="form.menuType.toString() === '2'" label="按钮名称" prop="title">
          <el-input v-model="form.title" placeholder="按钮名称" style="width: 178px;" />
        </el-form-item>
        <el-form-item v-show="form.menuType.toString() === '2'" label="api地址" prop="permission">
          <el-input v-model="form.permission" placeholder="api地址" style="width: 178px;" />
        </el-form-item>
        <el-form-item v-if="form.menuType.toString() === '2'" label="访问方式" prop="operateType">
          <el-select v-model="form.operateType" placeholder="请选择访问方式" style="width: 178px;">
            <el-option label="*" value="*" />
            <el-option label="GET" value="GET" />
            <el-option label="POST" value="POST" />
            <el-option label="PUT" value="PUT" />
            <el-option label="DELETE" value="DELETE" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.menuType.toString() !== '2'" label="路由地址" prop="path">
          <el-input v-model="form.path" placeholder="路由地址" style="width: 178px;" />
        </el-form-item>
        <el-form-item label="菜单排序" prop="sort">
          <el-input-number v-model.number="form.sort" :min="0" :max="999" controls-position="right" style="width: 178px;" />
        </el-form-item>
        <el-form-item v-show="form.menuType.toString() === '1'" label="组件名称" prop="name">
          <el-input v-model="form.name" style="width: 178px;" placeholder="匹配组件内Name字段" />
        </el-form-item>
        <el-form-item v-show=" form.menuType.toString() === '1'" label="组件路径" prop="component">
          <el-input v-model="form.component" style="width: 178px;" placeholder="组件路径" />
        </el-form-item>
        <el-form-item label="上级类目" prop="pid">
          <treeselect
            v-model="form.parentId"
            :options="menus"

            style="width: 450px;"
            placeholder="选择上级类目"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="crud.cancelCU">取消</el-button>
        <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
      </div>
    </el-dialog>
    <!--表格渲染-->
    <el-table
      ref="table"
      v-loading="crud.loading"
      tablename="menu"
      :data="crud.data"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      row-key="id"
      @select="crud.selectChange"
      @select-all="crud.selectAllChange"
      @selection-change="crud.selectionChangeHandler"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column :show-overflow-tooltip="true" label="菜单标题" width="145px" prop="title" />
      <el-table-column prop="icon" label="图标" align="center" width="60px">
        <template slot-scope="scope">
          <svg-icon :icon-class="scope.row.icon ? scope.row.icon : ''" />
        </template>
      </el-table-column>
      <el-table-column prop="sort" align="center" label="排序">
        <template slot-scope="scope">
          {{ scope.row.sort }}
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="permission" label="api地址" />
      <el-table-column :show-overflow-tooltip="true" prop="operateType" label="访问方式" />
      <el-table-column :show-overflow-tooltip="true" prop="component" label="组件路径" />
      <el-table-column prop="hidden" label="菜单可见" width="85px">
        <template slot-scope="scope">
          <span v-if="scope.row.hidden"><a-tag color="red">不可见</a-tag></span>
          <span v-else><a-tag color="green">可见</a-tag></span>
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="createdAt" width="155" label="创建日期">
        <template slot-scope="scope">{{ scope.row.createdAt | dateFormat('YYYY-MM-DD HH:mm:ss') }}</template>
      </el-table-column>
      <el-table-column v-if="checkPer(['ROLEc0zY5dW7LZK'])" label="操作" width="150px" align="center" fixed="right">
        <template slot-scope="scope">
          <udOperation
            :data="scope.row"
            :permission="permission"
            msg="确定删除吗,如果存在下级节点则一并删除，此操作不能撤销！"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import crudMenu from '@/api/system/menu'
import IconSelect from '@/components/IconSelect'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'

// crud交由presenter持有
const defaultForm = {
  id: null,
  title: null,
  sort: 999,
  path: null,
  component: null,
  name: null,
  parentId: '0',
  icon: null,
  hidden: true,
  menuType: 0,
  permission: null,
  operateType: '*'
}
export default {
  name: 'Menu',
  components: { Treeselect, IconSelect, crudOperation, udOperation },
  cruds() {
    return CRUD({
      title: '菜单',
      url: '/menu',
      crudMethod:
      { ...crudMenu }
    })
  },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  data() {
    return {
      menus: [],
      permission: {
        add: ['ROLEc0zY5dW7LZK', 'menu:add'],
        edit: ['ROLEc0zY5dW7LZK', 'menu:edit'],
        del: ['ROLEc0zY5dW7LZK', 'menu:del']
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        path: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 新增与编辑前做的操作
    [CRUD.HOOK.afterToCU](crud, form) {
      console.log('form', form)
      this.menus = []
      if (form.id != null) {
        if (form.parentId === null) {
          form.parentId = 0
        }
      }
      this.getSupDepts()
    },
    getMenus(tree, treeNode, resolve) {
      const params = { pid: tree.id }
      setTimeout(() => {
        crudMenu.getMenus(params).then(res => {
          resolve(res.content)
        })
      }, 100)
    },
    getSupDepts() {
      crudMenu.getMenusTree().then(res => {
        const data = res.data
        const fn = (data) => {
          for (const item of data) {
            item.label = item.title
            if (item.children && item.children.length > 0) {
              fn(item.children)
            } else if (item.children && item.children.length === 0) {
              delete item.children
            }
          }
        }
        fn(data)
        this.menus = [{ id: '0', label: '顶级类目', children: data }]
      })
    },
    // 选中图标
    selected(name) {
      this.form.icon = name
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 ::v-deep .el-input-number .el-input__inner {
    text-align: left;
  }
 ::v-deep .vue-treeselect__control,::v-deep .vue-treeselect__placeholder,::v-deep .vue-treeselect__single-value {
    height: 30px;
    line-height: 30px;
  }
</style>
