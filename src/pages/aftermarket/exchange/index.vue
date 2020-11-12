<template>
  <div class="page-container">
    <el-card class="search-content">
      <el-form ref="search" :model="form" label-width="100px" size="mini">
        <!-- <el-form-item label="换货订单">
          <el-input v-model="form.code.value" placeholder="请输入退货/退款单号" clearable></el-input>
        </el-form-item> -->
        <el-form-item label="换货单号" prop="exchangeNo.value">
          <el-input v-model="form.exchangeNo.value" placeholder="请输入退货/退款单号" clearable></el-input>
        </el-form-item>
        <el-form-item label="售后状态" prop="status.value">
          <el-select v-model="form.status.value" clearable>
            <el-option label="全部" value=""></el-option>
            <el-option label="进行中" :value="0"></el-option>
            <el-option label="成功" :value="1"></el-option>
            <el-option label="失败" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="供应商名称" prop="supplierName.value">
          <el-input v-model="form.supplierName.value" placeholder="请输入供应商名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="供应商编码" prop="supplierCode.value">
          <el-input v-model="form.supplierCode.value" placeholder="请输入供应商编码" clearable></el-input>
        </el-form-item>
        <el-form-item label="订单编号" prop="orderNo.value">
          <el-input v-model="form.orderNo.value" placeholder="请输入订单编号" clearable></el-input>
        </el-form-item>
        <el-form-item label="下单时间" prop="orderTime.value">
          <el-date-picker
            v-model="form.orderTime.value"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="生成时间" prop="createTime.value">
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
			<!-- <el-table-column label="换货订单" prop="orderNo"></el-table-column> -->
			<el-table-column label="换货单号" prop="afterSaleOrderNo"></el-table-column>
			<el-table-column label="工单编号" prop="workOrderNo"></el-table-column>
			<el-table-column label="生成时间" prop="createTime"></el-table-column>
			<el-table-column label="订单编号" prop="orderNo"></el-table-column>
			<el-table-column label="下单时间" prop="orderCreateTime"></el-table-column>
			<el-table-column label="售后状态" prop="status.describe">
        <template v-slot:default="{ row }">
          <span v-if="row.auditStatus == 1">成功</span>
          <span v-else-if="row.auditStatus == 2">失败</span>
          <span v-else>进行中</span>
        </template>
      </el-table-column>
			<el-table-column label="备注" prop="auditRemark"></el-table-column>
			<el-table-column label="操作" prop="usedChannelType.describe">
        <template v-slot:default="{ row }">
          <div>
            <el-link type="primary" @click="showDetail(row)">详情</el-link>
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
  import { reqAfterSaleOrderList } from '@/api/aftermarket'
  export default {
    name: 'SupplierList',
    components: {
      Pagination
    },
    data() {
      return {
        form: {
          code: { value: '', name: 'afterSaleOrderNo', matchType: MatchType.EQUAL, type: 'String' },
          exchangeNo: { value: '', name: 'afterSaleOrderNo', matchType: MatchType.EQUAL, type: 'String' },
          status: { value: '', name: 'auditStatus', matchType: MatchType.EQUAL, type: 'enum' },
          supplierName: { value: '', name: 'supplier.name', matchType: MatchType.CONTAIN, type: 'String' },
          supplierCode: { value: '', name: 'supplierCode', matchType: MatchType.EQUAL, type: 'String' },
          orderNo: { value: '', name: 'orderNo', matchType: MatchType.EQUAL, type: 'String' },
          orderTime: { value: [], name: 'orderCreateTime', matchType: MatchType.BETWEEN, type: 'Date' },
          createTime: { value: [], name: 'createTime', matchType: MatchType.BETWEEN, type: 'Date' }
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
        this._reqAfterSaleOrderList(req)
      },
      handleReset() {
        this.$refs.search.resetFields()
      },
      showDetail(row) {
        this.$router.push({ path: '/aftermarket/exchange/details', query: { id: row.id } })
      },
      handleTableChange({ pageNo, pageSize }) {
        this.currentPage = pageNo
        this.pageSize = pageSize
        this.submitQuery()
      },
      _reqAfterSaleOrderList(data) {
        reqAfterSaleOrderList(2, {
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
