<template>
  <div class="page-container">
    <el-card class="status-content">
      <div class="title">
        <span>当前状态：</span>
        <span v-show="data.orderStatus == 22">待发货</span>
        <span v-show="data.orderStatus == 33">部分发货</span>
        <span v-show="data.orderStatus == 44">已发货</span>
        <span v-show="data.orderStatus == 1">交易完成</span>
        <span v-show="data.orderStatus == 55">交易取消</span>
      </div>
    </el-card>
    <BaseInfoContent :data="data" />
    <ReceiveInfoContent :data="data" />
    <CommodityInfoContent :data="data" @on-refresh="onReresh" />
  </div>
</template>
<script>
import { purchaseOrderInfo } from '@/api/order'
import BaseInfoContent from './templates/base-info-content'
import ReceiveInfoContent from './templates/receive-info-content'
import CommodityInfoContent from './templates/commodity-info-content'
export default {
  components: {
    BaseInfoContent,
    ReceiveInfoContent,
    CommodityInfoContent
  },
  data() {
    return {
      data: {}
    }
  },
  mounted() {
    this._purchaseOrderInfo(this.$route.query.id)
  },
  methods: {
    onReresh() {
      this._purchaseOrderInfo(this.$route.query.id)
    },
    _purchaseOrderInfo(id) {
      return purchaseOrderInfo(id).then((res) => {
        if (res.code === 200) {
          let result = res.result || {}
          this.data = result
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.page-container {
  > div {
    text-align: left;
    margin: 20px 0;
  }
  .register-content .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  /deep/ .el-divider {
    margin: 10px 0;
  }
  /deep/ .el-form {
    display: flex;
    flex-wrap: wrap;
    border-top: 1px solid #ebeef5;
    border-left: 1px solid #ebeef5;
    .el-form-item {
      width: 50%;
      border-right: 1px solid #ebeef5;
      border-bottom: 1px solid #ebeef5;
      margin-bottom: 0;
      > label {
        padding-top: 9px;
        padding-bottom: 9px;
        border-right: 1px solid #ebeef5;
        background: #fafafa;
      }
      > div {
        padding-top: 9px;
        padding-left: 12px;
      }
      .el-select {
        width: 100%;
      }
    }
  }
}
</style>
