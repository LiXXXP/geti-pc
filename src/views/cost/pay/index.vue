<template>
  <div class="gwin-geti-pay">
    <div class="gwin-geti-pay__block">
      <div class="gwin-geti-pay__title">充值信息</div>
      <div class="gwin-geti-pay__info">
        <p>账号：{{ payState.userMobile }}</p>
        <p>姓名：{{ payState.userName }}</p>
      </div>
      <div class="gwin-geti-pay__money">
        <p><span>*</span>充值金额</p>
        <div>
          <p
            v-for="(item, index) in payState.moneyList"
            :key="item"
            :class="{ active: index === payState.currentIndex }"
            @click="selectMoney(index)"
          >
            {{ item }}元
          </p>
        </div>
        <el-input
          v-model="payState.money"
          type="number"
          class="input"
          placeholder="请输入其他金额"
          style="width: 20%; margin: 0 12px"
        ></el-input>
        <p>注：5元起充，仅支持整数</p>
      </div>
    </div>
    <div class="gwin-geti-pay__block">
      <div class="gwin-geti-pay__title">充值说明</div>
      <div class="gwin-geti-pay__text">
        <p>1、该服务仅支持12吨以上普货车辆，充值成功后不支持退款；</p>
        <p>2、钱包余额不支持转赠，不可提现，长期长效；</p>
        <p>3、如需要开发票，可电话联系我们开具纸质发票，联系方式：<span>185 1567 6583</span>（开具纸质发票运费自理）</p>
      </div>
      <div class="gwin-geti-pay__agreement">
        <el-checkbox v-model="payState.agreement">
          <span>我已同意并知晓</span>
          <a target="_blank" href="/recharge" class="clause">《充值协议》</a>
        </el-checkbox>
      </div>
      <div>
        <el-button type="primary" @click="toPay">提交</el-button>
        <el-button @click="goBack">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { payState, usePayMethod } from './pay'
const { goBack, toPay, getUserInquiry, selectMoney } = usePayMethod()

onMounted(() => {
  getUserInquiry()
})
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('pay') {
  box-sizing: border-box;
  @include e('block') {
    padding: 20px;
    margin-bottom: 20px;
    box-sizing: border-box;
    background-color: #fff;
  }
  @include e('title') {
    color: #121212;
    font-size: 16px;
    font-weight: 500;
    &::before {
      content: '';
      width: 4px;
      height: 18px;
      margin-right: 6px;
      display: inline-block;
      vertical-align: text-bottom;
      background-color: #3860f4;
    }
  }
  @include e('info') {
    padding: 20px;
    display: flex;
    margin: 20px 0;
    color: #1a2234;
    font-size: 14px;
    align-items: center;
    background-color: rgba(60, 125, 255, 0.04);
    p {
      width: 40%;
    }
  }
  @include e('money') {
    font-size: 14px;
    color: #606a78;
    display: flex;
    align-items: center;
    p {
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        color: #f5222d;
      }
    }
    div {
      display: flex;
      align-items: center;
      p {
        width: 74px;
        height: 32px;
        cursor: pointer;
        margin-left: 12px;
        border-radius: 4px;
        border: 1px solid #606a78;
        &:first-child {
          margin-left: 30px;
        }
        &.active {
          color: #3860f4;
          border-color: #3860f4;
        }
      }
    }
  }
  @include e('text') {
    color: #606a78;
    font-size: 14px;
    margin-top: 20px;
    line-height: 26px;
    span {
      color: #3860f4;
    }
  }
  @include e('agreement') {
    margin: 40px 0 20px;
    span {
      color: #606a78;
      font-weight: 400;
    }
    .clause {
      color: #3860f4;
    }
  }
}
</style>
