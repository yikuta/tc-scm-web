<template>
  <scroll-bar>
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapState } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
  components: { SidebarItem, ScrollBar },
  data() {
    return {
      permissions: {}
    }
  },
  computed: {
    ...mapState({
      isCollapse: (state) => state.global.sidebar.isCollapse,
      routes: (state) => state.global.menus
    })
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
  /deep/ .el-menu {
    width: 100%;
    border: none;
    text-align: left;
  }

  /deep/ .el-menu--collapse{
    .el-menu-item {
      padding-left: 10px !important;
      padding-right: 10px;

      .el-tooltip {
        padding-left: 10px !important;
      }
    }
    .el-submenu {
      .el-submenu__title {
        padding-left: 10px !important;

        span {
          height: 0;
          width: 0;
          overflow: hidden;
          visibility: hidden;
          display: inline-block;
        }
        .el-submenu__icon-arrow {
          display: none;
        }
      }
    }
  }
</style>
