<template>
  <div class="page-container">
    <el-card class="search-content">
      <el-form ref="search" :model="form" label-width="100px" size="mini">
        <el-form-item label="供应商编码" prop="code.value">
          <el-input v-model="form.code.value" placeholder="请输入供应商编码" clearable></el-input>
        </el-form-item>
        <el-form-item label="供应商名称" prop="name.value">
          <el-input v-model="form.name.value" placeholder="请输入供应商名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="acount.value">
          <el-input v-model="form.acount.value" placeholder="请输入账号" clearable></el-input>
        </el-form-item>
        <el-form-item label="账户状态" prop="status.value">
          <el-select v-model="form.status.value" clearable>
            <el-option label="全部" value=""></el-option>
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime.value">
          <el-date-picker
            v-model="form.createTime.value"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div class="search-btn">
        <el-button type="plain" size="mini" @click="handleReset">重置</el-button>
        <el-button type="primary" size="mini" @click="submitQuery">查询</el-button>
      </div>
    </el-card>
    <el-table :data="tableData" size="mini">
			<el-table-column label="序号" type="index"></el-table-column>
			<el-table-column label="供应商编码" prop="code"></el-table-column>
			<el-table-column label="供应商名称" prop="name"></el-table-column>
			<el-table-column label="供应商区域" prop="area">
        <!-- <template v-slot:default="{ row }">
          <span>{{row.provinceName + row.cityName + row.districtName}}</span>
        </template> -->
      </el-table-column>
			<el-table-column label="供应商地址" prop="address"></el-table-column>
			<el-table-column label="账号" prop="phone"></el-table-column>
			<el-table-column label="创建日期" prop="sapCreateTime"></el-table-column>
			<el-table-column label="供应商状态" prop="enable">
        <template v-slot:default="{ row }">
          <span v-if="row.enable">启用</span>
          <span v-else>禁用</span>
        </template>
      </el-table-column>
			<el-table-column label="操作" prop="usedChannelType.describe">
        <template v-slot:default="{ row }">
          <div>
            <el-link type="primary" @click="showDetail(row)">详情</el-link>
            <el-link v-show="!row.enable" type="primary" @click="open(row)">启用</el-link>
            <el-link v-show="row.enable" type="primary" @click="close(row)">关闭</el-link>
          </div>
        </template>
      </el-table-column>
		</el-table>
    <pagination :pageNo="currentPage" :total="totalCount" :pageSize="pageSize" @change="handleTableChange" />
  </div>
</template>
<script>
  import searchTool from '../../../utils/searchTool'
  import Pagination from '@/components/Pagination'
  import { MatchType } from '@/utils/searchFormat'
  import { reqQuerySuppliers, supplierEnable, supplierDisable } from '@/api/supplier'
  export default {
    name: 'SupplierList',
    components: {
      Pagination
    },
    data() {
      return {
        form: {
          code: { value: '', name: 'code', matchType: MatchType.EQUAL, type: 'String' },
          name: { value: '', name: 'name', matchType: MatchType.CONTAIN, type: 'String' },
          acount: { value: '', name: 'phone', matchType: MatchType.EQUAL, type: 'String' },
          status: { value: '', name: 'enable', matchType: MatchType.EQUAL, type: 'enum' },
          createTime: { value: [], name: 'sapCreateTime', matchType: MatchType.BETWEEN, type: 'Date' }
        },
        time: [],
        tableData: [],
        currentPage: 1,
        pageSize: 20,
        totalCount: 0
      }
    },
    mounted() {
      this.submitQuery()
    },
    methods: {
      submitQuery() {
        let req = searchTool(JSON.parse(JSON.stringify(this.form)))
        this._reqQuerySuppliers(req)
      },
      handleReset() {
        this.$refs.search.resetFields()
      },
      showDetail(row) {
        this.$router.push({ path: '/supplier/manage/details', query: { id: row.id } })
      },
      open(row) {
        this.$confirm('您确定要启用该供应商吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this._supplierEnable(row)
        })
      },
      close(row) {
        this.$confirm('您确定要关闭该供应商吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this._supplierDisable(row)
        })
      },
      handleTableChange({ pageNo, pageSize }) {
        this.currentPage = pageNo
        this.pageSize = pageSize
        this.submitQuery()
      },
      _supplierEnable(row) {
        return supplierEnable(row).then((res) => {
          if (res.code === 200) {
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.submitQuery()
          }
        })
      },
      _supplierDisable(row) {
        supplierDisable(row).then((res) => {
          if (res.code === 200) {
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.submitQuery()
          }
        })
      },
      _reqQuerySuppliers(data) {
        reqQuerySuppliers({
          searchs: JSON.stringify(data),
          pageNo: this.currentPage,
          pageSize: this.pageSize,
          orderby: 'createTime',
          sort: 'desc'
        }).then((res) => {
          if (res.code === 200) {
            let result = res.result || {}
            this.currentPage = result.pageNo
            this.totalCount = result.totalCount
            this.tableData = result.itemVOs
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
.search-content {
  margin: 20px 0;
}
  /deep/ .el-form {
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
      width: 33%;
      .el-select {
        width: 100%;
      }
    }
  }
  .search-btn {
    text-align: right;
  }
</style>
