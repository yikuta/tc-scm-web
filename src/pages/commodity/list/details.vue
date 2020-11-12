<template>
  <div class="page-container">
    <el-card class="data-content">
      <div class="title">
        <span>基本信息</span>
        <!-- <el-button class="back" @click="$router.go(-1)" size="mini">返回</el-button> -->
      </div>
      <el-divider></el-divider>
      <el-form ref="form" :model="data" label-width="150px" size="mini">
        <el-form-item label="商品编号">
          <span>{{data.productCode}}</span>
        </el-form-item>
        <el-form-item label="商品单位">
          <span>{{data.unit}}</span>
        </el-form-item>
        <el-form-item label="商品名称">
          <span>{{data.productName}}</span>
        </el-form-item>
        <el-form-item label="创建时间">
          <span>{{data.sapCreateTime}}</span>
        </el-form-item>
        <el-form-item label="所属供应商编码">
          <span>{{data.supplierCode}}</span>
        </el-form-item>
        <el-form-item label="所属供应商">
          <span>{{data.supplierName}}</span>
        </el-form-item>
        <el-form-item label="税率">
          <span>{{data.taxRate}}</span>
        </el-form-item>
        <el-form-item label="是否默认供应商">
          <span v-if="data.defaultSupplier">是</span>
          <span v-else>否</span>
        </el-form-item>
        <el-form-item label="采购价">
          <span>￥{{data.price}}</span>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="status-content">
      <!-- <div class="title">
        <span>商品状态</span>
      </div>
      <el-divider></el-divider> -->
      <el-form ref="form" label-width="100px" size="mini">
        <el-form-item label="商品状态：">
          <el-radio v-model="data.enable" :label="true">启用</el-radio>
          <el-radio v-model="data.enable" :label="false">禁用</el-radio>
        </el-form-item>
      </el-form>
      <div class="search-btn">
        <el-button type="plain" size="mini" @click="$router.go(-1)">取消</el-button>
        <el-button type="primary" size="mini" @click="submitQuery">确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { commodityGetInfo, commodityEnable, commodityDisable } from '@/api/commodity'
export default {
  data() {
    return {
      data: {},
      btnShow: false
    }
  },
  mounted() {
    this._commodityGetInfo(this.$route.query.id)
  },
  methods: {
    submitQuery() {
      // debugger
      if (this.data.enable) {
        this._commodityEnable({ id: this.$route.query.id })
      } else {
        this._commodityDisable({ id: this.$route.query.id })
      }
    },
    _commodityEnable(row) {
      return commodityEnable(row).then((res) => {
        if (res.code === 200) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.$router.go(-1)
        }
      })
    },
    _commodityDisable(row) {
      commodityDisable(row).then((res) => {
        if (res.code === 200) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.$router.go(-1)
        }
      })
    },
    _commodityGetInfo(id) {
      return commodityGetInfo(id).then((res) => {
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
  }
  .register-content .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .status-content {
    margin-top: 20px;
    .search-btn {
      text-align: center;
    }
  }
  .el-divider {
    margin: 10px 0;
  }
  .data-content /deep/ .el-form {
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
