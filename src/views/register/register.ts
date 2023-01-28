import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import md5 from 'js-md5'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'

import LoginApi from '@/api/login'

/**
 * 验证获取短信验证码
 */
const validateMessage = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请填写手机号码'))
    regState.messageDisabled = true
  }
  const reg = /^[1][3,4,5,7,8,9][0-9]{9}$/
  if (reg.test(value)) {
    if (regState.meassageTimes > 0) {
      regState.messageDisabled = true
    } else {
      regState.messageDisabled = false
    }
    callback()
  } else {
    callback(new Error('请填写正确的手机号码'))
    regState.messageDisabled = true
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

/**
 * 验证密码
 */
const validatePass = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
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
  } else if (value !== regState.registerForm.password) {
    callback(new Error('两次输入密码不一致，请重新输入'))
  } else {
    callback()
  }
}

export const regState = reactive({
  registerForm: {
    // 短信登录
    passportNo: '',
    pinCode: '',
    password: '',
    verifyPassword: ''
  },
  registerRules: {
    // 短信登录 验证规则
    passportNo: [{ required: true, validator: validateMessage, trigger: 'change' }],
    pinCode: [{ required: true, validator: validatorCode, trigger: 'change' }],
    password: [{ required: true, validator: validatePass, trigger: 'change' }],
    verifyPassword: [{ required: true, validator: validatecheckPass, trigger: 'change' }]
  },
  messageDisabled: true,
  agreement: false, // 已阅读并同意
  meassageTimes: 0 // 短信倒计时时间
})

export const useRegMethod = () => {
  const router = useRouter()
  const registerForm = ref<FormInstance>()
  /**
   * 获取短信验证码 disabled状态
   */
  const handleGetMessageDisabled = (val: boolean, times: number) => {
    regState.messageDisabled = val
    regState.meassageTimes = times
  }

  /**
   * 去登录
   */
  const toLogin = () => {
    router.push('/login')
  }

  /**
   * 返回
   */
  const handleToReturn = () => {
    router.back()
  }

  /**
   * 注册
   */
  const onRegister = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid) => {
      if (valid) {
        if (!regState.agreement) {
          ElMessage.warning('请先同意《隐私政策》')
          return
        }
        const param = {
          mobile: regState.registerForm.passportNo,
          password: md5(regState.registerForm.password),
          pinCode: regState.registerForm.pinCode
        }
        LoginApi.userSignUp(param)
        ElMessage.success('注册成功')
        toLogin()
      }
    })
  }

  return {
    registerForm,
    handleGetMessageDisabled,
    toLogin,
    handleToReturn,
    onRegister
  }
}
