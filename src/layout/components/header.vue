<template>
  <div class="gwin-geti-header">
    <svg class="svg-icon gwin-geti-header__logo" aria-hidden="true" @click="router.push('/')">
      <use xlink:href="#icon-gwin-logo"></use>
    </svg>
    <div class="gwin-geti-header__operate">
      <!-- left图标 -->
      <div class="gwin-geti-header-home" @click="router.push('/home')">
        <svg-icon class-name="icon" icon-class="home"></svg-icon>首页
      </div>
      <!-- right图标 -->
      <div>
        <!-- 账户 -->
        <div class="gwin-geti-operate-right">
          <div class="gwin-geti-cost" @click="router.push('/cost/wallet')">费用</div>
          <el-dropdown>
            <span class="el-dropdown-link gwin-geti-header__name">
              <img src="@/assets/imgs/header/user.png" />
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="router.push('/account/information')">
                  <svg class="svg-icon" aria-hidden="true">
                    <use xlink:href="#icon-gwin-basic-info"></use>
                  </svg>
                  <span>基本信息</span>
                </el-dropdown-item>
                <el-dropdown-item @click="router.push('/account/settings')">
                  <svg class="svg-icon" aria-hidden="true">
                    <use xlink:href="#icon-code"></use>
                  </svg>
                  <span>安全设置</span>
                </el-dropdown-item>
                <el-dropdown-item @click="router.push('/account/rule')">
                  <svg class="svg-icon" aria-hidden="true">
                    <use xlink:href="#icon-gwin-enterprise-management"></use>
                  </svg>
                  <span>收费规则</span>
                </el-dropdown-item>
                <el-dropdown-item @click="quit">
                  <svg-icon class-name="icon" icon-class="Icon-Logout"></svg-icon>退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'

const router = useRouter()

const quit = () => {
  localStorage.clear()
  Cookies.remove('accessToken')
  router.push('/login')
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';

@include b('header') {
  display: flex;
  padding: 0 20px;
  align-items: center;
  box-sizing: border-box;
  background-color: #2a2f37;
  @include e('logo') {
    width: 140px;
    height: 50px;
  }
  @include e('operate') {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    padding: 0 20px;
    img {
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
    ::deep(svg) {
      padding-right: 10px;
    }
  }

  @include e('name') {
    display: flex;
    align-items: center;
  }
}
@include b('header-home') {
  color: #fff;
  height: 34px;
  padding: 0 12px;
  font-size: 14px;
  cursor: pointer;
  margin-left: 20px;
  line-height: 34px;
  border-radius: 2px;
  background-color: #39404c;
  .icon {
    margin-right: 5px;
  }
}
@include b('operate-right') {
  display: flex;
  align-items: center;
}
@include b('cost') {
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  margin-right: 20px;
}
</style>
