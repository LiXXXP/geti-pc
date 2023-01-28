import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { phoneStar } from '@/utils/index'
import { getUserId } from '@/utils/auth'
import UserApi from '@/api/user'

export const mobileState = reactive({
  stepActive: 0, // 步骤
  stepTitle: ['验证身份', '修改手机', '完成'], // 步骤标题
  phoneStar: phoneStar(<string>localStorage.getItem('mobile')),
  completeOfficial: {
    title: '',
    describe: '此手机号码可作为安全验证的方式用于找回密码、修改手机等场景，但不能作为登录名使用',
    login: false
  },
  pinCodeToken: '' // 验证码token
})

export const useMobileMethod = () => {
  /**
   * 手机号 验证码 提交
   */
  const handleSubmitMessage = async (messageForm: any) => {
    const param = {
      mobile: messageForm.mobile,
      pinCode: messageForm.pinCode
    }
    const res = await UserApi.verifySms(param)
    ElMessage.success('手机验证成功')
    mobileState.pinCodeToken = res.body.pinCodeToken
    mobileState.stepActive = 1
  }

  /**
   * 修改新的手机号
   */
  const handleSubmitMobile = async (messageForm: any) => {
    const param = {
      mobile: messageForm.mobile,
      pinCodeToken: mobileState.pinCodeToken,
      userId: getUserId() || ''
    }
    await UserApi.userMobileChange(param)
    localStorage.setItem('mobile', messageForm.mobile)
    mobileState.completeOfficial.title = `您的手机号码修改为 ${messageForm.mobile}`
    ElMessage.success('手机号修改成功')
    mobileState.stepActive = 2
  }

  return {
    handleSubmitMessage,
    handleSubmitMobile
  }
}
