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
        <el-table-column label="查看" prop="receivedTime">
          <template v-slot:default="{ row }">
            <el-button type="text" @click="showRemark(row)">备注信息</el-button>
          </template>
        </el-table-column>
        <el-table-column label="发货供应商" prop="supplierName"></el-table-column>
        <el-table-column label="发货状态" prop="transStatus">
          <template v-slot:default="{ row }">
            <span v-if="row.transStatus == 1">已发货</span>
            <span v-else>待发货</span>
          </template>
        </el-table-column>
        <el-table-column label="配送状态" prop="usedTime">
          <template v-slot:default="{ row }">
            <el-button v-if="row.transStatus == 1" type="text" @click="_getTransData(row)">查看物流</el-button>
            <span v-else>—</span>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: center;margin-top: 15px;">商品总价：￥{{totalAomunt}}</div>
    </el-card>
    <el-dialog
      title="发货"
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      width="50%">
      <el-form ref="form" :model="sendForm" label-width="150px" size="mini">
        <el-form-item label="发货方式：">
          <el-radio v-model="sendForm.transType" :label="1">快递发货</el-radio>
          <!-- <el-radio v-model="sendForm.transType" :label="2">自主发货</el-radio> -->
        </el-form-item>
        <el-form-item label="物流公司：" v-show="sendForm.transType == 1">
          <el-select v-model="sendForm.transCompany" placeholder="请选择物流公司">
            <el-option
              v-for="(item, index) in options"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="配送单号：" v-show="sendForm.transType == 1">
          <el-input v-model="sendForm.transNo" placeholder="请输入配送单号"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">发 单</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { omsOrderSend, getTransData, getAllTransCompany } from '@/api/order'
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      sendForm: {
        transType: 1,
        transCompany: '',
        transNo: ''
      },
      options: [],
      selection: [],
      dialogVisible: false
    }
  },
  created() {
    this._getAllTransCompany()
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
    submit() {
      // debugger
      if (this.sendForm.transType === 1) {
        if (this.sendForm.transCompany === '') {
          this.$message({
            message: '请选择快递公司',
            type: 'error'
          })
          return false
        } else if (this.sendForm.transNo === '') {
          this.$message({
            message: '请选择配送单号',
            type: 'error'
          })
          return false
        }
      }
      let sendForm = JSON.parse(JSON.stringify(this.sendForm))
      let arr = []
      this.selection.map((item) => {
        arr.push(item.id)
      })
      sendForm.goodsIdList = arr
      sendForm.id = this.data.id
      this._omsOrderSend(sendForm)
    },
    send() {
      if (this.selection.length === 0) {
        this.$message({
          message: '请选中要发货的商品',
          type: 'error'
        })
        return false
      }
      this.dialogVisible = true
    },
    showRemark(row) {
      const html = `<div>
        <p>注：此处展示的是客户下单时展示的商品信息</p>
        <p>订单商品名称：${row.remark}</p>
        <p>订单数量：${row.num}</p>
        <p>订单商品单位：${row.unit ? row.unit : ''}</p>
      </div>`
      this.$alert(html, '备注查看', {
        dangerouslyUseHTMLString: true
      })
    },
    showLogistics(infos, row) {
      let info = ''
      let logistics = JSON.parse(infos)
      logistics.map((item) => {
        info += `<div><span>${item.time}</span><span>${item.context}</span></div>`
      })
      const html = `<div>
        <div style="margin-bottom:20px;">
          <span>发货方式：${row.transCompany}</span><span style="margin-left:30px;">快递单号：${row.transNo}</span>
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
    selectable(row) {
      if (row.transStatus === 1) {
        return 0
      } else {
        return 1
      }
    },
    _getTransData(row) {
      return getTransData(row.id).then((res) => {
        if (res.code === 200) {
          let result = res.result || {}
          this.showLogistics(result, row)
        }
      })
    },
    _omsOrderSend(data) {
      return omsOrderSend(data).then((res) => {
        if (res.code === 200) {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.dialogVisible = false
          this.$emit('on-refresh')
        }
      })
    },
    _getAllTransCompany() {
      return getAllTransCompany().then((res) => {
        if (res.code === 200) {
          let result = res.result || []
          this.options = result
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
/deep/.el-message-box {
  width: 600px;
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
