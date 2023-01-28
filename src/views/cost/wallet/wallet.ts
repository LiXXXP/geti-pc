import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import { formatStapTime } from '@/utils/index'
import { getUserId } from '@/utils/auth'
import CostApi from '@/api/cost'
import UserApi from '@/api/user'

export const walletState = reactive({
  // 搜索
  formData: {
    time: '',
    category: '',
    item: '',
    startDate: '',
    endDate: ''
  },
  moneyType: [
    {
      label: '充值',
      value: 1
    },
    {
      label: '扣费',
      value: 2
    }
  ],
  moneyItem: [
    {
      label: '钱包扣费',
      value: 1
    },
    {
      label: '实时位置查询',
      value: 2
    },
    {
      label: '历史轨迹查询',
      value: 4
    }
  ],
  banlance: 0.0,
  // 返回数据
  tableData: [],
  // 分页参数
  pageParam: {
    count: 0,
    pageNum: 1,
    pageSize: 10,
    total: 0,
    returnCount: true
  }
})

export const useWalletMethod = () => {
  const router = useRouter()
  const defaultTime = ref([new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)])

  // 重置
  const clearSelection = () => {
    walletState.formData = {
      time: '',
      category: '',
      item: '',
      startDate: '',
      endDate: ''
    }
    getProductList()
  }

  // 余额查询
  const getMoney = async () => {
    const param = {
      userId: getUserId()
    }
    const res = await CostApi.userBalanceInquiry(param)
    walletState.banlance = res.body.balance
  }

  // 获取产品列表
  const getProductList = async () => {
    if (walletState.formData.time) {
      const time = walletState.formData.time
      walletState.formData.startDate = formatStapTime(time[0], 1)
      walletState.formData.endDate = formatStapTime(time[1], 1)
    } else {
      walletState.formData.startDate = ''
      walletState.formData.endDate = ''
    }

    const param = {
      page: walletState.pageParam,
      userId: getUserId(),
      ...walletState.formData
    }
    const res = await CostApi.userTradeListInquiry(param)

    // tableData
    walletState.tableData = res.body.dataList

    // pageData
    walletState.pageParam.total = res.body.page.count
    walletState.pageParam.pageSize = res.body.page.pageSize
    walletState.pageParam.pageNum = res.body.page.pageNum
  }

  /**
   * 分页
   */
  const sizeChange = (val: number) => {
    walletState.pageParam.pageSize = val
    getProductList()
  }

  /**
   * 分页 当前页
   */
  const currentChange = (val: number) => {
    walletState.pageParam.pageNum = val
    getProductList()
  }

  /**
   * 去充值
   */
  const toPay = async () => {
    const res = await UserApi.userInquiry({
      id: <string>getUserId()
    })
    if (res.body.isComplete) {
      router.push('/cost/pay')
    } else {
      ElMessageBox.confirm('为了更好为您提供服务，请先完善个人信息后再充值！', '提示', {
        showCancelButton: true,
        confirmButtonText: '去完善',
        cancelButtonText: '取消'
      })
        .then(() => {
          router.push('/account/information')
        })
        .catch(() => {
          // console.log('取消')
        })
    }
  }

  return {
    defaultTime,
    toPay,
    getMoney,
    getProductList,
    clearSelection,
    currentChange,
    sizeChange
  }
}
