<template>
  <div>
    <el-card class="authInfo-content">
      <div class="title">
        <span>商品信息</span>
        <el-button @click="send" v-if="data.orderStatus === 22 || data.orderStatus === 33" type="text" size="mini">发货</el-button>
      </div>
      <el-divider></el-divider>
      <el-table :data="data.productVoList" size="mini" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" :selectable="selectable"></el-table-column>
        <el-table-column label="商品" prop="couponCode" width="400">
          <template v-slot:default="{ row }">
            <p>名称：<el-link href="#" target="_blank" type="primary">{{row.goodsName}}</el-link></p>
            <p>商品编码：{{row.goodsCode}}</p>
            <p>商品单位：{{row.unit}}</p>
          </template>
        </el-table-column>
        <el-table-column label="单价（元）" prop="price">
          <template v-slot:default="{ row }">
            <span>￥{{row.price}}</span>
          </template>
        </el-table-column>
        <el-table-column label="数量" prop="num"></el-table-column>
        <el-table-column label="总计" prop="totalPrice">
          <template v-slot:default="{ row }">
            <span>￥{{row.totalPrice}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="查看" prop="receivedTime">
          <template v-slot:default="{ row }">
            <el-button type="text" @click="showRemark(row)">备注信息</el-button>
          </template>
        </el-table-column> -->
        <!-- <el-table-column label="发货供应商" prop="receivedChannelType.describe"></el-table-column> -->
        <el-table-column label="发货状态" prop="transStatus">
          <template v-slot:default="{ row }">
            <span v-show="row.transStatus == 0">待发货</span>
            <span v-show="row.transStatus == 1">已发货</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="配送状态" prop="usedTime">
          <template v-slot:default="{ row }">
            <span v-if="row">—</span>
            <el-button type="text" @click="showLogistics(row)">查看物流</el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <div style="text-align: center;margin-top: 15px;">商品总价：￥{{totalAomunt}}</div>
    </el-card>
  </div>
</template>
<script>
import { purchaseOrderSend } from '@/api/order'
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      form: {},
      selection: []
    }
  },
  computed: {
    totalAomunt() {
      let sum = 0
      if (this.data.productVoList) {
        this.data.productVoList.map((item) => {
          sum += Number(item.totalPrice)
        })
      }
      return sum.toFixed(2)
    }
  },
  methods: {
    send() {
      if (this.selection.length === 0) {
        this.$message({
          message: '请选中要发货的商品',
          type: 'error'
        })
        return false
      }
      this.$confirm('请确定需要发货，发货后不可撤销！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        let arr = []
        this.selection.map((item) => {
          arr.push(item.id)
        })
        let query = {
          goodsIdList: arr,
          orderNo: this.data.orderNo
        }
        this._purchaseOrderSend(query)
      })
    },
    selectable(row) {
      if (row.transStatus === 1) {
        return 0
      } else {
        return 1
      }
    },
    showRemark(row) {
      const html = `<div>
        <p>注：此处展示的是客户下单时展示的商品信息</p>
        <p>订单商品名称：${row.commodityName}</p>
        <p>订单数量：${row.num}</p>
        <p>订单商品单位：${row.commodityUnit}</p>
        <p>订单商品规则：${row.commodityRule}</p>
      </div>`
      this.$alert(html, '备注查看', {
        dangerouslyUseHTMLString: true
      })
    },
    showLogistics(row) {
      let info = ''
      row.info.map((item) => {
        info += `<span>${item.time}</span><span>${item.description}</span>`
      })
      const html = `<div>
        <div>
          <span>发货方式：${row}</span><span>快递单号：${row}</span>
        </div>
        <el-divider></el-divider>
        <div>
          ${info}
        </div>
      </div>`
      this.$alert(html, '物流信息', {
        dangerouslyUseHTMLString: true
      })
    },
    handleSelectionChange(val) {
      this.selection = val
    },
    _purchaseOrderSend(data) {
      return purchaseOrderSend(data).then((res) => {
        if (res.code === 200) {
          this.$message({
            message: '发货成功',
            type: 'success'
          })
          this.$emit('on-refresh')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.title{
  display: flex;
  justify-content: space-between;
}
.el-dialog__body {
  .el-form {
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
      width: 100% !important;
      .el-select {
        width: 100%;
      }
      /deep/ .avatar-uploader {
        .el-upload {
          border: 1px dashed #d9d9d9;
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .el-upload:hover {
          border-color: #409EFF;
        }
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
    }
  }
}
.bigPic {
  width: 100%;
}
</style>
