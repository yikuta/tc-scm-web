<template>
  <div>
    <el-card class="authInfo-content">
      <div class="title">
        <span>客户反馈售后问题</span>
      </div>
      <el-divider></el-divider>
      <el-form ref="form" :model="data" label-width="150px" size="mini">
        <el-form-item label="售后原因">
          <span>{{data.orderComment.reason}}</span>
        </el-form-item>
        <el-form-item label="问题描述">
          <span>{{data.orderComment.details}}</span>
        </el-form-item>
        <el-form-item label="图片凭证">
          <img v-for="(item, index) in data.orderComment.imgList" :key="index" :src="item" style="width: 180px;" alt="">
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
// import { reqUpdateLicense } from '@/api/supplier'
// import { uploadImg } from '@/api/common'
// import { getTimestamp, randomInteger } from '@/utils/util'
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
      selected: false,
      options: []
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
