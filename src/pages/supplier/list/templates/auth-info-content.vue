<template>
  <div>
    <el-card class="authInfo-content">
      <div class="title">
        <span>供应商认证信息</span>
        <el-button @click="edit" type="text" size="mini">编辑</el-button>
      </div>
      <el-divider></el-divider>
      <el-form ref="form" :model="data" label-width="150px" size="mini">
        <el-form-item label="公司名称">
          <span>{{data.companyName}}</span>
        </el-form-item>
        <el-form-item label="法定代表人">
          <span>{{data.legalPerson}}</span>
        </el-form-item>
        <el-form-item label="统一社会信用代码">
          <span>{{data.creditCode}}</span>
        </el-form-item>
        <el-form-item label="住所">
          <span>{{data.companyAddress}}</span>
        </el-form-item>
        <el-form-item label="成立日期">
          <span>{{data.establishDate}}</span>
        </el-form-item>
        <el-form-item label="营业期限">
          <span>{{data.businessTerm}}</span>
        </el-form-item>
        <el-form-item label="营业执照图片">
          <img :src="data.businessLicenseImg" style="width: 180px;" alt="">
          <el-button @click="showPic" type="text">查看</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-dialog
      title="供应商认证信息"
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      width="50%">
      <el-form ref="form" :model="form" label-width="150px" size="mini">
        <el-form-item label="公司名称">
          <el-input v-model="form.companyName" placeholder="请输入公司名称"></el-input>
        </el-form-item>
        <el-form-item label="统一社会信用代码">
          <el-input v-model="form.creditCode" placeholder="请输入统一社会信用代码"></el-input>
        </el-form-item>
        <el-form-item label="成立日期">
          <!-- <el-input v-model="form.establishDate" placeholder="请输入联系电话"></el-input> -->
          <el-date-picker
            v-model="form.establishDate"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="营业期限">
          <el-date-picker
            v-model="form.businessTerm"
            type="date"
            value-format="yyyy年MM月dd日">
          </el-date-picker>
          <el-checkbox v-model="selected" @change="businessTerm()">长期</el-checkbox>
        </el-form-item>
        <el-form-item label="住所区域">
          <el-cascader
          class="areaSelect"
          size="small"
          v-model="form.areaCode"
          :options="areaOptions" :props="optionProps"></el-cascader>
        </el-form-item>
        <el-form-item label="住所地址">
          <el-input v-model="form.companyAddress" placeholder="请输入住所地址"></el-input>
        </el-form-item>
        <el-form-item label="营业执照图片">
          <!-- <img :src="data.authInfo.pic" alt=""> -->
          <el-upload
            class="avatar-uploader"
            action="upload"
            :show-file-list="false"
            :http-request="uploadRequest">
            <img v-if="form.businessLicenseImg" :src="form.businessLicenseImg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 认</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="营业执照大图"
      :visible.sync="picVisible"
      v-if="picVisible"
      width="75%">
      <img class="bigPic" :src="data.businessLicenseImg" alt="">
    </el-dialog>
  </div>
</template>
<script>
import { reqUpdateLicense } from '@/api/supplier'
import { uploadImg } from '@/api/common'
import { getTimestamp, randomInteger } from '@/utils/util'
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    areaOptions: {
      type: Array,
      default: () => {}
    },
    optionProps: {
      type: Object,
      default: () => {}
    }
  },
  // components: {
  //   UploadFile: resolve => {
  //     return require(['@/components/UploadFile/index'], resolve)
  //   }
  // },
  data() {
    return {
      form: {},
      selected: false,
      dialogVisible: false,
      options: [],
      picVisible: false
    }
  },
  created() {
    this.selected = this.form.businessTerm ? true : false
  },
  methods: {
    submit() {
      let form = JSON.parse(JSON.stringify(this.form))
      form.provinceId = Number(form.areaCode[0])
      form.cityId = Number(form.areaCode[1])
      form.districtId = Number(form.areaCode[2])
      delete form.areaCode
      this._reqUpdateLicense(form)
    },
    businessTerm() {
      if (this.selected) {
        this.form.businessTerm = ''
      }
    },
    edit() {
      const { businessLicenseImg, businessTerm, companyAddress, companyName, creditCode, establishDate, legalPerson } = this.data
      this.form = { businessLicenseImg, businessTerm, companyAddress, companyName, creditCode, establishDate, legalPerson }
      this.form.id = this.$route.query.id
      let areaCode = []
      areaCode.push(String(this.data.provinceId))
      areaCode.push(String(this.data.cityId))
      areaCode.push(String(this.data.districtId))
      this.form.areaCode = areaCode
      this.dialogVisible = true
    },
    showPic() {
      this.picVisible = true
    },
    _reqUpdateLicense(data) {
      return reqUpdateLicense(data).then((res) => {
        if (res.code === 200) {
          this.dialogVisible = false
          this.$emit('on-refreshInfo')
        }
      })
    },
    uploadRequest(data) {
      let reader = new FileReader()
        reader.readAsArrayBuffer(data.file)
        reader.onload = (res) => {
          let byte = new Uint8Array(res.currentTarget.result)
          let binary = []
          for (let i = 0; i < byte.length; i++) {
            binary.push(byte[i])
          }
          const loading = this.$loading({
            lock: true,
            text: '图片上传中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          const nameArray = data.file.name.split('.')

          uploadImg({
            date: binary,
            filePath: 'image',
            fileName: `${getTimestamp()}_${randomInteger(0, 1000)}/${nameArray[0]}`,
            fileType: data.file.type.split('/')[1] || nameArray[1]
          }).then(res => {
            if (res.code === 200) {
              this.form.businessLicenseImg = res.result.fileUrl
              this.$message.success('上传成功')
            }
            loading.close()
          }).catch(() => {
            this.$message.error('上传失败')
            loading.close()
          })
        }
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
