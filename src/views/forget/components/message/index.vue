<template>
  <div class="gwin-geti-message">
    <el-form ref="messageForm" :model="state.messageForm" status-icon :rules="state.messageRules" style="width: 427px">
      <el-form-item prop="mobile">
        <el-input
          v-model="state.messageForm.mobile"
          style="width: 100%"
          type="number"
          size="large"
          autocomplete="off"
          placeholder="请输入手机号"
          :disabled="state.mobileDisabled"
          oninput="if(value.length>11)value=value.slice(0,11)"
        ></el-input>
      </el-form-item>
      <el-form-item prop="pinCode" style="position: relative">
        <div class="gwin-geti-message__code-box">
          <el-input
            v-model="state.messageForm.pinCode"
            style="width: 100%"
            size="large"
            type="input"
            autocomplete="off"
            placeholder="请输入短信验证码"
          ></el-input>
          <Timer
            :passport-no="state.messageForm.mobile"
            :message-disabled="state.messageDisabled"
            @message-disabled="handleGetMessageDisabled"
          />
        </div>
        <el-tooltip v-if="state.isShowMessageTip" effect="light" placement="top-start">
          <template #content>
            <div class="gwin-geti-message__message-content">
              <p class="gwin-geti-message__message-title">没收到短信验证码？</p>
              <p>1.网络通讯异常可能会造成短信丢失，请重新获取或稍后再试；</p>
              <p>2.请核实手机是否已欠费停机、或屏蔽了系统短信；</p>
              <p>3.如果手机已丢失或停用，请选择其他验证方式；</p>
              <p>4.您也可以尝试将SIM卡移动到另一部手机，然后重试。</p>
            </div>
          </template>
          <span class="gwin-geti-message__not-meassage">没收到短信验证码？</span>
        </el-tooltip>
      </el-form-item>
      <el-form-item>
        <el-button
          class="gwin-geti-message__submit-btn"
          type="primary"
          size="large"
          style="margin-top: 20px"
          @click="handleMessageSubmit(messageForm)"
        >
          确定
        </el-button>
      </el-form-item>
    </el-form>
    <div class="gwin-geti-return-icon" @click="handleToReturn"></div>
  </div>
</template>

<script lang="ts" setup>
import Timer from '../timer/index.vue'
import indexConfig from './index-config'
const emit = defineEmits(['handleSubmitMessage'])

const { state, messageForm, handleToReturn, handleMessageSubmit, handleGetMessageDisabled } = indexConfig(emit)
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';

@include b(message) {
  display: flex;
  justify-content: center;

  @include e(not-meassage) {
    color: #3c7dff;
    font-size: 14px;
    cursor: pointer;

    position: absolute;
    top: 0px;
    right: -150px;
    &::after {
      content: '';
      display: block;
      width: 126px;
      height: 1px;
      margin-top: -10px;
      background-color: #3c7dff;
    }
  }

  @include e(submit-btn) {
    width: 100%;
    font-size: 16px;
    background: #3c7dff;
    &:hover {
      box-shadow: 0px 2px 4px 0px rgba(39, 123, 255, 0.5);
    }
  }

  @include e(code-box) {
    display: flex;
    width: 100%;
  }
}

@include b(message-content) {
  color: #6e6e6e;
  font-size: 12px;
  line-height: 16px;

  @include e(message-title) {
    color: #121212;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 10px;
  }
}

@include b(return-icon) {
  width: 30px;
  height: 30px;
  cursor: pointer;
  background: url('@/assets/imgs/login/return.png') no-repeat 0 0;
  background-size: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
}
</style>
