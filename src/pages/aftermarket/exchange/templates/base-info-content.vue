<template>
  <div>
    <el-card class="baseInfo-content">
      <div class="title">
        <span>订单与客户信息</span>
        <!-- <el-button class="back" @click="$router.go(-1)" size="mini">返回</el-button> -->
      </div>
      <el-divider></el-divider>
      <el-form ref="form" :model="data" label-width="150px" size="mini">
        <el-form-item label="换货订单">
          <span>{{data.afterSaleOrderNo}}</span>
        </el-form-item>
        <el-form-item label="用户账号">
          <span>{{data.userAccount}}</span>
        </el-form-item>
        <el-form-item label="工单编号">
          <span>{{data.workOrderNo}}</span>
        </el-form-item>
        <el-form-item label="申请售后时间">
          <span>{{data.applyAfterSaleTime}}</span>
        </el-form-item>
        <el-form-item label="售后类别">
          <span v-if="data.type == 1">退货/退款单</span>
          <span v-if="data.type == 2">换货单</span>
          <span v-if="data.type == 3">补发单</span>
        </el-form-item>
        <el-form-item label="收货人姓名">
          <span>{{data.receiver}}</span>
        </el-form-item>
        <el-form-item label="收货人电话">
          <span>{{data.receivePhone}}</span>
        </el-form-item>
        <el-form-item label="生成时间">
          <span>{{data.createTime}}</span>
        </el-form-item>
        <el-form-item label="收货人地址">
          <span>{{data.receiveAddress}}</span>
        </el-form-item>
        <el-form-item label="订单编号">
          <span>{{data.orderNo}}</span>
        </el-form-item>
        <el-form-item label="换货状态">
          <span v-if="data.auditStatus == 0">待退回仓库</span>
          <span v-else-if="data.auditStatus == 1">{{data.transStatus ? '已回寄客户' : '待回寄客户'}}</span>
          <span v-else>退货失败</span>
        </el-form-item>
        <el-form-item label="下单时间">
          <span>{{data.orderCreateTime}}</span>
        </el-form-item>
        <el-form-item label="供应商编码">
          <span>{{data.supplierCode}}</span>
        </el-form-item>
        <el-form-item label="供应商名称">
          <span>{{data.supplierName}}</span>
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
  data() {
    return {
      options: []
    }
  }
}
</script>
