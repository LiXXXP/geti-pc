<template>
  <div class="reset-complete">
    <i class="complete-icon"></i>
    <p class="success">{{ props.completeOfficial.title }}</p>
    <p>{{ props.completeOfficial.describe }}</p>
    <el-button v-if="props.completeOfficial.login" type="primary" class="to-login" @click="handleToLogin">
      去登录
    </el-button>
    <el-button v-else type="primary" class="to-gwin" @click="handleToLogin">返回我的灰鲸·鲸眼</el-button>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router'
import Cookies from 'js-cookie'

interface completeOfficialParam {
  title: string
  describe: string
  login: boolean
}

const props = defineProps({
  completeOfficial: {
    type: Object,
    default: () => <completeOfficialParam>{}
  }
})

/**
 * 去登录
 */
const handleToLogin = () => {
  localStorage.clear()
  Cookies.remove('accessToken')
  router.replace('/login')
}
</script>

<style lang="scss" scoped>
.reset-complete {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.43);
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  .complete-icon {
    width: 72px;
    height: 72px;
    display: block;
    background: url('@/assets/imgs/user/complete.png') no-repeat 0 0;
    background-size: 100%;
  }
  .success {
    color: #121212;
    font-size: 24px;
    font-weight: 500;
    margin: 24px 0 8px;
  }
  .to-login {
    width: 132px;
    height: 44px;
    font-size: 16px;
    margin-top: 50px;
    background: #3c7dff;
    border-radius: 4px;
    &:hover {
      box-shadow: 0px 2px 4px 0px rgba(39, 123, 255, 0.5);
    }
  }
  .to-gwin {
    width: 316px;
    height: 44px;
    font-size: 16px;
    margin-top: 50px;
    background: #3c7dff;
    border-radius: 4px;
    &:hover {
      box-shadow: 0px 2px 4px 0px rgba(39, 123, 255, 0.5);
    }
  }
}
</style>
