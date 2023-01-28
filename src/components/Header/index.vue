<template>
  <div class="gwin-geti-header">
    <img v-if="isBack" class="gwin-geti-header__back" :src="IconBack" @click="goBack" />
    <img class="gwin-geti-header__logo" :src="Logo" />
  </div>
</template>

<script lang="ts" setup>
import Logo from '@/assets/imgs/contact/logo.png'
import IconBack from '@/assets/imgs/common/icon-back.png'
import { useRouter } from 'vue-router'

interface Props {
  isBack?: boolean
}

withDefaults(defineProps<Props>(), {
  isBack: false
})

const router = useRouter()

function goBack() {
  router.go(-1)
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';

@include b(header) {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  z-index: 999;
  background: #ffffff;
  box-shadow: 4px 0px 10px 0px rgba(0, 0, 0, 0.06);
  text-align: right;
  padding-right: 20px;
  box-sizing: border-box;

  @include e(back) {
    float: left;
    width: 24px;
    height: 24px;
    margin-left: 20px;
    margin-top: 13px;
    cursor: pointer;
  }

  @include e(logo) {
    margin-top: 13px;
    width: 123px;
    height: 24px;
  }
}
</style>
