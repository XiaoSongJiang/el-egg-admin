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
              placeholder="输入配置字段或者配置说明"
              style="width: 200px;"
              class="filter-item"
              @keyup.enter.native="crud.toQuery"
            />
            <rrOperation />
          </div>
          <crudOperation show="" :permission="permission" />
        </div>
        <!--表单渲染-->
        <el-dialog
          append-to-body
          :close-on-click-modal="false"
          :before-close="crud.cancelCU"
          :visible.sync="crud.status.cu > 0"
          :title="crud.status.title"
          width="570px"
        >
          <el-form
            ref="form"
            :inline="false"
            :model="form"
            :rules="rules"
            size="medium"
            label-width="76px"
          >
            <el-form-item label="配置说明" prop="remark">
              <el-input v-model="form.remark" type="textarea" :rows="2" />
            </el-form-item>
            <el-form-item label="配置值" prop="value">
              <el-input v-model="form.value" type="textarea" :rows="2" />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="text" @click="crud.cancelCU">取消</el-button>
            <el-button
              :loading="crud.status.cu === 2"
              type="primary"
              @click="crud.submitCU"
            >确认</el-button>
          </div>
        </el-dialog>
        <!--表格渲染-->
        <el-table
          ref="table"
          v-loading="crud.loading"
          tablename="assist"
          :data="crud.data"
          style="width: 100%"
          @selection-change="crud.selectionChangeHandler"
        >
          <el-table-column
            :selectable="checkboxT"
            type="selection"
            width="55"
          />
          <el-table-column
            :show-overflow-tooltip="true"
            prop="name"
            label="配置字段"
            width="165"
          />
          <el-table-column
            :show-overflow-tooltip="true"
            prop="remark"
            label="配置说明"
            width="200"
          />
          <el-table-column
            :show-overflow-tooltip="true"
            prop="value"
            width="180"
            label="配置值"
          />
          <el-table-column
            :show-overflow-tooltip="true"
            prop="updatedAt"
            width="170"
            label="创建日期"
          >
            <template slot-scope="scope">{{
              scope.row.updatedAt | dateFormat("YYYY-MM-DD HH:mm:ss")
            }}</template>
          </el-table-column>
          <el-table-column
            v-if="checkPer(['ROLEc0zY5dW7LZK'])"
            label="操作"
            width="200"
            align="center"
            fixed="right"
          >
            <template slot-scope="scope">
              <udOperation
                :data="scope.row"
                :permission="permission"
                :disabled-dle="true"
              />

            </template>
          </el-table-column>
        </el-table>
        <!--分页组件-->
        <!-- <pagination /> -->
        <!-- 详情 -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import crudConfig from '@/api/system/config'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import udOperation from '@crud/UD.operation'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'

import { mapGetters } from 'vuex'

const defaultForm = {
  id: null,
  remark: '',
  value: ''
}
export default {
  name: 'Config',
  components: {
    udOperation,
    rrOperation,
    crudOperation
  },
  cruds() {
    return CRUD({
      title: '系统配置',
      url: '/system/config',
      crudMethod: {
        ...crudConfig
      },
      optShow: {
        add: false,
        edit: true,
        del: false,
        download: false,
        reset: true
      }
    })
  },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  data() {
    // 自定义验证
    // const validPhone = (rule, value, callback) => {

    // }
    return {
      height: document.documentElement.clientHeight - 180 + 'px;',
      permission: {
        add: ['ROLEc0zY5dW7LZK'],
        edit: ['ROLEc0zY5dW7LZK'],
        del: ['ROLEc0zY5dW7LZK']
      },
      rules: {}
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  created() {},
  mounted: function () {
    const that = this
    window.onresize = function temp() {
      that.height = document.documentElement.clientHeight - 180 + 'px;'
    }
  },
  methods: {
    // 新增与编辑前做的操作
    [CRUD.HOOK.afterToCU](crud, form) {},
    // 新增前将多选的值设置为空
    [CRUD.HOOK.beforeToAdd](crud, form) {

    },
    // 初始化编辑时候的角色
    [CRUD.HOOK.beforeToEdit](crud, form) {

    },
    // 提交前做的操作
    [CRUD.HOOK.afterValidateCU](crud) {

    },
    // 改变状态
    changeEnabled(data, val) {

    },
    checkboxT(row, rowIndex) {
      return (
        row.id === this.userId ||
        this.checkPer(['ROLEc0zY5dW7LZK'])
      )
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
::v-deep .vue-treeselect__control,
::v-deep .vue-treeselect__placeholder,
::v-deep .vue-treeselect__single-value {
  height: 30px;
  line-height: 30px;
}
</style>
