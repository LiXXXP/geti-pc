<template>
  <div v-if="searchState.carInfo && searchState.currentIndex === 0" class="gwin-geti-info" style="top: 400px">
    <p><span>当前位置：</span>{{ searchState.carInfo.detailAddress }}</p>
    <p><span>时速：</span>{{ searchState.carInfo.speed }} km/h</p>
    <p><span>方向：</span>{{ searchState.carInfo.directionTxt }}</p>
  </div>
  <div v-if="searchState.currentIndex === 1 && searchState.routeInfo" class="gwin-geti-info" style="top: 505px">
    <p><span>时间：</span>{{ searchState.displayTime[0] }} - {{ searchState.displayTime[1] }}</p>
    <p><span>起点：</span>{{ searchState.routeInfo.departureAddress }}</p>
    <p><span>终点：</span>{{ searchState.routeInfo.destinationAddress }}</p>
    <p><span>里程：</span>{{ searchState.routeInfo.totalDistance }} km</p>
    <p><span>停留次数：</span>{{ searchState.abnormalNum }} 次</p>
    <p><span>超速次数：</span>{{ searchState.overspeedNum }} 次</p>
    <p><i></i>超速查询仅作为参考，具体以实际路况为准</p>
    <div class="gwin-geti-info__btn" @click="toTrajectory">轨迹回放</div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { searchState } from '@/views/home/components/search/search'

const router = useRouter()

const toTrajectory = () => {
  const playback = router.resolve({
    path: 'truckRoutePlayback',
    query: {
      plateColor: searchState.plateColor,
      startTime: searchState.time[0],
      endTime: searchState.time[1],
      plateNo: searchState.province + searchState.number
    }
  })
  window.open(playback.href, '_blank') // 打开新的窗口(跳转路径，跳转类型)
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('info') {
  width: 454px;
  z-index: 999;
  padding: 20px;
  padding-bottom: 6px;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  position: absolute;
  left: 20px;
  p {
    font-size: 14px;
    color: #606a78;
    margin-bottom: 10px;
    span {
      width: 80px;
      display: inline-block;
    }
    i {
      width: 16px;
      height: 16px;
      margin-right: 8px;
      display: inline-block;
      vertical-align: text-bottom;
      background: url('@/assets/imgs/home/icon-tip.png') no-repeat 0 0;
      background-size: 100%;
    }
  }
  @include e('btn') {
    width: 414px;
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
</style>
