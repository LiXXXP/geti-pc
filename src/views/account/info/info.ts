import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import regionList from '@/options/region-list-inquiry'
import type { FormInstance } from 'element-plus'
import { getUserId } from '@/utils/auth'
import UserApi from '@/api/user'

export const infoState = reactive({
  ruleForm: {
    realName: '',
    email: '',
    idCard: '',
    country: '中国',
    district: [],
    address: ''
  },
  rules: {
    realName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
    email: [
      { required: true, message: '请输入邮箱', trigger: 'blur' },
      { pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请输入正确的邮箱' }
    ],
    idCard: [
      { required: true, message: '请输入身份证号', trigger: 'blur' },
      { pattern: /^[\d]{17}[0-9|x|X]{1}$/, message: '请输入正确的身份证号' }
    ]
  },
  basicInfo: <any>{}, // 个人信息
  props: {
    // hover 行业多级联选
    expandTrigger: 'hover'
  },
  regionList: regionList // 地区列表
})

export const useInfoMethod = () => {
  const ruleForm = ref<FormInstance>()

  /**
   * 用户详情查询
   */
  const getUserInquiry = async () => {
    await UserApi.userInquiry({
      id: <string>getUserId()
    })
      .then((res: any) => {
        infoState.basicInfo = res.body
        infoState.ruleForm.realName = res.body.realName
        infoState.ruleForm.email = res.body.email
        infoState.ruleForm.idCard = res.body.idCard
        infoState.ruleForm.district = res.body.district
        infoState.ruleForm.address = res.body.address
      })
      .catch((err: any) => {
        ElMessage.error(err.message)
      })
  }

  /**
   * 获取 地区列表 所选中的值
   */
  const handleChangeRegion = (value: any) => {
    infoState.ruleForm.district = value
  }

  /**
   * 保存
   */
  const handleSave = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid) => {
      if (valid) {
        const param = {
          ...infoState.ruleForm,
          id: getUserId()
        }
        UserApi.userMaintenance(param)
          .then(() => {
            ElMessage.success('保存成功')
          })
          .catch((err: any) => {
            ElMessage.error(err.message)
          })
      }
    })
  }
  return {
    ruleForm,
    getUserInquiry,
    handleChangeRegion,
    handleSave
  }
}
