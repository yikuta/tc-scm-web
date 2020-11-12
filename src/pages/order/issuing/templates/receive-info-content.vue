<template>
  <div>
    <el-card class="receiveInfo-content">
      <div class="title">
        <span>收货信息</span>
        <!-- <el-button @click="edit" type="text" size="mini">编辑</el-button> -->
      </div>
      <el-divider></el-divider>
      <el-form ref="form" :model="data" label-width="150px" size="mini">
        <el-form-item label="下单用户">
          <el-link type="primary">{{data.receiveAccount}}</el-link>
        </el-form-item>
        <el-form-item label="下单备注">
          <span>{{data.remark}}</span>
        </el-form-item>
        <el-form-item label="收货人姓名">
          <span>{{data.orderReceiver}}</span>
        </el-form-item>
        <el-form-item label="收货人电话">
          <span>{{data.receivePhone}}</span>
        </el-form-item>
        <el-form-item label="收货人地址">
          <span>{{data.receiveAddress}}</span>
        </el-form-item>
        <el-form-item label="发货供应商编码" v-show="data.supplierCode">
          <span>{{data.supplierCode}}</span>
        </el-form-item>
        <el-form-item label="发货供应商名称" v-show="data.supplierName">
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
      form: {},
      options: []
    }
  },
  methods: {
    edit() {
      this.form = Object.assign({}, this.data)
      this.dialogVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
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
