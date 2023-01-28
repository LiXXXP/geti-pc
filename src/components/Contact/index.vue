<template>
  <div class="gwin-geti-contact">
    <div class="gwin-geti-contact__qcode">
      <div class="gwin-geti-contact__phone-txt">185 1567 6583</div>
      <img class="gwin-geti-contact__img-qcode" :src="ImgQcode" />
    </div>
    <div class="gwin-geti-contact__btn">
      <img class="gwin-geti-contact__img" :src="IconPhone" />
      <div class="gwin-geti-contact__txt">联系我们</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconPhone from '@/assets/imgs/common/icon_phone.png'
import ImgQcode from '@/assets/imgs/contact/img-qcode.png'
</script>

<style scoped lang="scss">
@import '../../styles/mixin.scss';

@include b(contact) {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 99;
  display: flex;

  @include e(qcode) {
    width: 138px;
    height: 170px;
    padding: 14px;
    box-sizing: border-box;
    background: #fbfcfe;
    border: 1px solid #e2e7f0;
  }

  @include e(phone-txt) {
    font-size: 16px;
    font-weight: 500;
    color: #374667;
    line-height: 22px;
  }

  @include e(img-qcode) {
    margin-top: 10px;
    width: 110px;
    height: 110px;
  }

  @include e(btn) {
    width: 48px;
    height: 170px;
    margin-left: 20px;
    background: linear-gradient(90deg, #7ea0ff 0%, #4d77fe 100%);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
      background: linear-gradient(90deg, #537bf4 0%, #2752f0 100%);
    }
  }

  @include e(img) {
    width: 20px;
    height: 20px;
  }

  @include e(txt) {
    margin-top: 10px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    letter-spacing: 5px;
    -webkit-writing-mode: vertical-rl;
    writing-mode: vertical-rl;
  }
}
</style>
