import { Request, Response } from '@gwin/networking'

class CostApi {
  // 用户流水记录列表查询
  async userTradeListInquiry(params: any): Promise<Response> {
    const request = new Request({
      url: '/api/geti/v1/UserTradeListInquiry',
      params: params,
      isMessage: true,
      isLoading: true
    })
    return await request.start()
  }

  // 余额查询
  async userBalanceInquiry(params: any): Promise<Response> {
    const request = new Request({
      url: '/api/geti/v1/UserBalanceInquiry',
      params: params,
      isMessage: true,
      isLoading: true
    })
    return await request.start()
  }

  // 余额充值
  async userBalanceRecharge(params: any): Promise<Response> {
    const request = new Request({
      url: '/api/geti/v1/UserBalanceRecharge',
      params: params,
      isMessage: true,
      isLoading: true
    })
    return await request.start()
  }
}

export default new CostApi()
