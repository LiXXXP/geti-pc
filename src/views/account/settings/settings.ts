import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getUserId } from '@/utils/auth'
import { phoneStar } from '@/utils/index'
import UserApi from '@/api/user'

interface basicInfoParam {
  mobile: string
}

export const settingState = reactive({
  basicInfo: <basicInfoParam>{}
})

export const useSettingMethod = () => {
  const router = useRouter()

  /**
   * 用户详情查询
   */
  const getUserInquiry = async () => {
    await UserApi.userInquiry({
      id: <string>getUserId()
    })
      .then((res: any) => {
        localStorage.setItem('mobile', res.body.mobile)
        settingState.basicInfo.mobile = phoneStar(res.body.mobile)
      })
      .catch((err: any) => {
        ElMessage.error(err.message)
      })
  }

  /**
   * 跳转 修改密码页面
   */
  const handleToPassword = () => {
    router.push('/account/changePassword')
  }

  /**
   * 跳转 修改手机号页面
   */
  const handleToMobile = () => {
    router.push('/account/changeMobile')
  }
  return {
    getUserInquiry,
    handleToPassword,
    handleToMobile
  }
}
