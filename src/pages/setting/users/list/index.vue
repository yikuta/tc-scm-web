<template>
  <div class="page-container">
    <search-form addButtonText="新建用户" @change="handleChangeSearch">
      <template slot="form">
        <el-form-item label="用户名称">
          <el-input maxlength="6" v-model="searches.nickname.value" placeholder="请输入用户名称" />
        </el-form-item>
        <el-form-item label="用户账号">
          <el-input v-model="searches.username.value" placeholder="请输入用户账号" />
        </el-form-item>
      </template>
    </search-form>
    <base-table :columns="columns" :pagination="pagination" :list="list" @change="handleTableChange">
      <el-table-column slot="operates" label="操作" width="100px">
        <template slot-scope="{ row }">
          <el-button v-if="row.username !== 'supermanager'" type="text" @click="handleEditUser(row)">编辑</el-button>
          <el-button v-if="row.username !== 'supermanager'" type="text" @click="handleDeleteUser(row)">删除</el-button>
        </template>
      </el-table-column>
    </base-table>
    <dialog-form :visible="dialogVisible" :form="form" @close="handleCloseDialog" />
  </div>
</template>
<script>
  import BaseTable from '@/components/BaseTable'
  import SearchForm from '@/components/SearchForm'
  import { fetchUsers, deleteUser } from '@/api/setting'
  import DialogForm from './templates/DialogForm'
  import searchFormat from '@/utils/searchFormat'
  const columns = [{
    title: '序号',
    prop: 'id'
  }, {
    title: '用户姓名',
    prop: 'nickname'
  }, {
    title: '用户账号',
    prop: 'username'
  }, {
    title: '职位名称',
    prop: 'position'
  }]
  const initForm = {
    nickname: '',
    password: '',
    position: '',
    username: ''
  }
  export default {
    name: 'UsersList',
    components: { SearchForm, BaseTable, DialogForm },
    data() {
      return {
        form: { ...initForm },
        searches: {
          nickname: { value: '', name: 'nickname' },
          username: { value: '', name: 'username' }
        },
        columns: columns,
        list: [],
        pagination: {
          pageSize: 20,
          pageNo: 1,
          total: 0
        },
        dialogVisible: false
      }
    },
    mounted() {
      this.fetchUserList()
    },
    methods: {
      fetchUserList() {
        const { pageSize, pageNo } = this.pagination
        const searchObject = searchFormat(this.searches)
        fetchUsers({
          pageNo,
          pageSize,
          orderby: 'createTime',
          sort: 'asc',
          searchs: searchObject.length ? JSON.stringify(searchObject) : null
        }).then(res => {
          if (res.code === 200) {
            this.list = res.result.itemVOs
          }
        })
      },
      handleTableChange({ pageNo, pageSize }) {
        this.pagination.pageNo = pageNo
        this.pagination.pageSize = pageSize
        this.fetchUserList()
      },
      handleCloseDialog(isSuccess) {
        this.dialogVisible = false
        this.form = { ...initForm }
        if (isSuccess) {
          this.fetchUserList()
        }
      },
      handleChangeSearch(type) {
        if (type === 'add') {
          this.dialogVisible = true
        } else if (type === 'search') {
          this.pagination.pageNo = 1
          this.fetchUserList()
        }
      },
      handleEditUser(row) {
        const { id, nickname, username, position } = row
        this.form = { id, nickname, username, position }
        this.dialogVisible = true
      },
      handleDeleteUser(row) {
        this.$confirm('删除后该数据不恢复，确定要删除吗？', '删除提示', {}).then(() => {
          deleteUser({ id: row.id }).then(res => {
            if (res.code === 200) {
              this.$message.success('删除成功')
              this.fetchUserList()
            }
          })
        })
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
