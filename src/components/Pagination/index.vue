<template>
  <div class="wrapper">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNo"
      :page-sizes="pagePhase"
      :page-size="pageSize"
      :layout="layout"
      :total="total"
      class="pagination"
      ref='pagination'
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    pagePhase: {
      type: Array,
      default: () => [10, 20, 30, 50]
    },
    pageSize: {
      type: Number,
      default: 10
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    total: {
      type: Number,
      required: true
    },
    pageNo: {
      type: Number,
      required: true
    }
  },
  data() {
    // 解决输入页码与点击页码事件冲突问题
    this.$nextTick(() => {
      const { $children } = this.$refs.pagination
      const jumper = $children.find(item => item.$vnode.tag.includes('jumper'))
      if (jumper) {
        const { $el } = this.$refs.pagination
        const { handleChange } = jumper
        jumper.handleChange = function(value) {
          if (
            !$el.querySelector('li:hover') &&
            !$el.querySelector('button:hover')
          ) {
            handleChange(value)
          }
        }
      }
    })
    return {}
  },
  methods: {
    handleCurrentChange(page) {
      this.$emit('change', { pageNo: page, pageSize: this.pageSize })
    },
    handleSizeChange(size) {
      this.$emit('change', { pageNo: this.pageNo, pageSize: size })
    }
  }
}
</script>

<style lang='scss' scoped>
.wrapper {
  overflow: hidden;
}
/** 分页样式 */
.pagination {
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  float: right;
  background-color: #ffffff;
  .pagination-toolbar {
    display: flex;
    align-items: center;
  }
}
</style>
