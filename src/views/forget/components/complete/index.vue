<template>
  <div class="gwin-geti-complete">
    <i class="gwin-geti-complete__complete-icon"></i>
    <p class="gwin-geti-complete__success">{{ props.completeOfficial.title }}</p>
    <p>{{ props.completeOfficial.describe }}</p>
    <el-button type="primary" class="gwin-geti-complete__to-login" @click="handleToLogin"> 去登录 </el-button>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
const router = useRouter()

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
function handleToLogin() {
  router.push('/')
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';

@include b(complete) {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.43);

  @include e(complete-icon) {
    width: 72px;
    height: 72px;
    display: block;
    background: url('@/assets/imgs/login/complete.png') no-repeat 0 0;
    background-size: 100%;
  }

  @include e(success) {
    color: #121212;
    font-size: 24px;
    font-weight: 500;
    margin: 24px 0 8px;
  }

  @include e(to-login) {
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
}
</style>
