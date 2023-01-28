<template>
  <div class="gwin-geti-settings">
    <div class="changed">
      <div class="block">
        <div>
          <div class="header">
            <i class="complete-icon"></i>
            <p class="title">登录密码</p>
          </div>
          <div class="describe">
            安全性高的密码可以使账号更安全，建议您定期更换密码，密码长度6-20字符,支持字母,数字以及标点符号(中文，空格除外)
          </div>
        </div>
        <div class="text" @click="handleToPassword">修改</div>
      </div>
      <div class="block">
        <div>
          <div class="header">
            <i class="complete-icon"></i>
            <p class="title">手机绑定</p>
          </div>
          <div class="describe">您已绑定了手机 {{ settingState.basicInfo.mobile }}</div>
        </div>
        <div class="text" @click="handleToMobile">修改</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { settingState, useSettingMethod } from './settings'
const { getUserInquiry, handleToPassword, handleToMobile } = useSettingMethod()
onMounted(() => {
  getUserInquiry()
})
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('settings') {
  .changed {
    width: 100%;
    margin-bottom: 20px;
    .block {
      padding: 20px;
      font-size: 14px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      background-color: #fff;
      justify-content: space-between;
      border-bottom: 1px solid #d9d9d9;
      &:last-child {
        border: 0;
      }
      .header {
        display: flex;
        align-items: center;
      }
      .complete-icon {
        width: 20px;
        height: 20px;
        display: block;
        margin-right: 10px;
        background: url('@/assets/imgs/user/complete.png') no-repeat 0 0;
        background-size: 100%;
      }
      .title {
        color: #121212;
        font-size: 16px;
        font-weight: 600;
      }
      .describe {
        color: #999;
        margin-top: 10px;
        margin-left: 30px;
      }
      .text {
        color: #3c7dff;
        cursor: pointer;
      }
    }
  }
}
</style>
