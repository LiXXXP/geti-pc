import { Request } from '@gwin/networking'

class HomeApi {
  async checkCar(params: any) {
    const request = new Request({
      url: '/api/geti/v1/TruckWhitelistCheck',
      method: 'post',
      isLoading: false,
      isError: true,
      params: params
    })
    return await request.start()
  }

  // 首页-用户余额预查询
  async userBalancePreInquiry(params: any) {
    const request = new Request({
      url: '/api/geti/v1/UserBalancePreInquiry',
      method: 'post',
      isLoading: false,
      isError: true,
      params: params
    })
    return await request.start()
  }
}

export default new HomeApi()
