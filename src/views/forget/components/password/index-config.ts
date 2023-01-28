import { StateProps } from './interface'
import { useRouter } from 'vue-router'
import { FormInstance, FormItemRule } from 'element-plus'
import { reactive, ref } from 'vue'

export default function indexConfig(emit: any) {
  const messageForm = ref<FormInstance>()
  const router = useRouter()

  /**
   * 验证密码
   */
  function validatePass(rule: FormItemRule, value: string, callback: any) {
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
  function validatecheckPass(rule: FormItemRule, value: string, callback: any) {
    if (value === '') {
      callback(new Error('请再次输入密码'))
    } else if (value !== state.messageForm.password) {
      callback(new Error('两次输入密码不一致，请重新输入'))
    } else {
      callback()
    }
  }

  const state = reactive<StateProps>({
    messageForm: {
      password: '',
      newPassword: ''
    },
    messageRules: {
      password: [{ required: true, validator: validatePass, trigger: 'change' }],
      newPassword: [{ required: true, validator: validatecheckPass, trigger: 'change' }]
    }
  })

  /**
   * 密码重置
   */
  async function handleReset(formEl: FormInstance | undefined) {
    if (!formEl) return
    formEl.validate((valid: any) => {
      if (valid) {
        emit('handleSubmitPassword', state.messageForm.newPassword)
      }
    })
  }

  /**
   * 返回
   */
  function handleToReturn() {
    router.back()
  }

  return { state, messageForm, handleToReturn, handleReset }
}
