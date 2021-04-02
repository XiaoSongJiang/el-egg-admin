<!--分页-->
<template>
  <el-pagination
    :page-size.sync="page.size"
    :page-sizes="[5,10,20,30,40,50,100, 200, 300, 400]"
    :total="page.total"
    :current-page.sync="page.page"
    style="margin-top: 8px;"
    layout="total, prev, pager, next, sizes"
    @size-change="crud.sizeChangeHandler($event)"
    @current-change="crud.pageChangeHandler"
  />
</template>
<script>
import { pagination } from '@crud/crud'
export default {
  mixins: [pagination()]
}
</script>
