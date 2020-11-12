<template>
  <div class="page-container">
    <BaseInfoContent :data="data" />
    <el-card class="register-content" v-if="data.auditStatus != 1">
      <div class="title">
        <span>退货商品</span>
      </div>
      <el-divider></el-divider>
      <el-table :data="data.returns" size="mini">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="商品编码" prop="goodsCode"></el-table-column>
        <el-table-column label="商品名称" prop="goodsName"></el-table-column>
        <el-table-column label="退货数量" prop="num"></el-table-column>
        <el-table-column label="商品单位" prop="unit"></el-table-column>
      </el-table>
    </el-card>
    <AuthInfoContent :data="data" v-if="data.auditStatus != 1" />
    <el-card class="register-content" v-if="data.auditStatus == 2">
      <div class="title">
        <span>售后审核结果</span>
      </div>
      <el-divider></el-divider>
      <el-form ref="form" :model="data" label-width="150px" size="mini">
        <el-form-item label="审核结果">
          <span v-if="data.auditStatus == 1">退货成功</span>
          <span v-if="data.auditStatus == 2">退货失败</span>
        </el-form-item>
        <el-form-item label="备注">
          <span>{{data.auditRemark}}</span>
        </el-form-item>
      </el-form>
    </el-card>
    <ExchangeGoods :data="data" @on-refresh="onRefreshInfo" v-if="data.auditStatus == 1"/>
    <div class="status-content" v-if="data.auditStatus == 0">
      <div class="search-btn">
        <el-button type="plain" size="mini" @click="$router.go(-1)">取消</el-button>
        <el-button type="primary" size="mini" @click="submitQuery">退货审核</el-button>
      </div>
    </div>
    <el-dialog
      title="退货审核"
      :visible.sync="aduitDialogVisible"
      destroy-on-close
      width="30%">
        <div class="auditRadio">
          操作：
          <el-radio v-model="aduitForm.status" :label="1">同意退货</el-radio>
          <el-radio v-model="aduitForm.status" :label="2">不同意退货</el-radio>
        </div>
        <div>
          <el-input type="textarea" :rows="5" placeholder="备注" maxlength="200" v-model="aduitForm.remark"></el-input>
        </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="aduitDialogVisible = false">取 消</el-button>
        <el-button type="primary" :loading="disabledBtn" @click="_auditAfterSale">完 成</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { findAll } from '@/api/common'
import BaseInfoContent from './templates/base-info-content'
import AuthInfoContent from './templates/auth-info-content'
import ExchangeGoods from './templates/exchange-goods'
import { omsAfterSaleOrderInfo, auditAfterSale } from '@/api/aftermarket'
export default {
  components: {
    BaseInfoContent,
    AuthInfoContent,
    ExchangeGoods
  },
  data() {
    return {
      data: {
        register: {
          account: '202018199838983838833',
          time: '2020-03-04 08:00:00'
        },
        baseInfo: {
          code: 'SC00288020431',
          name: '天天好生活供货',
          area: '四川省成都市武侯区',
          address: '天府三街太平洋保险金融大厦',
          type: '常用供应商',
          lnglat: '30.55252490377188,104.06939899999995',
          tel: '1666666666',
          acount: '1666666666'
        },
        authInfo: {
          name: '天天好生活供货',
          faren: '好先生',
          xinyong: '91510104MA6CN8BA85',
          address: '成都市锦江区石牛堰街8号',
          time: '2020年11月1日',
          type: '长期',
          pic: ''
        },
        orderComment: {
          reason: '',
          details: '',
          imgList: []
        }
      },
      areaOptions: [],
      areaOptionProps: {
        checkStrictly: false,
        value: 'code',
        label: 'name'
      },
      aduitDialogVisible: false,
      disabledBtn: false,
      aduitForm: {
        id: this.$route.query.id,
        remark: '',
        status: 1
      }
    }
  },
  mounted() {
    this._findAll()
    this._omsAfterSaleOrderInfo(this.$route.query.id)
  },
  methods: {
    submitQuery() {
      this.aduitDialogVisible = true
    },
    onRefreshInfo() {
      this._omsAfterSaleOrderInfo(this.$route.query.id)
    },
    _auditAfterSale() {
      if (this.aduitForm.status === 2) {
        if (this.aduitForm.remark === '') {
          this.$message({
            message: '请输入备注',
            type: 'error'
          })
          return false
        }
      }
      this.disabledBtn = true
      return auditAfterSale(this.aduitForm).then((res) => {
        if (res.code === 200) {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.disabledBtn = false
          this.aduitDialogVisible = false
          this.onRefreshInfo()
        }
      })
    },
    _omsAfterSaleOrderInfo(id) {
      return omsAfterSaleOrderInfo(id).then((res) => {
        if (res.code === 200) {
          let result = res.result || {}
          let returns = []
          let exchange = []
          result.goodsList.map((item) => {
            if (item.type === 1) {
              returns.push(item)
            }
            if (item.type === 2) {
              exchange.push(item)
            }
          })
          this.data = result
          this.data.returns = returns
          this.data.exchange = exchange
        }
      })
    },
    _findAll() {
      return findAll().then((res) => {
        const data = res.result
        data.map((item) => {
          item.children.map((child) => {
            child.children.map((el) => {
              delete el.children
            })
          })
        })
        this.areaOptions = data
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
  .el-divider {
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
