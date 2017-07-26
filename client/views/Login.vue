<template>
  <el-row class="content">
    <el-col :xs="24" :sm="{span: 6,offset: 9}">
      <span class="title">
       欢迎登录 
      </span>
      <el-row>
        <el-input 
          v-model="account" 
          placeholder="账号"
          type="text">
        </el-input>
        <el-input 
          v-model="password" 
          placeholder="密码"
          type="password">
        </el-input>
        <el-button type="primary" @click="handleLogin">登录</el-button>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { requestLogin } from '../api/api'

export default {
  data () {
    return {
      account: '',
      password: ''
    }
  },
  methods: {
    handleLogin() {
      console.log(this)
      requestLogin({ email: this.account, password: this.password })
        .then(res => {
          console.log(res)
        })
    }
  }
}
</script>

<style lang='scss'>
  .el-row.content {
    padding: 16px;
  }
  .title {
    font-size: 28px;
  }
  .el-input {
    margin: 12px 0;
  }
  .el-button {
    width: 100px;
    margin-top: 12px;
  }
</style>
