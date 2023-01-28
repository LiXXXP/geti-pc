import { Request, Response } from '@gwin/networking'

interface UserInquiry {
  id: string
}

class UserApi {
  // 用户详情查询
  async userInquiry(params: UserInquiry): Promise<Response> {
    const request = new Request({
      url: '/api/geti/v1/UserInquiry',
      params: params,
      isMessage: true
    })
    return await request.start()
  }

  // 用户信息维护
  async userMaintenance(params: any): Promise<Response> {
    const request = new Request({
      url: '/api/geti/v1/UserMaintenance',
      params: params,
      isMessage: true,
      isLoading: true
    })
    return await request.start()
  }

  // 验证短信验证码
  async verifySms(params: any): Promise<Response> {
    const request = new Request({
      url: '/api/geti/v1/VerifySms',
      params: params,
      isMessage: true,
      isLoading: true
    })
    return await request.start()
  }

  // 修改密码
  async userPasswordChange(params: any): Promise<Response> {
    const request = new Request({
      url: '/api/geti/v1/UserPasswordChange',
      params: params,
      isMessage: true,
      isLoading: true
    })
    return await request.start()
  }

  // 手机号修改
  async userMobileChange(params: any): Promise<Response> {
    const request = new Request({
      url: '/api/geti/v1/UserMobileChange',
      params: params,
      isMessage: true,
      isLoading: true
    })
    return await request.start()
  }
}

export default new UserApi()
