<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <el-input v-model="query.blurry" size="small" clearable placeholder="输入名称或者描述搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <date-range-picker v-model="query.createTime" class="date-item" />
        <rrOperation />
      </div>
      <crudOperation :permission="permission" />
    </div>
    <!-- 表单渲染 -->
    <el-dialog append-to-body :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="520px">
      <el-form ref="form" :inline="true" :model="form" :rules="rules" size="small" label-width="80px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name" style="width: 380px;" />
        </el-form-item>
        <el-form-item label="角色级别" prop="level">
          <el-input-number v-model.number="form.level" :min="0" controls-position="right" style="width: 145px;" />
        </el-form-item>
        <el-form-item label="描述信息" prop="description">
          <el-input v-model="form.description" style="width: 380px;" rows="5" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="crud.cancelCU">取消</el-button>
        <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
      </div>
    </el-dialog>
    <el-row :gutter="15">
      <!--角色管理-->
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="17" style="margin-bottom: 10px">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span class="role-span">角色列表</span>
          </div>
          <el-table ref="table" v-loading="crud.loading" highlight-current-row style="width: 100%;" :data="crud.data" @selection-change="crud.selectionChangeHandler" @current-change="handleCurrentChange">
            <el-table-column :selectable="checkboxT" type="selection" width="55" />
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="level" label="角色级别" />
            <el-table-column :show-overflow-tooltip="true" prop="description" label="描述" />
            <el-table-column :show-overflow-tooltip="true" prop="createdAt" width="155" label="创建日期">
              <template slot-scope="scope">{{ scope.row.createdAt | dateFormat('YYYY-MM-DD HH:mm:ss') }}</template>
            </el-table-column>
            <el-table-column v-if="checkPer(['ROLEc0zY5dW7LZK'])" label="操作" width="130px" align="center" fixed="right">
              <template slot-scope="scope">
                <udOperation
                  v-if="scope.row.level >= level"
                  :data="scope.row"
                  :permission="permission"
                />
              </template>
            </el-table-column>
          </el-table>
          <!--分页组件-->
          <pagination />
        </el-card>
      </el-col>
      <!-- 菜单授权 -->
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="7">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <el-tooltip class="item" effect="dark" content="选择指定角色分配菜单" placement="top">
              <span class="role-span">菜单分配</span>
            </el-tooltip>
            <el-button
              v-permission="['ROLEc0zY5dW7LZK']"
              :disabled="!showButton"
              :loading="menuLoading"
              icon="el-icon-check"
              size="mini"
              style="float: right; padding: 6px 9px"
              type="primary"
              @click="saveMenu"
            >保存</el-button>
          </div>
          <el-tree
            ref="menu"
            :data="menus"
            :default-checked-keys="menuIds"
            :props="defaultProps"
            accordion
            show-checkbox
            check-strictly
            node-key="id"
            @check="menuChange"
          />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import crudRoles from '@/api/system/role'
import { getMenusTree } from '@/api/system/menu'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
import DateRangePicker from '@/components/DateRangePicker'

const defaultForm = {
  id: null,
  name: null,
  description: null,
  level: 1
}
export default {
  name: 'Role',
  components: {
    pagination,
    crudOperation,
    rrOperation,
    udOperation,
    DateRangePicker
  },
  cruds() {
    return CRUD({ title: '角色', url: '/role', sort: 'level,asc', crudMethod: { ...crudRoles }})
  },
  mixins: [
    presenter(),
    header(),
    form(defaultForm),
    crud()
  ],
  data() {
    return {
      defaultProps: { children: 'children', label: 'title' },
      level: 3,
      currentId: 0, menuLoading: false, showButton: false,
      menus: [],
      menuIds: [], // 多选时使用
      permission: {
        add: ['ROLEc0zY5dW7LZK'],
        edit: ['ROLEc0zY5dW7LZK'],
        del: ['ROLEc0zY5dW7LZK']
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        permission: [
          { required: true, message: '请输入权限', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.level = this.$store.getters.roleLevel
    this.getMenuDatas()
  },
  methods: {
    async getMenuDatas() {
      const data = await getMenusTree()
      this.menus = data.data
    },
    [CRUD.HOOK.afterRefresh]() {
      this.$refs.menu.setCheckedNodes([])
    },
    // 新增前初始化
    [CRUD.HOOK.beforeToAdd](crud, form) {
      form.menus = null
    },
    // 提交前做的操作
    [CRUD.HOOK.afterValidateCU](crud) {
      // if (crud.form.dataScope === '自定义' && this.deptDatas.length === 0) {
      //   this.$message({
      //     message: '自定义数据权限不能为空',
      //     type: 'warning'
      //   })
      //   return false
      // } else if (crud.form.dataScope === '自定义') {
      //   const depts = []
      //   this.deptDatas.forEach(function(data) {
      //     const dept = { id: data }
      //     depts.push(dept)
      //   })
      //   crud.form.depts = depts
      // } else {
      //   crud.form.depts = []
      // }
      return true
    },
    // 触发单选
    async handleCurrentChange(val) {
      if (val) {
        console.log(val)
        const _this = this
        // 清空菜单的选中
        this.$refs.menu.setCheckedNodes([])
        // 保存当前的角色id
        this.currentId = val.id
        // 初始化默认选中的key
        this.menuIds = []
        this.menuNodes = val.menus
        val.menus.forEach(function(data) {
          _this.menuIds.push(data.id)
        })
        this.showButton = true
      }
    },
    menuChange(menu, treeStatus) {
      console.log(menu)
      console.log(treeStatus)
      const selected = treeStatus.checkedKeys.indexOf(menu.id)
      console.log('selected', selected)
      if (selected !== -1) {
        // 子节点只要被选中父节点就被选中(需要选中父节点时候调用此方法)
        // 统一处理子节点为相同的勾选状态
        this.uniteChildSame(menu, true)
      } else {
        // 未选中 处理子节点全部未选中
        if (menu.children.length !== 0) {
          this.uniteChildSame(menu, false)
        }
      }
      this.menuIds = this.$refs.menu.getCheckedKeys()
      this.menuNodes = this.$refs.menu.getCheckedNodes()
      console.log('888', this.menuNodes)
    },
    uniteChildSame (treeList, isSelected) {
      this.$refs.menu.setChecked(treeList.id, isSelected)
      for (let i = 0; i < treeList.children.length; i++) {
        this.uniteChildSame(treeList.children[i], isSelected)
      }
    },
    // 保存菜单
    saveMenu() {
      this.menuLoading = true
      const role = { id: this.currentId, menus: [] }
      // 得到已选中的 key 值
      this.menuNodes.forEach(function(menuNode) {
        const { id, menuType, operateType, permission } = menuNode
        const menu = { id, menuType, operateType, permission }
        role.menus.push(menu)
      })
      console.log(role)
      crudRoles.editMenu(role).then(() => {
        this.crud.notify('保存成功', CRUD.NOTIFICATION_TYPE.SUCCESS)
        this.menuLoading = false
        this.update()
      }).catch(err => {
        this.menuLoading = false
        console.log(err.response.data.message)
      })
    },
    // 改变数据
    update() {
      // 无刷新更新 表格数据
      crudRoles.get(this.currentId).then(res => {
        res = res.data
        for (let i = 0; i < this.crud.data.length; i++) {
          if (res.id === this.crud.data[i].id) {
            this.crud.data[i] = res
            break
          }
        }
      })
    },
    checkboxT(row) {
      return row.level >= this.level
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .role-span {
    font-weight: bold;color: #303133;
    font-size: 15px;
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
 ::v-deep .el-input-number .el-input__inner {
    text-align: left;
  }
 ::v-deep .vue-treeselect__multi-value{
    margin-bottom: 0;
  }
 ::v-deep .vue-treeselect__multi-value-item{
    border: 0;
    padding: 0;
  }
</style>
