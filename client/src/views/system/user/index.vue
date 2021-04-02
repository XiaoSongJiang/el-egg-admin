<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--用户数据-->
      <el-col :xs="15" :sm="18" :md="19" :lg="20" :xl="20">
        <!--工具栏-->
        <div class="head-container">
          <div v-if="crud.props.searchToggle">
            <!-- 搜索 -->
            <el-input
              v-model="query.blurry"
              clearable
              size="small"
              placeholder="输入名称或者邮箱搜索"
              style="width: 200px;"
              class="filter-item"
              @keyup.enter.native="crud.toQuery"
            />
            <date-range-picker v-model="query.createTime" class="date-item" />
            <el-select
              v-model="query.enabled"
              clearable
              size="small"
              placeholder="状态"
              class="filter-item"
              style="width: 90px"
              @change="crud.toQuery"
            >
              <el-option
                v-for="item in enabledTypeOptions"
                :key="item.key"
                :label="item.display_name"
                :value="item.key"
              />
            </el-select>
            <rrOperation />
          </div>
          <crudOperation show="" :permission="permission" />
        </div>
        <!--表单渲染-->
        <el-dialog append-to-body :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="570px">
          <el-form ref="form" :inline="true" :model="form" :rules="rules" size="small" label-width="66px">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="form.username" />
            </el-form-item>
            <el-form-item label="电话" prop="mobile">
              <el-input v-model.number="form.mobile" />
            </el-form-item>
            <el-form-item label="昵称" prop="nickName">
              <el-input v-model="form.nickName" />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email" />
            </el-form-item>
            <el-form-item label="状态">
              <el-radio-group v-model="form.enabled" :disabled="form.id === userId">
                <el-radio :label="'true'">激活</el-radio>
                <el-radio :label="'false'">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item style="margin-bottom: 0;" label="角色" prop="roles">
              <el-select
                v-model="roleDatas"
                style="width: 437px"
                multiple
                placeholder="请选择"
                @remove-tag="deleteTag"
                @change="changeRole"
              >
                <el-option
                  v-for="item in roles"
                  :key="item.name"
                  :disabled="level !== 0 && item.level < level"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="text" @click="crud.cancelCU">取消</el-button>
            <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
          </div>
        </el-dialog>
        <!--表格渲染-->
        <el-table ref="table" v-loading="crud.loading" :data="crud.data" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
          <el-table-column :selectable="checkboxT" type="selection" width="55" />
          <el-table-column :show-overflow-tooltip="true" prop="username" label="用户名" width="150" />
          <el-table-column :show-overflow-tooltip="true" prop="nickName" label="昵称" width="150" />
          <el-table-column :show-overflow-tooltip="true" prop="mobile" width="150" label="电话" />
          <el-table-column :show-overflow-tooltip="true" width="150" prop="email" label="邮箱" />
          <el-table-column label="状态" align="center" prop="enabled" width="80">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.enabled"
                :disabled="userId === scope.row.id || !checkPer(['ROLEc0zY5dW7LZK','PUT:/api/user'])"
                active-color="#409EFF"
                inactive-color="#F56C6C"
                @change="changeEnabled(scope.row, scope.row.enabled)"
              />
            </template>
          </el-table-column>
          <!-- <el-table-column :show-overflow-tooltip="true" prop="createdAt" width="155" label="创建日期">
            <template slot-scope="scope">{{ scope.row.createdAt | dateFormat('YYYY-MM-DD HH:mm:ss') }}</template>
          </el-table-column> -->
          <el-table-column :show-overflow-tooltip="true" prop="updatedAt" width="170" label="更新日期">
            <template slot-scope="scope">{{ scope.row.updatedAt | dateFormat('YYYY-MM-DD HH:mm:ss') }}</template>
          </el-table-column>
          <el-table-column
            v-if="checkPer(['ROLEc0zY5dW7LZK','PUT:/api/user','DELETE:/api/user'])"
            label="操作"
            width="200"
            align="center"
            fixed="right"
          >
            <template slot-scope="scope">
              <udOperation
                :data="scope.row"
                :permission="permission"
                :disabled-dle="scope.row.id === userId"
              />
            </template>
          </el-table-column>
        </el-table>
        <!--分页组件-->
        <pagination />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import crudUser from '@/api/system/user'
import { isvalidPhone } from '@/utils/validate'
import { getAll } from '@/api/system/role'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
import DateRangePicker from '@/components/DateRangePicker'
import { mapGetters } from 'vuex'
const defaultForm = {
  id: null,
  username: null,
  nickName: null,
  email: null,
  enabled: true,
  roles: [],
  mobile: null
}
export default {
  name: 'User',
  components: {
    crudOperation,
    rrOperation,
    udOperation,
    pagination,
    DateRangePicker
  },
  cruds() {
    return CRUD({
      title: '用户',
      url: '/user',
      crudMethod:
      {
        ...crudUser
      }})
  },
  mixins: [
    presenter(),
    header(),
    form(defaultForm),
    crud()
  ],
  data() {
    // 自定义验证
    const validPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入电话号码'))
      } else if (!isvalidPhone(value)) {
        callback(new Error('请输入正确的11位手机号码'))
      } else {
        callback()
      }
    }
    return {
      height: document.documentElement.clientHeight - 180 + 'px;',
      level: 3,
      roles: [],
      roleDatas: [], // 多选时使用
      permission: {
        add: ['ROLEc0zY5dW7LZK', 'POST:/api/user'],
        edit: ['ROLEc0zY5dW7LZK', 'PUT:/api/user'],
        del: ['ROLEc0zY5dW7LZK', 'DELETE:/api/user']
      },
      enabledTypeOptions: [
        { key: true, display_name: '激活' },
        { key: false, display_name: '锁定' }
      ],
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        nickName: [
          { required: true, message: '请输入用户昵称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        mobile: [
          { required: true, trigger: 'blur', validator: validPhone }
        ]
      },
      // 分配小助ak
      isShowAssist: false,
      assistUserId: '',
      assistAppsData: [], // 选中的
      assistAppList: [] // 所有未使用的
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  created() {
    this.crud.msg.add = '新增成功，默认密码：123456'
  },
  mounted: function() {
    const that = this
    window.onresize = function temp() {
      that.height = document.documentElement.clientHeight - 180 + 'px;'
    }
  },
  methods: {
    changeRole(value) {

    },
    deleteTag(value) {

    },
    // 新增与编辑前做的操作
    [CRUD.HOOK.afterToCU](crud, form) {
      this.getRoles()
      this.getRoleLevel()
      form.enabled = form.enabled.toString()
    },
    // 新增前将多选的值设置为空
    [CRUD.HOOK.beforeToAdd]() {
      this.roleDatas = []
    },
    // 初始化编辑时候的角色
    [CRUD.HOOK.beforeToEdit](crud, form) {
      this.roleDatas = []
      const _this = this
      form.roles.forEach(function(role, index) {
        _this.roleDatas.push(role.id)
      })
    },
    // 提交前做的操作
    [CRUD.HOOK.afterValidateCU](crud) {
      if (this.roleDatas.length === 0) {
        this.$message({
          message: '角色不能为空',
          type: 'warning'
        })
        return false
      }
      crud.form.roles = this.roleDatas
      crud.form.enabled = crud.form.enabled === 'true'
      crud.form.mobile = crud.form.mobile.toString()
      return true
    },
    // 改变状态
    changeEnabled(data, val) {
      const userStatus = {
        'false': '禁用',
        'true': '激活'
      }
      let rawRoles
      if (data && data.roles) {
        rawRoles = JSON.parse(JSON.stringify(data.roles))
        data.roles = data.roles.map(role => role.id)
      }
      this.$confirm('此操作将 "' + userStatus[val] + '" ' + data.username + ', 是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        crudUser.edit(data).then(res => {
          this.crud.notify(userStatus[val] + '成功', CRUD.NOTIFICATION_TYPE.SUCCESS)
        }).catch(() => {
          data.enabled = !data.enabled
        })
      }).catch(() => {
        data.enabled = !data.enabled
      }).finally(() => {
        data.roles = rawRoles
      })
    },
    // 获取弹窗内角色数据
    getRoles() {
      getAll().then(res => {
        this.roles = res.data
      }).catch(() => { })
    },
    // 获取权限级别
    getRoleLevel() {
      this.level = this.$store.getters.roleLevel
    },
    checkboxT(row, rowIndex) {
      return row.id === this.userId || this.checkPer(['ROLEc0zY5dW7LZK', 'PUT:/api/user'])
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  ::v-deep .vue-treeselect__control,::v-deep .vue-treeselect__placeholder,::v-deep .vue-treeselect__single-value {
    height: 30px;
    line-height: 30px;
  }
</style>
