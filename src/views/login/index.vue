<template>
  <div class="gwin-geti-index">
    <div class="gwin-geti-index__left">
      <div class="gwin-geti-index__logo-box">
        <img class="gwin-geti-index__logo-img" :src="Logo" />
        <p>鲸眼</p>
      </div>
      <img class="gwin-geti-index__left-bottom" :src="LeftTxt" />
    </div>
    <div class="gwin-geti-index__right">
      <div class="gwin-geti-index__login-box">
        <p class="gwin-geti-index__login-title">登录</p>
        <el-form
          ref="loginRef"
          style="margin-top: 50px"
          :model="state.loginForm"
          :rules="state.accountRules"
          class="login-form"
          label-position="left"
        >
          <!--验证码登录-->
          <div>
            <el-form-item prop="account">
              <el-input
                v-model="state.loginForm.account"
                placeholder="请输入手机号"
                type="number"
                :maxlength="11"
                size="large"
                clearable
                oninput="if(value.length>11)value=value.slice(0,11)"
                @keyup.enter="loginSubmit(loginRef)"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="state.loginForm.password"
                placeholder="请输入密码"
                type="password"
                show-password
                clearable
                size="large"
                @keyup.enter="loginSubmit(loginRef)"
              ></el-input>
            </el-form-item>
          </div>
          <el-button type="primary" class="gwin-geti-login-btn" size="large" @click="loginSubmit(loginRef)">
            登录
          </el-button>
          <div class="gwin-geti-forget">
            <router-link to="/register" class="gwin-geti-forget__text">立即注册</router-link>
            <router-link to="/forget" class="gwin-geti-forget__text">忘记密码</router-link>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Logo from '@/assets/imgs/login/geti-logo.png'
import LeftTxt from '@/assets/imgs/login/left-txt.png'
import indexConfig from './index-config'

const { state, loginRef, loginSubmit } = indexConfig()
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';

@include b(index) {
  display: flex;
  height: 100%;

  @include e(left) {
    width: 50%;
    height: 100%;
    flex-shrink: 0;
    background-image: url('../../assets/imgs/login/left-bg.png');
    background-size: 100% 100%;
    position: relative;
  }

  @include e(logo-box) {
    margin: 30px 0 0 30px;
    display: flex;
    align-items: center;

    p {
      margin-left: 10px;
      font-size: 24px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ffffff;
      line-height: 33px;
      letter-spacing: 4px;
    }
  }

  @include e(logo-img) {
    width: 50px;
    height: 50px;
  }

  @include e(left-bottom) {
    position: absolute;
    left: 30px;
    bottom: 30px;
    width: 380px;
    height: 374px;
  }

  @include e(right) {
    width: 50%;
    height: 100%;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @include e(login-box) {
    width: 320px;
  }

  @include e(login-title) {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #282828;
    text-align: center;
  }
}

@include b(login-btn) {
  margin-top: 30px;
  width: 100%;
  background: #3860f4;
  border-radius: 4px;
  border-color: #3860f4;
}

@include b(forget) {
  display: flex;
  color: #999;
  cursor: pointer;
  font-size: 14px;
  margin-top: 10px;
  justify-content: space-between;
  @include e('text') {
    &:hover {
      color: #3c7dff;
    }
  }
}

::deep {
  .el-form-item {
    margin-bottom: 20px;
  }

  .el-input__wrapper.is-focus {
    box-shadow: 0 0 0 1px #3860f4 inset;
  }
}
</style>
