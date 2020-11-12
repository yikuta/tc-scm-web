<template>
  <div class="page-container">
    <el-card class="search-content">
      <el-form ref="search" :model="form" label-width="100px" size="mini">
        <el-form-item label="商品编号" prop="goodsCode.value">
          <el-input v-model="form.goodsCode.value" placeholder="请输入商品编号" clearable></el-input>
        </el-form-item>
        <el-form-item label="商品名称" prop="goodsName.value">
          <el-input v-model="form.goodsName.value" placeholder="请输入商品名称" clearable></el-input>
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
        <el-form-item label="供应商编码" prop="deliverCode.value">
          <el-input v-model="form.deliverCode.value" placeholder="请输入供应商编码" clearable></el-input>
        </el-form-item>
        <el-form-item label="供应商名称" prop="deliverName.value">
          <el-input v-model="form.deliverName.value" placeholder="请输入供应商名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="商品状态" prop="status.value">
          <el-select v-model="form.status.value" clearable>
            <el-option label="全部" value=""></el-option>
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="search-btn">
        <el-button type="plain" size="mini" @click="handleReset">重置</el-button>
        <el-button type="primary" size="mini" @click="submitQuery">查询</el-button>
      </div>
    </el-card>
    <el-table :data="tableData" size="mini">
			<el-table-column label="序号" type="index"></el-table-column>
			<el-table-column label="商品编号" prop="productCode"></el-table-column>
			<el-table-column label="商品名称" prop="productName"></el-table-column>
			<el-table-column label="采购价" prop="price">
        <template v-slot:default="{ row }">
          ￥{{row.price.toFixed(2)}}
        </template>
      </el-table-column>
			<el-table-column label="税率" prop="taxRate">
        <!-- <template v-slot:default="{ row }">
          {{(row.taxRate)*100}}%
        </template> -->
      </el-table-column>
			<el-table-column label="供应商编码" prop="supplierCode"></el-table-column>
			<el-table-column label="归属供应商" prop="supplierName"></el-table-column>
			<el-table-column label="是否为默认供应商" prop="defaultSupplier">
        <template v-slot:default="{ row }">
          <span v-if="row.defaultSupplier">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
			<el-table-column label="创建时间" prop="sapCreateTime"></el-table-column>
			<el-table-column label="商品状态" prop="enable">
        <template v-slot:default="{ row }">
          <span v-if="row.enable">启用</span>
          <span v-else>禁用</span>
        </template>
      </el-table-column>
			<el-table-column label="操作" prop="usedChannelType.describe">
        <template v-slot:default="{ row }">
          <el-link type="primary" @click="showDetail(row)">详情</el-link>
            <el-link v-show="!row.enable" type="primary" @click="open(row)">启用</el-link>
            <el-link v-show="row.enable" type="primary" @click="close(row)">关闭</el-link>
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
  import { reqQueryCommodity, commodityEnable, commodityDisable } from '@/api/commodity'
  export default {
    name: 'SupplierList',
    components: {
      Pagination
    },
    data() {
      return {
        form: {
          goodsCode: { value: '', name: 'productCode', matchType: MatchType.EQUAL, type: 'String' },
          goodsName: { value: '', name: 'productName', matchType: MatchType.CONTAIN, type: 'String' },
          deliverCode: { value: '', name: 'supplierCode', matchType: MatchType.EQUAL, type: 'String' },
          deliverName: { value: '', name: 'supplier.name', matchType: MatchType.CONTAIN, type: 'String' },
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
        this._reqQueryCommodity(req)
      },
      handleReset() {
        this.$refs.search.resetFields()
      },
      showDetail(row) {
        this.$router.push({ path: '/commodity/manage/details', query: { id: row.id } })
      },
      open(row) {
        this.$confirm('您确定要启用该供应商吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this._commodityEnable(row)
        })
      },
      close(row) {
        this.$confirm('您确定要关闭该供应商吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this._commodityDisable(row)
        })
      },
      handleTableChange({ pageNo, pageSize }) {
        this.currentPage = pageNo
        this.pageSize = pageSize
        this.submitQuery()
      },
      _commodityEnable(row) {
        return commodityEnable(row).then((res) => {
          if (res.code === 200) {
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.submitQuery()
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
            this.submitQuery()
          }
        })
      },
      _reqQueryCommodity(data) {
        reqQueryCommodity({
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
            this.tableData = result.itemVOs || []
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
      .el-range-editor--mini.el-input__inner {
        width: 100%;
      }
    }
  }
  .search-btn {
    text-align: right;
  }
</style>
