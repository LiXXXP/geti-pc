<template>
  <div class="message">
    <el-form ref="messageForm" :model="state.messageForm" status-icon :rules="state.messageRules" style="width: 427px">
      <el-form-item prop="mobile">
        <el-input
          v-model="state.messageForm.mobile"
          style="width: 100%"
          type="number"
          size="large"
          autocomplete="off"
          :placeholder="props.type ? '请输入要绑定的手机号码' : '请输入手机号'"
          :disabled="state.mobileDisabled"
          oninput="if(value.length>11)value=value.slice(0,11)"
        ></el-input>
      </el-form-item>
      <el-form-item prop="pinCode" style="position: relative">
        <div class="code">
          <el-input
            v-model="state.messageForm.pinCode"
            style="width: 100%"
            type="input"
            size="large"
            autocomplete="off"
            placeholder="请输入短信验证码"
          ></el-input>
          <Timer
            :type="props.type ? props.type : 3"
            :passport-no="state.messageForm.mobile"
            :message-disabled="state.messageDisabled"
            @message-disabled="handleGetMessageDisabled"
          />
        </div>
        <el-tooltip v-if="state.isShowMessageTip" effect="light" placement="top-start">
          <template #content>
            <div class="message-content">
              <p class="message-title">没收到短信验证码？</p>
              <p>1.网络通讯异常可能会造成短信丢失，请重新获取或稍后再试；</p>
              <p>2.请核实手机是否已欠费停机、或屏蔽了系统短信；</p>
              <p>3.如果手机已丢失或停用，请选择其他验证方式；</p>
              <p>4.您也可以尝试将SIM卡移动到另一部手机，然后重试。</p>
            </div>
          </template>
          <span class="not-meassage">没收到短信验证码？</span>
        </el-tooltip>
      </el-form-item>
      <el-form-item>
        <el-button class="submit-btn" size="large" type="primary" style="margin-top: 20px" @click="handleMessageSubmit">
          确定
        </el-button>
      </el-form-item>
    </el-form>
    <div v-if="!props.type" class="return-icon" @click="handleToReturn"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue-demi'

import Timer from '@/components/Timer/index.vue'
import { useRoute } from 'vue-router'
import router from '@/router'

const props = defineProps({
  type: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['handleSubmitMessage', 'handleSubmitMobile'])

interface ruleFormParam {
  value: any
}

const messageForm: ruleFormParam = ref('')

/**
 * 验证获取短信验证码
 */
const validateMessage = (rule: any, value: string, callback: any) => {
  if (value === '') {
    state.messageDisabled = true
    callback(new Error('请填写手机号码'))
  }
  const reg = /^[1][3,4,5,7,8,9][0-9]{9}$/
  if (reg.test(value)) {
    if (state.meassageTimes > 0) {
      state.messageDisabled = true
    } else {
      state.messageDisabled = false
    }
    callback()
  } else {
    callback(new Error('请填写正确的手机号码'))
    state.messageDisabled = true
  }
}

/**
 * 验证短信验证码
 */
const validatorCode = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请输入短信验证码'))
  }
  const reg = /^\d{4,6}$/
  if (!reg.test(value)) {
    callback(new Error('请输入正确的验证码'))
  } else {
    callback()
  }
}

const state = reactive({
  messageForm: {
    // 短信登录
    mobile: '',
    pinCode: ''
  },
  messageRules: {
    // 短信登录 验证规则
    mobile: [{ required: true, validator: validateMessage, trigger: 'change' }],
    pinCode: [{ required: true, validator: validatorCode, trigger: 'change' }]
  },
  messageDisabled: false,
  meassageTimes: 0, // 短信倒计时时间
  mobileDisabled: false, // 是否禁止输入手机号
  isShowMessageTip: false // 是否显示短信提示信息
})

onMounted(() => {
  const route = useRoute()
  if (route.path.includes('changePassword') || (route.path.includes('changeMobile') && !props.type)) {
    state.messageForm.mobile = <string>localStorage.getItem('mobile')
    state.mobileDisabled = true
  }
  if (route.path.includes('forget') || (route.path.includes('changeMobile') && props.type)) {
    state.messageForm.mobile = ''
    state.messageDisabled = true
  }
})

/**
 * 获取短信验证码 disabled状态
 */
const handleGetMessageDisabled = (val: boolean, times: number): void => {
  state.messageDisabled = val
  state.meassageTimes = times
  state.isShowMessageTip = true
}

/**
 * 手机号 验证码 提交
 */
const handleMessageSubmit = async () => {
  if (!messageForm.value) return
  await messageForm.value.validate((valid: any) => {
    if (valid) {
      // 修改手机号
      if (props.type === 4) {
        emit('handleSubmitMobile', state.messageForm)
        return
      }
      // 修改密码
      emit('handleSubmitMessage', state.messageForm)
    }
  })
}

/**
 * 返回
 */
const handleToReturn = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
.message {
  position: relative;
  .code {
    width: 100%;
    display: flex;
    align-items: center;
  }
  .not-meassage {
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
  .submit-btn {
    width: 100%;
    font-size: 16px;
    background: #3c7dff;
    &:hover {
      box-shadow: 0px 2px 4px 0px rgba(39, 123, 255, 0.5);
    }
  }
}
.message-content {
  color: #6e6e6e;
  font-size: 12px;
  line-height: 16px;
  .message-title {
    color: #121212;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 10px;
  }
}
.return-icon {
  width: 30px;
  height: 30px;
  cursor: pointer;
  background: url('@/assets/imgs/login/return.png') no-repeat 0 0;
  background-size: 100%;
  position: absolute;
  top: -320px;
  left: -40px;
}
</style>
