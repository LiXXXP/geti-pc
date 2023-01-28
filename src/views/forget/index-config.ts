import { onMounted, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { StateProps } from './interface'
import LoginApi from '@/api/login'
import md5 from 'js-md5'

export default function indexConfig() {
  const state = reactive<StateProps>({
    stepActive: 0, // 步骤
    stepTitle: ['验证身份', '重置登录密码', '完成'], // 步骤标题
    completeOfficial: {
      title: '重置成功',
      describe: '请牢记新的登录密码',
      login: true
    },
    pinCodeToken: ''
  })

  /**
   * 手机号验证提交
   */
  function handleSubmitMessage(messageForm: any) {
    verifyPhone(messageForm.mobile, messageForm.pinCode)
  }

  /**
   * 验证手机
   * @param mobile 手机号
   * @param pinCode 短信验证码
   */
  function verifyPhone(mobile: string, pinCode: string) {
    const baseInfo = {
      mobile: mobile,
      pinCode: pinCode
    }
    LoginApi.verifyPhone(baseInfo)
      .then((res: any) => {
        state.pinCodeToken = res.body.pinCodeToken
        state.stepActive = 1
      })
      .catch((err) => {
        ElMessage.error(err.message)
      })
  }

  /**
   * 密码重置
   */
  function handleSubmitPassword(newPassword: string) {
    changePassowrd(newPassword)
  }

  /**
   * 修改密码，重置密码
   * @param newPassword 新密码
   * @param pinCodeToken 手机验证短信Token
   */
  function changePassowrd(newPassword: string) {
    const baseInfo = {
      newPassword: md5(newPassword),
      pinCodeToken: state.pinCodeToken
    }
    LoginApi.changePassword(baseInfo)
      .then(() => {
        state.stepActive = 2
      })
      .catch((err) => {
        ElMessage.error(err.message)
      })
  }

  onMounted(() => {
    document.title = '忘记密码'
  })

  return { state, handleSubmitMessage, handleSubmitPassword }
}
