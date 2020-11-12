<template>
  <el-dialog
    class="dialog-form"
    :title="`${this.typeText}用户`"
    :visible="visible"
    :close-on-click-modal="false"
    @open="handleOpen"
    @close="handleCancel(false)"
    width="600"
  >
    <el-form :model="form" :rules="rules" size="small" ref="form" label-width="80px">

      <el-form-item label="用户姓名" prop="nickname">
        <el-input maxlength="6" v-model="form.nickname" autocomplete="off" placeholder="请输入用户姓名"/>
      </el-form-item>

      <el-form-item label="职位名称" prop="position">
        <el-input maxlength="15" v-model="form.position" autocomplete="off" placeholder="请输入职位名称"/>
      </el-form-item>

      <el-form-item label="登录账号" prop="username">
        <el-input v-model="form.username" autocomplete="off" placeholder="请输入登录账号"/>
      </el-form-item>

      <el-form-item :label="form.id ? '新密码' : '登录密码'" prop="password">
        <el-input type="password" v-model="form.password" autocomplete="off" show-password placeholder="请输入登录密码">
          <span slot="prefix">
              <i class="el-icon-unlock"></i>
            </span>
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="submitting" size="mini" type="primary" @click="handleSubmit">确定{{form.id ? '编辑' : '添加'}}</el-button>
      <el-button size="mini" @click="handleCancel(false)">我再想想</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import md5 from 'js-md5'
  import regexp from '@/constant/regexp'
  import { updateUser, addUser } from '@/api/setting'
  import { filterEmptyParams } from '@/utils/util'
  const username = (rule, value, callback) => {
    if (value.length < 3) {
      callback(new Error('登录账号至少为3个字符'))
      return false
    } else {
      callback()
    }
  }
  const formRules = {
    nickname: [
      { required: true, message: '请输入用户姓名', trigger: 'blur' },
      { pattern: /^[a-zA-Z\u4e00-\u9fa5][a-zA-Z0-9_\u4e00-\u9fa5]{0,5}$/, message: '1～6个字符（汉字、数字、字母、下划线）', trigger: 'blur' }
    ],
    username: [
      { required: true, message: '请输入用户账号', trigger: 'blur' },
      { validator: username },
      { pattern: regexp.account, message: '请输入正确用户账号', trigger: 'blur' }
    ],
    position: [{ required: true, message: '请输入职位', trigger: 'blur' }],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { pattern: regexp.password, message: '请输入至少6位的密码', trigger: 'blur' }
    ]
  }
  export default {
    name: 'DialogForm',
    props: {
      form: {
        type: Object,
        default: () => ({})
      },
      visible: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        rules: formRules,
        departments: [],
        categories: [],
        submitting: false
      }
    },
    computed: {
      typeText: function() {
        if (this.form.id) {
          formRules.password.shift()
        }
        return this.form.id ? '编辑' : '添加'
      }
    },
    methods: {
      // 打开弹窗回调
      handleOpen() {},
      // 关闭弹出层
      handleCancel(isSuccess) { // true：成功 ｜ false：失败
        if (this.visible) {
          this.$emit('close', isSuccess)
        }
      },
      // 提交
      handleSubmit() {
        this.$refs.form.validate(validate => {
          if (validate) {
            this.$confirm(`确定要${this.typeText}人员吗？`, `${this.typeText}提示`, {
              closeOnPressEscape: false,
              closeOnClickModal: false,
              showClose: false
            }).then(() => {
              this.submitting = true
              if (this.form.password) {
                this.form.password = md5(this.form.password)
              }
              const promise = this.form.id ? updateUser(this.form) : addUser(filterEmptyParams(this.form))
              promise.then((res) => {
                if (res.code === 200) {
                  this.$message.success(`人员${this.typeText}成功`)
                  this.$emit('close', true)
                }
                this.submitting = false
              }).catch(() => {
                this.submitting = false
              })
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .dialog-form {
    /deep/ .el-dialog {
      min-width: 500px;
      .el-dialog__body {
        padding: 20px;
      }
    }
    /deep/ .el-form-item:last-child {
      margin-bottom: 0;
    }
  }
</style>
