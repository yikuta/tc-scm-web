<template>
  <el-menu class="nav-bar" mode="horizontal">
    <expand-icon class="expand-icon-wrap" :toggleClick="toggleSideBar" :isActive="!sidebar.isCollapse" />
    <breadcrumb></breadcrumb>
    <el-dropdown class="user-container" trigger="click">
      <div class="user-info">
        <el-avatar class="user-avatar" size="large" :src="user.avatar || defaultAvatar"></el-avatar>
        <span v-if="user.name" class="user-name">{{user.name}}</span>
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>首页</el-dropdown-item>
        </router-link>
        <el-dropdown-item v-if="!user.name" @click.native="login">
          <span style="display:block;">登录</span>
        </el-dropdown-item>
        <el-dropdown-item v-if="user.name" @click.native="logout">
          <span style="display:block;">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapState } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import ExpandIcon from './ExpandIcon'
import { getCookie } from '@/utils/support'

export default {
  components: {
    Breadcrumb,
    ExpandIcon
  },
  data() {
    return {
      defaultAvatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
  },
  computed: {
    ...mapState({
      sidebar: (state) => state.global.sidebar,
      user: (state) => state.global.userInfo
    }),
    userName() {
      const _name = getCookie('username') || ''
      this.$store.commit('SET_NAME', _name)
      return _name
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleMenuCollapse')
    },
    logout() {
      this.$store.dispatch('logout')
    },
    login() {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .nav-bar {
    height: 50px;
    line-height: 50px;
    border-radius: 0 !important;
    text-align: left;

    .header-icon {
      font-size: 30px;
    }

    .userName {
      font-size: 16px;
    }

    .expand-icon-wrap {
      line-height: 58px;
      height: 50px;
      float: left;
      padding: 0 10px;
    }

    .screenfull {
      position: absolute;
      right: 90px;
      top: 16px;
      color: red;
    }

    .user-container {
      height: 50px;
      line-height: 49px;
      display: inline-block;
      position: absolute;
      right: 10px;

      .user-info {
        height: 100%;
        cursor: pointer;
        font-size: 0;
        position: relative;

        .user-avatar {
          display: inline-block;
          line-height: 50px;
          margin-right: 5px;
          vertical-align: middle;
        }

        .user-name {
          color: #97a8be;
          cursor: text;
          font-size: 14px;
          padding-right: 5px;
          display: inline-block;
          vertical-align: middle;
        }

        .el-icon-caret-bottom {
          font-size: 14px;
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
  }
</style>
