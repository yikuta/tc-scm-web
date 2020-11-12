<template>
  <div>
    <el-card class="baseInfo-content">
      <div class="title">
        <span>供应商信息</span>
        <!-- <el-button @click="edit" type="text" size="mini">编辑</el-button> -->
      </div>
      <el-divider></el-divider>
      <el-form ref="form" :model="data" label-width="150px" size="mini">
        <el-form-item label="供应商编码">
          <span>{{data.code}}</span>
        </el-form-item>
        <el-form-item label="供应商名称">
          <span>{{data.name}}</span>
        </el-form-item>
        <el-form-item label="供应商所在区域">
          <!-- <span>{{data.provinceName + data.cityName + data.districtName}}</span> -->
          <span>{{data.area}}</span>
        </el-form-item>
        <el-form-item label="供应商地址">
          <span>{{data.address}}</span>
        </el-form-item>
        <el-form-item label="供应商类型">
          <span v-if="data.type == 1">常用供应商</span>
          <span v-else>临时供应商</span>
        </el-form-item>
        <!-- <el-form-item label="经纬度">
          <span>{{data.longitude + ',' + data.latitude}}</span>
        </el-form-item> -->
        <el-form-item label="联系电话">
          <span>{{data.phone}}</span>
        </el-form-item>
        <!-- <el-form-item label="供应商账号">
          <span>{{data.phone}}</span>
        </el-form-item> -->
      </el-form>
    </el-card>
    <el-dialog
    title="供应商信息"
    :visible.sync="dialogVisible"
    v-if="dialogVisible"
    width="50%">
      <el-form ref="form" :model="data.baseInfo" label-width="150px" size="mini">
        <el-form-item label="供应商编码">
          <span>{{data.baseInfo.code}}</span>
        </el-form-item>
        <el-form-item label="供应商名称">
          <el-input v-model="data.baseInfo.name" placeholder="请输入供应商名称"></el-input>
        </el-form-item>
        <el-form-item label="供应商类型">
          <el-select v-model="data.baseInfo.type" placeholder="请选择供应商类型">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="(item, index) in options" :label="item.value" :value="item.id" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="data.baseInfo.tel" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="所在区域">
          <span>{{data.baseInfo.area}}</span>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="data.baseInfo.address" placeholder="请输入详细地址"></el-input>
        </el-form-item>
        <!-- <el-form-item label="经纬度">
          <span>{{data.baseInfo.lnglat}}</span>
        </el-form-item> -->
        <el-form-item label="登录账号">
          <el-input v-model="data.baseInfo.acount" placeholder="请输入登录账号"></el-input>
        </el-form-item>
        <el-form-item label="登录密码">
          <el-input v-model="data.baseInfo.password" placeholder="请输入登录密码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 认</el-button>
      </span>
    </el-dialog>
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
      dialogVisible: false,
      options: []
    }
  },
  methods: {
    edit() {
      this.dialogVisible = true
    }
  }
}
</script>
