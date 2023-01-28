<template>
  <div class="gwin-geti-rule">
    <div class="gwin-geti-rule__title">收费规则</div>
    <p>1、货车实时位置查询收取0.45元/次（每车每天），即一辆车一天内最多扣费0.45元；未查询到结果，不收费。</p>
    <p>
      2、货车历史轨迹查询收取1.50元/次（每车每天），即一辆车一天内一次或多次查询一天（查询一天指自然日的0：00-24：00）按一次扣费。
      若同一天查询同一车辆跨天或多天的日期，则按每车每天1.50元/次收取。若同一天同一车辆在查过的日期上新增跨天或多天查询，则只收取新增日期的费用。
      示例：当天内查了起始时间为7月2日08：00至7月3日06：00，则收二次费用。
    </p>
    <p>3、若有特殊查询需求可与客服联系，联系方式：185 1567 6583</p>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('rule') {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: #fff;
  @include e('title') {
    font-size: 16px;
    font-weight: 600;
    color: #121212;
    padding-bottom: 20px;
    border-bottom: 1px solid #d9d9d9;
  }
  p {
    color: #666;
    padding: 30px;
    font-size: 14px;
    line-height: 30px;
    padding-bottom: 0;
  }
}
</style>
