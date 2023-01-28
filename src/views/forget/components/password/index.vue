<template>
  <div class="gwin-geti-password">
    <el-form ref="messageForm" :model="state.messageForm" status-icon :rules="state.messageRules" style="width: 427px">
      <el-form-item prop="password" style="margin-bottom: 34px">
        <el-input
          v-model="state.messageForm.password"
          style="width: 100%"
          type="password"
          autocomplete="off"
          show-password
          size="large"
          placeholder="请输入新密码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="newPassword">
        <el-input
          v-model="state.messageForm.newPassword"
          type="password"
          autocomplete="off"
          show-password
          size="large"
          placeholder="请确认密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          class="gwin-geti-password__submit-btn"
          type="primary"
          style="margin-top: 20px"
          size="large"
          @click="handleReset(messageForm)"
        >
          确定
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import indexConfig from './index-config'
const emit = defineEmits(['handleSubmitPassword'])

const { state, messageForm, handleReset } = indexConfig(emit)
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';

@include b(password) {
  display: flex;
  justify-content: center;

  @include e(submit-btn) {
    width: 100%;
    font-size: 16px;
    background: #3c7dff;
    &:hover {
      box-shadow: 0px 2px 4px 0px rgba(39, 123, 255, 0.5);
    }
  }
}
</style>
