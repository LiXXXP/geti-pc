<template>
  <div class="gwin-geti-change">
    <div class="title">「灰鲸·鲸眼」修改密码</div>
    <Step :step-active="passwordState.stepActive" :step-title="passwordState.stepTitle" />
    <div v-if="passwordState.stepActive === 0">
      <p class="hint">
        手机验证码验证 账户 <span>{{ passwordState.phoneStar }}</span> 为确认是你本人操作，请完成以下验证
      </p>
      <Message @handle-submit-message="handleSubmitMessage" />
    </div>
    <div v-if="passwordState.stepActive === 1">
      <p class="hint">
        手机验证码验证 账户 <span>{{ passwordState.phoneStar }}</span> 为确认是你本人操作，请完成以下验证
      </p>
      <Password @handle-submit-password="handleSubmitPassword" />
    </div>
    <div v-if="passwordState.stepActive === 2">
      <Complete :complete-official="passwordState.completeOfficial" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Step from '@/components/Step/index.vue'
import Message from '@/components/Form/message.vue'
import Password from '@/components/Form/password.vue'
import Complete from '@/components/Form/complete.vue'

import { passwordState, usePasswordMethod } from './password'
const { handleSubmitMessage, handleSubmitPassword } = usePasswordMethod()
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('change') {
  width: 100%;
  min-width: 600px;
  height: calc(100vh - 100px);
  min-height: 550px;
  background-color: #fff;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  .title {
    color: #121212;
    font-size: 34px;
    font-weight: 500;
    text-align: center;
    margin-bottom: 60px;
  }
  .hint {
    color: #6e6e6e;
    font-size: 14px;
    margin-top: -30px;
    margin-bottom: 65px;
    span {
      color: #3c7dff;
    }
  }
}
</style>
