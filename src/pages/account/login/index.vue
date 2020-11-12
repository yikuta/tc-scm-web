<template>
  <div class="page-container">
    <el-card class="login-form-layout">
      <el-form autoComplete="off" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
        <div style="text-align: center">
          <svg-icon icon-class="login-mall" style="width: 56px;height: 56px;color: #409EFF"></svg-icon>
        </div>
        <h2 class="login-title color-main">供应商管理系统</h2>
        <el-form-item prop="username">
          <el-input
            name="username"
            type="text"
            v-model.trim="loginForm.username"
            autoComplete="off"
            maxlength="19"
            placeholder="请输入登录账号"
          >
            <span slot="prefix">
              <i class="el-icon-user"></i>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            name="password"
            type="password"
            @keyup.enter.native="handleLogin"
            v-model.trim="loginForm.password"
            autoComplete="off"
            show-password
            maxlength="19"
            placeholder="请输入登录密码"
          >
            <span slot="prefix">
              <i class="el-icon-unlock"></i>
            </span>
          </el-input>
        </el-form-item>
       <!-- <el-form-item class="code-item" prop="graphicCode">
          <el-input
            name="graphicCode"
            @keyup.enter.native="handleLogin"
            v-model.trim="loginForm.graphicCode"
            autoComplete="off"
            maxlength="6"
            placeholder="图形验证码"
          >
            <i class="el-icon-files" slot="prefix"></i>
          </el-input>
          <el-image :src="imgCodeSrc"
                    title="点击更换验证码"
                    class="code-img"
                    v-if="!loadingCode"
                    @click="handleGetImageCode">
            <div slot="error"
                 class="image-slot"
                 @click="handleGetImageCode">
              <i class="el-icon-refresh"> 点击重新获取</i>
            </div>
          </el-image>
          <div class="loading-code"
               v-else>
            <i class="el-icon-loading"></i>
            正在获取验证码
          </div>
        </el-form-item>-->
        <el-form-item class="code-item">
          <el-checkbox v-model="rememberPassword">记住密码</el-checkbox>
        </el-form-item>
        <el-form-item class="login-buttons">
          <el-button style="width: 100%" type="primary" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="login-center-layout">
      <img :src="backgroundImage" alt="">
    </div>
  </div>
</template>

<script>
  import md5 from 'js-md5'
  import regexp from '@/constant/regexp'
  import loginCenterBg from '@/assets/images/login_center_bg.png'
  import { login } from '@/api/account'

  export default {
    name: 'login',
    data() {
      return {
        loginForm: {
          username: '',
          password: ''
        },
        loginRules: {
          username: [
            { required: true, message: '请输入登录账号', trigger: 'blur' },
            { pattern: regexp.account, message: '请输入正确登录账号', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入登录密码', trigger: 'blur' },
            { pattern: regexp.password, message: '请输入登录密码', trigger: 'blur' }
          ]
          /* graphicCode: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            { pattern: /^[A-Za-z0-9]{6}$/, message: '请输入正确的验证码', trigger: 'blur' }
          ] */
        },
        rememberPassword: false,
        loading: false,
        backgroundImage: loginCenterBg
      }
    },
    methods: {
      handleLogin() {
        const { username, password } = this.loginForm
        login({
          username,
          password: md5(password)
        }).then(res => {
          if (res.code === 200) {
            this.$message.success('登录成功')
            window.localStorage.setItem('token', 'Bearer ' + res.result.token)
            if (this.rememberPassword) {
              res.result.userInfo.password = md5(password)
              window.localStorage.setItem('userInfo', JSON.stringify(res.result.userInfo))
            }
            this.$store.dispatch('updateUserInfo', {
              token: res.result.token,
              userInfo: res.result.userInfo
            })
            this.$router.push('/dashboard')
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .code-item {
    /deep/ {
      .el-form-item__content {
        display: flex;
        align-items: center;
      }

      .loading-code {
        width: 238px;
        color: #409eff;
        text-align: center;
      }

      .image-slot {
        text-align: center;
        color: #409eff;

        &:hover {
          opacity: 0.8;
        }
      }
    }

    .cut-txt {
      width: 98px;
      display: inline-block;
    }

    .el-input {
      margin-right: 5px;
    }

    .el-button {
      margin-left: 2px;
      width: 140px;
    }

    .code-img {
      width: 238px;
      height: 40px;
      vertical-align: middle;
      cursor: pointer;
    }
  }

  .login-form-layout {
    position: absolute;
    z-index: 20;
    left: 0;
    right: 0;
    width: 400px;
    top: 50%;
    transform: translate3d(0, -50%, 0);
    margin: 0 auto;
    border-top: 10px solid #409eff;

    .login-title {
      text-align: center;
      margin: 16px 0;
    }

    .login-buttons {
      margin-bottom: 60px;
      text-align: center
    }
  }

  .login-center-layout {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    padding-top: 180px;

    img {
      background: #409eff;
      max-width: 100%;
      max-height: 100%;
    }
  }
</style>
