<template>
  <div class="gwin-geti-search">
    <div class="gwin-geti-search__nav">
      <p
        v-for="(item, index) in searchState.navs"
        :key="item"
        :class="{ active: index === searchState.currentIndex }"
        @click="cutNav(index)"
      >
        {{ item }}
      </p>
      <div></div>
    </div>
    <div class="gwin-geti-search__row">
      <p>车牌号 :</p>
      <el-select
        v-model="searchState.province"
        filterable
        placeholder="京"
        :disabled="searchState.isExperience"
        style="width: 25%"
      >
        <el-option v-for="item in searchState.options" :key="item" :label="item" :value="item" />
      </el-select>
      <el-input
        v-model="searchState.number"
        style="margin-left: 10px"
        maxlength="7"
        minlength="6"
        placeholder="请输入车牌字母部分，例如：A12345"
        :disabled="searchState.isExperience"
        @blur="onBlur"
      />
    </div>
    <div class="gwin-geti-search__row">
      <p>车牌颜色 :</p>
      <el-select
        v-model="searchState.plateColor"
        placeholder="黄牌"
        :disabled="searchState.isExperience"
        style="width: 100%"
      >
        <el-option v-for="item in searchState.carColorList" :key="item" :label="item.label" :value="item.value" />
      </el-select>
    </div>
    <div v-if="searchState.currentIndex === 1" class="gwin-geti-search__row">
      <p>轨迹区间 :</p>
      <el-date-picker
        v-model="searchState.time"
        clearable
        type="datetimerange"
        range-separator="—"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        format="YYYY/MM/DD HH:mm"
        value-format="YYYY/MM/DD HH:mm"
        :default-time="searchState.defaultTime"
        :disabled-date="disabledDate"
        :disabled="searchState.isExperience"
      />
    </div>
    <div v-if="searchState.currentIndex === 1" class="gwin-geti-search__tip">
      <i></i>
      <p>单次只能查询车辆近半年24小时内的行驶轨迹</p>
    </div>
    <div class="gwin-geti-search__btn" @click="getCarLocation">开始查询</div>
  </div>
</template>

<script lang="ts" setup>
import { searchState, useSearchMethod } from './search'
const { disabledDate, cutNav, onBlur, getCarLocation } = useSearchMethod()
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('search') {
  width: 454px;
  z-index: 999;
  padding: 14px 0 10px;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 70px;
  left: 20px;
  @include e('nav') {
    display: flex;
    font-size: 16px;
    color: #606a78;
    padding-bottom: 14px;
    align-items: center;
    justify-content: space-around;
    border-bottom: 1px solid #e1e5f5;
    position: relative;
    p {
      cursor: pointer;
      &.active {
        color: #1a2234;
        font-weight: 600;
      }
    }
    div {
      width: 2px;
      height: 24px;
      background: #f0f2fa;
      position: absolute;
    }
  }
  @include e('row') {
    padding: 20px;
    display: flex;
    padding-bottom: 0;
    align-items: center;
    p {
      min-width: 70px;
      font-size: 14px;
      color: #606a78;
      margin-right: 10px;
      font-weight: 400;
    }
  }
  @include e('tip') {
    display: flex;
    font-size: 14px;
    color: #606a78;
    padding: 20px;
    padding-bottom: 0;
    align-items: center;
    i {
      width: 16px;
      height: 16px;
      margin-right: 6px;
      background: url('@/assets/imgs/home/icon-tip.png') no-repeat 0 0;
      background-size: 100%;
    }
  }
  @include e('btn') {
    width: 202px;
    height: 48px;
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    line-height: 48px;
    text-align: center;
    border-radius: 24px;
    margin: 20px auto 10px;
    background-color: #3c7dff;
  }
}

::deep {
  .el-input__wrapper {
    height: 48px;
    border-radius: 10px;
    border: 1px solid #f0f2fa;
    box-shadow: none;
  }

  .el-input.is-disabled .el-input__wrapper {
    box-shadow: none;
  }
}
</style>
