<template>
  <div class="password">
    <el-form ref="messageForm" :model="state.messageForm" status-icon :rules="state.messageRules" style="width: 427px">
      <el-form-item prop="password" style="margin-bottom: 34px">
        <el-input
          v-model="state.messageForm.password"
          style="width: 100%"
          type="password"
          size="large"
          autocomplete="off"
          show-password
          placeholder="请输入新密码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="newPassword">
        <el-input
          v-model="state.messageForm.newPassword"
          type="password"
          size="large"
          autocomplete="off"
          show-password
          placeholder="请确认密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="submit-btn" type="primary" style="margin-top: 20px" @click="handleReset">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue-demi'

const emit = defineEmits(['handleSubmitPassword'])

interface ruleFormParam {
  value: any
}

const messageForm: ruleFormParam = ref('')

/**
 * 验证密码
 */
const validatePass = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请输入新密码'))
  }
  const regPwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
  if (!regPwd.test(value)) {
    callback(new Error('请输入6-16位的数字和字母的组合'))
  } else {
    callback()
  }
}

/**
 * 验证再次输入密码
 */
const validatecheckPass = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== state.messageForm.password) {
    callback(new Error('两次输入密码不一致，请重新输入'))
  } else {
    callback()
  }
}

const state = reactive({
  messageForm: {
    // 短信登录
    password: '',
    newPassword: ''
  },
  messageRules: {
    // 短信登录 验证规则
    password: [{ required: true, validator: validatePass, trigger: 'change' }],
    newPassword: [{ required: true, validator: validatecheckPass, trigger: 'change' }]
  }
})

/**
 * 密码重置
 */
const handleReset = async () => {
  if (!messageForm.value) return
  await messageForm.value.validate((valid: any) => {
    if (valid) {
      emit('handleSubmitPassword', state.messageForm.newPassword)
    }
  })
}
</script>

<style lang="scss" scoped>
.password {
  .submit-btn {
    width: 100%;
    font-size: 16px;
    background: #3c7dff;
    &:hover {
      box-shadow: 0px 2px 4px 0px rgba(39, 123, 255, 0.5);
    }
  }
}
</style>
