<template>
  <div class="gwin-geti-register">
    <div class="gwin-geti-return-icon" @click="handleToReturn"></div>
    <div class="gwin-geti-register__top">
      <div class="title">欢迎注册灰鲸·鲸眼</div>
      <div class="to-login">
        <span>已有灰鲸·鲸眼账号？</span>
        <span class="link" @click="toLogin">去登录</span>
      </div>
    </div>
    <el-form
      ref="registerForm"
      :model="regState.registerForm"
      status-icon
      :rules="regState.registerRules"
      style="width: 427px"
    >
      <el-form-item prop="passportNo" style="margin-bottom: 34px">
        <el-input
          v-model="regState.registerForm.passportNo"
          style="width: 100%"
          type="number"
          size="large"
          autocomplete="off"
          placeholder="请输入手机号"
          oninput="if(value.length>11)value=value.slice(0,11)"
        ></el-input>
      </el-form-item>
      <el-form-item prop="pinCode" style="margin-bottom: 34px">
        <div class="gwin-geti-register__code">
          <el-input
            v-model="regState.registerForm.pinCode"
            style="width: 100%"
            type="input"
            size="large"
            autocomplete="off"
            placeholder="请输入短信验证码"
          ></el-input>
          <Timer
            :passport-no="regState.registerForm.passportNo"
            :message-disabled="regState.messageDisabled"
            @message-disabled="handleGetMessageDisabled"
          />
        </div>
      </el-form-item>
      <el-form-item prop="password" style="margin-bottom: 34px">
        <el-input
          v-model="regState.registerForm.password"
          style="width: 100%"
          type="password"
          size="large"
          autocomplete="off"
          show-password
          placeholder="密码长度6-16字符，数字和字母的组合"
        ></el-input>
      </el-form-item>
      <el-form-item prop="verifyPassword">
        <el-input
          v-model="regState.registerForm.verifyPassword"
          type="password"
          size="large"
          autocomplete="off"
          show-password
          placeholder="请再次输入登录密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="submit-btn" type="primary" @click="onRegister(registerForm)">同意并注册</el-button>
      </el-form-item>
    </el-form>
    <div class="gwin-geti-agreement">
      <el-checkbox v-model="regState.agreement">
        <span>我已同意并知晓</span>
        <a target="_blank" href="/user" class="clause">《用户协议》｜</a>
        <a target="_blank" href="/agreement" class="clause">《隐私协议》</a>
      </el-checkbox>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Timer from '@/components/Timer/index.vue'
import { regState, useRegMethod } from './register'
const { registerForm, toLogin, handleGetMessageDisabled, onRegister, handleToReturn } = useRegMethod()
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('register') {
  width: 100%;
  min-width: 600px;
  height: 100vh;
  min-height: 550px;
  background-color: #fff;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  position: relative;
  @include e('top') {
    margin-bottom: 40px;
    .title {
      width: 427px;
      color: #121212;
      font-size: 26px;
      font-weight: 600;
      text-align: center;
    }
    .to-login {
      font-size: 14px;
      margin-top: 10px;
      text-align: right;
      color: rgba(0, 0, 0, 0.45);
      .link {
        color: #3c7dff;
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
  @include e('code') {
    width: 100%;
    display: flex;
    align-items: center;
  }
  .submit-btn {
    width: 100%;
    height: 44px;
    font-size: 16px;
    margin-top: 20px;
    background: #3c7dff;
    &:hover {
      box-shadow: 0px 2px 4px 0px rgba(39, 123, 255, 0.5);
    }
  }
}
@include b('return-icon') {
  width: 30px;
  height: 30px;
  cursor: pointer;
  background: url('@/assets/imgs/login/return.png') no-repeat 0 0;
  background-size: 100%;
  position: absolute;
  top: 5%;
  left: 5%;
}
@include b('agreement') {
  color: #6e6e6e;
  font-size: 12px;
  .clause {
    color: #3860f4;
  }
}
</style>
