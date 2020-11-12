<template>
  <div class="search-form-wrap">
    <el-form ref="form" :model="form" :rules="rules" :inline="true" :label-width="labelWidth" :size="size">
      <slot name="form"></slot>
      <div class="operates" :class="mode">
        <slot name="operates">
          <el-button
              v-if="buttons.includes('reset')"
              type="default"
              icon="el-icon-refresh-right"
              :size="size"
              @click="handleOperatesChange('reset')"
          >重置</el-button>
          <el-button
              v-if="buttons.includes('search')"
              type="primary"
              icon="el-icon-search"
              :size="size"
              @click="handleOperatesChange('search')"
          >查询</el-button>
          <el-button
              v-if="buttons.includes('add')"
              type="primary"
              icon="el-icon-plus"
              :size="size"
              @click="handleOperatesChange('add')"
          >{{addButtonText}}</el-button>
          <slot name="more-operates"></slot>
        </slot>
      </div>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'SearchForm',
    props: {
      mode: {
        type: String,
        default: 'inline' // inline | block | flex
      },
      form: {
        type: Object,
        default: () => ({})
      },
      rules: {
        type: Object,
        default: () => ({})
      },
      size: {
        type: String,
        default: 'mini'
      },
      labelWidth: {
        type: String,
        default: '70px'
      },
      addButtonText: {
        type: String,
        default: '添加'
      },
      buttons: {
        type: Array,
        default: () => {
          return ['reset', 'search', 'add']
        }
      }
    },
    data() {
      return {}
    },
    methods: {
      handleOperatesChange(type) {
        if (type === 'search') {
          this.$refs.form.validate(validate => {
            if (validate) {
              this.$emit('change', type)
            } else {
              this.message.warn('搜索表单验证失败')
            }
          })
        } else {
          this.$emit('change', type)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .search-form-wrap {
    border-bottom: 1px solid #eee;

    .el-form {
      text-align: left;

      .el-input {
        width: 172px;
      }

      &:after {
        visibility: hidden;
        display: block;
        font-size: 0;
        content: " ";
        clear: both;
        height: 0;
      }
      /deep/ .el-form-item {
        white-space: nowrap;
      }
    }

    .operates {
      padding-bottom: 18px;
    }

    .operates.flex {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    .operates.inline {
      float: right;
      display: inline-block;
    }
  }
</style>
