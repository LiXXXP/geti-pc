import { onMounted, reactive, ref } from 'vue'
import { StateProps } from './interface'
import { useRoute, useRouter } from 'vue-router'
import { FormInstance, FormItemRule } from 'element-plus'

export default function indexConfig(emit: any) {
  const messageForm = ref<FormInstance>()
  const route = useRoute()
  const router = useRouter()

  /**
   * 验证获取短信验证码
   */
  const validateMessage = (rule: FormItemRule, value: string, callback: any) => {
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
  const validatorCode = (rule: FormItemRule, value: string, callback: any) => {
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

  const state = reactive<StateProps>({
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
    if (route.path.includes('forget')) {
      state.messageForm.mobile = ''
      state.messageDisabled = true
    }
  })

  /**
   * 获取短信验证码 disabled状态
   */
  function handleGetMessageDisabled(val: boolean, times: number) {
    state.messageDisabled = val
    state.meassageTimes = times
    state.isShowMessageTip = true
  }

  /**
   * 手机号 验证码 提交
   */
  async function handleMessageSubmit(formEl: FormInstance | undefined) {
    if (!formEl) return
    formEl.validate((valid: any) => {
      if (valid) {
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

  return { state, messageForm, handleToReturn, handleMessageSubmit, handleGetMessageDisabled }
}
