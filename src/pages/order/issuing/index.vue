<template>
  <div class="page-container">
    <el-card class="search-content">
      <el-form ref="form" :model="form" label-width="100px" size="mini">
        <!-- <el-form-item label="发货单号">
          <el-input v-model="form.sendCode.value" placeholder="请输入发货单号" clearable></el-input>
        </el-form-item> -->
        <el-form-item label="配送单号">
          <el-input v-model="form.deliveryNo.value" placeholder="请输入配送单号" clearable></el-input>
        </el-form-item>
        <el-form-item label="订单编号">
          <el-input v-model="form.orderNo.value" placeholder="请输入订单编号" clearable></el-input>
        </el-form-item>
        <el-form-item label="收货人电话">
          <el-input v-model="form.receivePhone.value" placeholder="请输入收货人电话" clearable></el-input>
        </el-form-item>
        <el-form-item label="收货人姓名">
          <el-input v-model="form.orderReceiver.value" placeholder="请输入收货人姓名" clearable></el-input>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="form.orderStatus.value" clearable>
            <el-option label="全部" value=""></el-option>
            <el-option label="待处理" :value="10"></el-option>
            <el-option label="待发货" :value="22"></el-option>
            <el-option label="部分发货" :value="33"></el-option>
            <el-option label="待收货" :value="44"></el-option>
            <el-option label="交易完成" :value="1"></el-option>
            <el-option label="取消" :value="55"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下单时间">
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
			<!-- <el-table-column label="发货单号" prop="deliveryNo"></el-table-column> -->
			<el-table-column label="配送单号" prop="deliveryNo"></el-table-column>
			<el-table-column label="订单编号" prop="orderNo"></el-table-column>
			<el-table-column label="下单时间" prop="orderCreateTime"></el-table-column>
			<el-table-column label="收货人姓名" prop="orderReceiver"></el-table-column>
			<el-table-column label="收货人电话" prop="receivePhone"></el-table-column>
			<el-table-column label="订单状态" prop="orderStatus">
        <template v-slot:default="{ row }">
          <span v-show="row.orderStatus == 10">待处理</span>
          <span v-show="row.orderStatus == 22">待发货</span>
          <span v-show="row.orderStatus == 33">部分发货</span>
          <span v-show="row.orderStatus == 44">待收货</span>
          <span v-show="row.orderStatus == 55">取消</span>
          <span v-show="row.orderStatus == 1">交易完成</span>
        </template>
      </el-table-column>
			<el-table-column label="操作" prop="usedChannelType.describe">
        <template v-slot:default="{ row }">
          <el-link type="primary" @click="showDetail(row)">详情</el-link>
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
  import { reqQueryOmsOrders } from '@/api/order'
  export default {
    name: 'SupplierList',
    components: {
      Pagination
    },
    data() {
      return {
        form: {
          deliveryNo: { value: '', name: 'deliveryNo', matchType: MatchType.EQUAL, type: 'String' },
          orderNo: { value: '', name: 'orderNo', matchType: MatchType.EQUAL, type: 'String' },
          receivePhone: { value: '', name: 'receivePhone', matchType: MatchType.EQUAL, type: 'String' },
          orderReceiver: { value: '', name: 'orderReceiver', matchType: MatchType.CONTAIN, type: 'String' },
          orderStatus: { value: '', name: 'orderStatus', matchType: MatchType.EQUAL, type: 'enum' },
          createTime: { value: [], name: 'orderCreateTime', matchType: MatchType.BETWEEN, type: 'Date' }
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
        this._reqQueryOmsOrders(req)
      },
      handleReset() {
        this.form = {
          deliveryNo: { value: '', name: 'deliveryNo', matchType: 'EQUAL', type: 'String' },
          orderNo: { value: '', name: 'orderNo', matchType: 'EQUAL', type: 'String' },
          receivePhone: { value: '', name: 'receivePhone', matchType: 'EQUAL', type: 'String' },
          orderReceiver: { value: '', name: 'orderReceiver', matchType: 'CONTAIN', type: 'String' },
          orderStatus: { value: '', name: 'orderStatus', matchType: 'EQUAL', type: 'enum' },
          createTime: { value: [], name: 'orderCreateTime', matchType: '10', type: 'Date' }
        }
      },
      showDetail(row) {
        this.$router.push({ path: '/order/issuing/details', query: { id: row.id, orderNo: row.orderNo } })
      },
      handleTableChange({ pageNo, pageSize }) {
        this.currentPage = pageNo
        this.pageSize = pageSize
        this.submitQuery()
      },
      _reqQueryOmsOrders(data) {
        return reqQueryOmsOrders({
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
    }
  }
  .search-btn {
    text-align: right;
  }
</style>
