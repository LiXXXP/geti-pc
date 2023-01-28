import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { phoneStar } from '@/utils/index'
import UserApi from '@/api/user'

export const passwordState = reactive({
  stepActive: 0, // 步骤
  stepTitle: ['验证身份', '修改密码', '完成'], // 步骤标题
  phoneStar: phoneStar(<string>localStorage.getItem('mobile')),
  completeOfficial: {
    title: '修改成功',
    describe: '请牢记新的登录密码',
    login: true
  },
  pinCodeToken: '' // 验证码token
})

export const usePasswordMethod = () => {
  /**
   * 手机号 验证码 提交
   */
  const handleSubmitMessage = async (messageForm: any) => {
    const param = {
      mobile: messageForm.mobile,
      pinCode: messageForm.pinCodem
    }
    const res = await UserApi.verifySms(param)
    ElMessage.success('手机验证成功')
    passwordState.pinCodeToken = res.body.pinCodeToken
    passwordState.stepActive = 1
  }

  /**
   * 密码重置
   */
  const handleSubmitPassword = async (newPassword: string) => {
    const param = {
      newPassword: newPassword,
      pinCodeToken: passwordState.pinCodeToken
    }
    await UserApi.userPasswordChange(param)
    ElMessage.success('重置密码成功')
    passwordState.stepActive = 2
  }
  return {
    handleSubmitMessage,
    handleSubmitPassword
  }
}
