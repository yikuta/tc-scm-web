<template>
  <div>
    <el-card class="baseInfo-content">
      <div class="title">
        <span>订单基本信息</span>
      </div>
      <el-divider></el-divider>
      <el-form ref="form" :model="data" label-width="150px" size="mini">
        <el-form-item label="配送单号">
          <span>{{data.deliveryNo}}</span>
        </el-form-item>
        <el-form-item label="订单编号">
          <span>{{data.orderNo}}</span>
        </el-form-item>
        <el-form-item label="订单状态">
          <span v-show="data.orderStatus == 10">待处理</span>
          <span v-show="data.orderStatus == 22">待发货</span>
          <span v-show="data.orderStatus == 33">部分发货</span>
          <span v-show="data.orderStatus == 44">已发货</span>
          <span v-show="data.orderStatus == 55">取消</span>
        </el-form-item>
        <el-form-item label="下单时间">
          <span>{{data.orderCreateTime}}</span>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    edit() {
      this.dialogVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .el-form {
  .el-form-item {
    width: 100% !important;
  }
}
</style>
