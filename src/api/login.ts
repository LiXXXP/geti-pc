import { Request } from '@gwin/networking'

class LoginApi {
  async login(params: any) {
    const request = new Request({
      url: '/api/geti/v1/UserSignIn',
      method: 'post',
      isLoading: false,
      isError: true,
      params: params
    })
    return await request.start()
  }

  // 获取短信验证码
  async getMessageCode(params: any) {
    const request = new Request({
      url: '/api/geti/v1/SmsVerifyCode',
      method: 'post',
      isLoading: false,
      isError: true,
      params: params
    })
    return await request.start()
  }

  // 手机号验证
  async verifyPhone(params: any) {
    const request = new Request({
      url: '/api/geti/v1/VerifySms',
      method: 'post',
      isLoading: false,
      isError: true,
      params: params
    })
    return await request.start()
  }

  // 修改密码
  async changePassword(params: any) {
    const request = new Request({
      url: '/api/geti/v1/UserPasswordChange',
      method: 'post',
      isLoading: false,
      isError: true,
      params: params
    })
    return await request.start()
  }

  // 注册
  async userSignUp(params: any) {
    const request = new Request({
      url: '/api/geti/v1/UserSignUp',
      method: 'post',
      isLoading: false,
      isError: true,
      params: params
    })
    return await request.start()
  }
}

export default new LoginApi()
