<template>
  <div class="base-table">
    <el-table :data="list" style="width: 100%">
      <el-table-column
        v-for="(item, index) in columns"
        :key="item.id"
        :prop="item.prop"
        :label="item.title"
        :width="item.width"
      >
        <template slot-scope="{ row }">
          <slot v-if="item.slot" :name="item.prop" :row="row" :index="index" :column="item"></slot>
          <span v-else>{{row[item.prop]}}</span>
        </template>
      </el-table-column>
      <slot name="operates"></slot>
    </el-table>
    <pagination
      v-if="pagination"
      :pageSize="pagination.pageSize"
      :pageNo="pagination.pageNo"
      :total="pagination.total"
      @change="handleChange"
    ></pagination>
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination/index'
  export default {
    name: 'BaseTable',
    components: {
      Pagination
    },
    props: {
      list: {
        type: Array,
        default: () => []
      },
      pagination: {
        type: Object,
        default() {
          return null
        }
      },
      columns: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      handleChange(pagination) {
        this.$emit('change', { ...this.pagination, ...pagination })
      }
    }
  }
</script>

<style lang="scss" scoped></style>
