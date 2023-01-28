<template>
  <div class="gwin-geti-forget">
    <div class="gwin-geti-forget__title">「鲸眼」账号密码找回</div>
    <Step :step-active="state.stepActive" :step-title="state.stepTitle" />
    <div v-if="state.stepActive === 0">
      <Message @handle-submit-message="handleSubmitMessage" />
    </div>
    <div v-if="state.stepActive === 1">
      <Password @handle-submit-password="handleSubmitPassword" />
    </div>
    <div v-if="state.stepActive === 2">
      <Complete :complete-official="state.completeOfficial" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Step from './components/step/index.vue'
import Message from './components/message/index.vue'
import Password from './components/password/index.vue'
import Complete from './components/complete/index.vue'
import indexConfig from './index-config'

const { state, handleSubmitMessage, handleSubmitPassword } = indexConfig()
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';

@include b(forget) {
  width: 90%;
  min-width: 600px;
  margin: 50px auto;
  height: calc(100vh - 210px);
  min-height: 550px;
  background-color: #fff;
  position: relative;

  @include e(title) {
    color: #121212;
    font-size: 34px;
    font-weight: 500;
    text-align: center;
    margin-bottom: 80px;
  }
}
</style>
