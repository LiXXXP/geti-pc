import { ElMessage, FormInstance } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'
import { StateProps, LoginProps } from './interface'
import LoginApi from '@/api/login'
import { useRouter } from 'vue-router'
import { setToken, setUserId } from '@/utils/auth'
import md5 from 'js-md5'
import Cookies from 'js-cookie'

export default function indexConfig() {
  const loginRef = ref<FormInstance>()
  const router = useRouter()
  /**
   * 验证密码
   */
  const validatePass = (rule: any, value: string, callback: any) => {
    if (value === '') {
      callback(new Error('请填写登录密码'))
    }
    const regPwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
    if (!regPwd.test(value)) {
      callback(new Error('请输入6-16位的数字和字母的组合'))
    } else {
      callback()
    }
  }

  const state = reactive<StateProps>({
    loginForm: <LoginProps>{},
    accountRules: {
      // 账号登录 验证规则
      account: [
        { required: true, message: '请填写手机号码', trigger: 'change' },
        { pattern: /^[1][3,4,5,7,8,9][0-9]{9}$/, message: '请填写正确的手机号码' }
      ],
      password: [{ required: true, validator: validatePass, trigger: 'change' }]
    }
  })

  function loginSubmit(formEl: FormInstance | undefined) {
    if (!formEl) return
    formEl.validate((valid) => {
      if (valid) {
        login()
      }
    })
  }

  function login() {
    const baseInfo = {
      account: state.loginForm.account,
      passportType: 'mobile',
      password: md5(state.loginForm.password)
    }

    LoginApi.login(baseInfo)
      .then((res: any) => {
        Cookies.set('account', state.loginForm.account.toString())
        setToken(res.body.accessToken)
        setUserId(res.body.userId)
        router.push('/home')
      })
      .catch((err) => {
        ElMessage.error(err.message)
      })
  }

  onMounted(() => {
    document.title = '登录'
  })

  return { state, loginRef, loginSubmit }
}
