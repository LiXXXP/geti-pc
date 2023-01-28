<template>
  <div class="gwin-geti-index">
    <div id="mapA" class="gwin-geti-map"></div>
    <div class="gwin-geti-index__panel">
      <!-- <div class="gwin-geti-index__init" @click="mapInit"></div> -->
      <div class="gwin-geti-order__title">{{ data.plateNo }} -- 轨迹回放</div>
      <div class="gwin-geti-hr"></div>
      <div class="gwin-geti-order">
        <div class="gwin-geti-order__line">
          <span class="gwin-geti-order__label">起点：</span>
          <p class="gwin-geti-order__txt">{{ data.routeInfo.departureAddress }}</p>
        </div>
        <div class="gwin-geti-order__line">
          <span class="gwin-geti-order__label">终点：</span>
          <p class="gwin-geti-order__txt">{{ data.routeInfo.destinationAddress }}</p>
        </div>
        <div class="gwin-geti-order__line">
          <span class="gwin-geti-order__label">里程：</span>
          <p class="gwin-geti-order__txt">{{ data.routeInfo.totalDistance }}km</p>
        </div>
        <div class="gwin-geti-order__line">
          <span class="gwin-geti-order__label">停留次数：</span>
          <p class="gwin-geti-order__txt">{{ data.stopNum }}次</p>
        </div>
        <div class="gwin-geti-order__line">
          <span class="gwin-geti-order__label">超速次数：</span>
          <p class="gwin-geti-order__txt">{{ data.overspeedNum }}次</p>
        </div>
        <div class="gwin-geti-box">
          <div class="gwin-geti-box__slider">
            <el-slider
              v-model="playerData.sliderVal"
              :show-tooltip="false"
              size="small"
              :step="0.001"
              @change="sliderChange"
            />
            <div class="gwin-geti-time-box">
              <span class="gwin-geti-time-box__time-txt">{{ playerData.passedTime }}</span>
              <span class="gwin-geti-time-box__time-txt">{{ playerData.totalTime }}</span>
            </div>
          </div>
          <div class="gwin-geti-player">
            <div class="gwin-geti-player__double-speed">
              <el-select v-model="playerData.times" style="width: 46px" suffix-icon="" @change="onConfirm">
                <el-option v-for="item in doubleSpeed" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
              <img class="gwin-geti-player__speed-img" :src="speedIcon" />
            </div>
            <img
              v-if="!playerData.isPlay"
              class="gwin-geti-player__player-img"
              :src="startIcon"
              @click="navgControl(playerData.playIcon)"
            />
            <img v-else class="gwin-geti-player__player-img" :src="pauseIcon" @click="navgControl('pause')" />
          </div>
        </div>
      </div>
    </div>
    <Header></Header>
    <contact></contact>
  </div>
</template>

<script lang="ts" setup>
import Contact from '@/components/Contact/index.vue'
import Header from '@/components/Header/index.vue'
import speedIcon from '@/assets/imgs/truck/icon-down.png'
import startIcon from '@/assets/imgs/truck/icon-start.png'
import pauseIcon from '@/assets/imgs/truck/icon-pause.png'
import indexConfig from './index-config'

const { data, playerData, doubleSpeed, onConfirm, navgControl, sliderChange } = indexConfig()
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';

@include b(index) {
  width: 100%;
  height: 100%;

  @include e(panel) {
    position: fixed;
    top: 70px;
    left: 20px;
    width: 454px;
    box-sizing: border-box;
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  }

  @include e(content) {
    width: 100%;
    overflow: auto;
    position: relative;
  }

  @include e(init) {
    position: absolute;
    right: 10px;
    top: -50px;
    width: 30px;
    height: 30px;
    background-image: url('../../assets/imgs/truck/icon-init.png');
    background-size: 100%;
  }
}

@include b(map) {
  width: 100%;
  height: 100%;
}

@include b(hr) {
  width: 100%;
  height: 1px;
  background-color: hsla(228, 50%, 92%, 0.3);
}

@include b(order) {
  width: 100%;
  position: relative;
  padding: 20px;
  @include e(title) {
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #1a2234;
    text-align: center;
    padding: 15px 0;
  }

  @include e(line) {
    display: flex;
    margin-top: 12px;
    align-items: flex-start;

    &:first-child {
      margin-top: 0;
    }
  }

  @include e(label) {
    width: 80px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #606a78;
    flex-shrink: 0;
  }

  @include e(txt) {
    margin-left: 10px;
    font-size: 14px;
    font-family: Roboto-Regular, Roboto;
    font-weight: 400;
    color: #606a78;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 20px;
  }

  @include e(trajectory) {
    position: absolute;
    right: 20px;
    bottom: 20px;
    border: 1px solid #eeeeee;
    padding: 8px 20px;
    font-size: 14px;
    background: #3c7dff;
    box-shadow: 0px 1px 2px 0px rgba(60, 125, 255, 0.2);
    border-radius: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    letter-spacing: 2px;
  }
}

@include b(box) {
  display: flex;
  margin-top: 20px;
  justify-content: space-between;

  @include e(slider) {
    width: 300px;
    flex-shrink: 0;
  }
}

@include b(time-box) {
  margin-top: 6px;
  display: flex;
  justify-content: space-between;

  @include e(time-txt) {
    font-size: 12px;
    font-family: Roboto-Regular;
    font-weight: 400;
    color: #606a78;
  }
}

@include b(player) {
  display: flex;
  justify-content: space-between;

  @include e(double-speed) {
    display: flex;
    align-items: center;
    height: 24px;
    position: relative;
  }

  @include e(speed-txt) {
    color: #3c7dff;
  }

  @include e(speed-img) {
    position: absolute;
    top: 10px;
    right: 0;
    width: 6px;
    height: 4px;
    z-index: 1;
  }

  @include e(player-img) {
    margin-left: 10px;
    margin-top: -10px;
    width: 40px;
    height: 40px;
  }
}

::deep {
  .el-slider__button {
    width: 15px;
    height: 24px;
    background: #ffffff;
    border-radius: 8px;
    border: 1px solid #4885ff;
  }

  .el-slider__bar {
    background: linear-gradient(180deg, #8bb2ff 0%, #4785ff 100%);
    border-radius: 2px;
  }

  .el-slider__runway {
    background: #f6f6f6;
    border-radius: 2px;
  }

  .el-select .el-input__wrapper {
    padding: 1px 0;
    box-shadow: none !important;
    background-color: transparent;
    z-index: 9;
  }

  .el-select .el-input.is-focus .el-input__wrapper {
    box-shadow: none !important;
  }

  .el-input__inner {
    text-align: center;
  }
}
</style>
