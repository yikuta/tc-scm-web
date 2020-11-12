<template>
  <el-container class="layout-wrapper" :class="classObj">
    <el-aside :width="width">
      <sidebar/>
    </el-aside>
    <el-main class="content-container">
      <navbar />
      <tags-view />
      <app-main />
    </el-main>
  </el-container>
</template>
<script>
  import { mapState } from 'vuex'
  import Sidebar from './Sidebar'
  import Navbar from './Navbar'
  import AppMain from './AppMain'
  import TagsView from './TagsView'
  import ResizeMixin from './mixin/ResizeHandler'

  export default {
    name: 'Layout',
    components: { Sidebar, Navbar, TagsView, AppMain },
    mixins: [ResizeMixin],
    computed: {
      ...mapState({
        sidebar: (state) => state.global.sidebar,
        device: (state) => state.global.device
      }),
      width() {
        return `${this.sidebar.isCollapse ? 40 : 200}px`
      },
      classObj() {
        return {
          hideSidebar: !this.sidebar.isCollapse,
          withoutAnimation: this.sidebar.withoutAnimation,
          mobile: this.device === 'mobile'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .layout-wrapper {
    height: 100%;

    .el-aside {
      transition: width 0.2s;
    }
    .el-aside.collapse {
      width: 36px;
    }
  }
  .header-container {
    padding: 0;
  }
  /deep/ .el-main {
    padding: 0;
  }
</style>
