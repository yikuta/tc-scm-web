<template>
  <div class="page-container">
    <el-card class="register-content">
      <div class="title">
        <span>注册信息</span>
        <el-button class="back" @click="$router.go(-1)" size="mini">返回</el-button>
      </div>
      <el-divider></el-divider>
      <el-form ref="form" :model="data" label-width="150px" size="mini">
        <el-form-item label="供应商编号">
          <span>{{data.code}}</span>
        </el-form-item>
        <el-form-item label="创建日期">
          <span>{{data.sapCreateTime}}</span>
        </el-form-item>
      </el-form>
    </el-card>
    <BaseInfoContent :data="data" />
    <AuthInfoContent :data="data" :areaOptions="areaOptions" :optionProps="areaOptionProps" @on-refreshInfo="onRefreshInfo" />
    <el-card class="register-content">
      <div class="title">
        <span>供应商登录信息</span>
      </div>
      <el-divider></el-divider>
      <el-form ref="form" :model="data" label-width="150px" size="mini">
        <el-form-item label="登录账号">
          <span>{{data.phone}}</span>
        </el-form-item>
        <el-form-item label="登录密码">
          <span>******</span>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { findAll } from '@/api/common'
import BaseInfoContent from './templates/base-info-content'
import AuthInfoContent from './templates/auth-info-content'
import { supplierGetInfo } from '@/api/supplier'
export default {
  components: {
    BaseInfoContent,
    AuthInfoContent
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
        }
      },
      areaOptions: [],
      areaOptionProps: {
        checkStrictly: false,
        value: 'code',
        label: 'name'
      }
    }
  },
  mounted() {
    this._findAll()
    this._supplierGetInfo(this.$route.query.id)
  },
  methods: {
    onRefreshInfo() {
      this._supplierGetInfo(this.$route.query.id)
    },
    _supplierGetInfo(id) {
      return supplierGetInfo(id).then((res) => {
        if (res.code === 200) {
          let result = res.result || {}
          this.data = result
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
