import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import UserApi from '@/api/user'
import CostApi from '@/api/cost'
import { getUserId } from '@/utils/auth'

export const payState = reactive({
  userMobile: '',
  userName: '',
  agreement: false,
  moneyList: [5, 10, 200, 500],
  currentIndex: 2,
  money: ''
})

export const usePayMethod = () => {
  const router = useRouter()

  /**
   * 用户详情查询
   */
  const getUserInquiry = async () => {
    await UserApi.userInquiry({
      id: <string>getUserId()
    }).then((res: any) => {
      payState.userMobile = res.body.mobile
      payState.userName = res.body.realName
    })
  }

  /**
   * 选择充值金额
   */
  const selectMoney = (index: number) => {
    payState.currentIndex = index
  }

  /**
   * 返回
   */
  const goBack = () => {
    router.back()
  }

  /**
   * 提交
   */
  const toPay = async () => {
    if (!payState.agreement) {
      ElMessage.warning('请先同意《充值协议》')
      return
    }
    const param = {}
    await CostApi.userBalanceRecharge(param)
  }

  return {
    goBack,
    toPay,
    getUserInquiry,
    selectMoney
  }
}
