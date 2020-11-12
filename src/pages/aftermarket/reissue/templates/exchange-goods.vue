<template>
  <div>
    <el-card class="register-content">
      <div class="title">
        <span>补发商品</span>
        <div>
          <el-button v-if="!data.transStatus" class="back" @click="send" size="mini">发货</el-button>
          <el-button v-else class="back" @click="_getTransData" size="mini">查看物流</el-button>
        </div>
      </div>
      <el-divider></el-divider>
      <el-table :data="data.goodsList" size="mini">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="商品编码" prop="goodsCode"></el-table-column>
        <el-table-column label="商品名称" prop="goodsName"></el-table-column>
        <el-table-column label="退货数量" prop="num"></el-table-column>
        <el-table-column label="商品单位" prop="unit"></el-table-column>
      </el-table>
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
import { getAllTransCompany } from '@/api/order'
import { afterSaleOrderSend, getTransData } from '@/api/aftermarket'
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
      // let arr = []
      // this.selection.map((item) => {
      //   arr.push(item.id)
      // })
      // sendForm.goodsIdList = arr
      sendForm.id = this.$route.query.id
      this._afterSaleOrderSend(sendForm)
    },
    send() {
      this.dialogVisible = true
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
      if (row.transType === 1) {
        return 0
      } else {
        return 1
      }
    },
    _getTransData() {
      return getTransData(this.$route.query.id).then((res) => {
        if (res.code === 200) {
          let result = res.result || {}
          this.showLogistics(result, this.data)
        }
      })
    },
    _afterSaleOrderSend(data) {
      return afterSaleOrderSend(data).then((res) => {
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
