<template>
  <div class="gwin-geti-information">
    <div class="basic">
      <div class="title">基本信息</div>
      <div class="gwin-geti-information__name">
        <svg class="svg-icon icon name" aria-hidden="true">
          <use xlink:href="#icon-gwin-default-portrait" />
        </svg>
        <div class="info">
          <p>
            <span class="item">登录账号：</span>
            <span>{{ infoState.basicInfo.mobile }}</span>
          </p>
          <p>
            <span class="item">账号ID：</span>
            <span>{{ infoState.basicInfo.id }}</span>
          </p>
          <p>
            <span class="item">注册时间：</span>
            <span>{{ formatStapTime(infoState.basicInfo.createAt, 1) }}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="contact">
      <div class="hint">基本资料以实名信息为准，以下信息仅供参考，填写以下信息方便我们更好为您服务</div>
      <div class="title">联系信息</div>
      <el-form
        ref="ruleForm"
        :model="infoState.ruleForm"
        :rules="infoState.rules"
        label-width="100px"
        label-position="left"
        style="width: 520px"
      >
        <el-form-item label="姓名：" prop="realName">
          <el-input v-model="infoState.ruleForm.realName" clearable placeholder="请输入姓名" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input v-model="infoState.ruleForm.email" clearable placeholder="请输入邮箱" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="身份证号：" prop="idCard">
          <el-input
            v-model="infoState.ruleForm.idCard"
            clearable
            placeholder="请输入身份证号"
            maxlength="30"
          ></el-input>
        </el-form-item>
        <el-form-item label="国家地区：">
          <div>{{ infoState.ruleForm.country }}</div>
        </el-form-item>
        <el-form-item label="所在地：">
          <el-cascader
            v-model="infoState.ruleForm.district"
            style="width: 100%"
            placeholder="请选择地区"
            :options="infoState.regionList"
            :props="infoState.props"
            @change="handleChangeRegion"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="街道地址：">
          <el-input v-model="infoState.ruleForm.address" clearable placeholder="请输入地址" maxlength="100"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit-btn" @click="handleSave(ruleForm)">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { formatStapTime } from '@/utils/index'
import { infoState, useInfoMethod } from './info'
const { ruleForm, getUserInquiry, handleChangeRegion, handleSave } = useInfoMethod()
onMounted(() => {
  getUserInquiry()
})
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('information') {
  @include e('name') {
    display: flex;
    align-items: center;
  }
  .title {
    color: #121212;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 20px;
    &::before {
      content: '';
      width: 4px;
      height: 18px;
      margin-right: 6px;
      display: inline-block;
      vertical-align: text-bottom;
      background-color: #3c7dff;
    }
  }
  .basic {
    width: 100%;
    height: 200px;
    padding: 30px;
    box-sizing: border-box;
    background-color: #fff;
    .name {
      width: 88px;
      height: 88px;
      margin-right: 30px;
      border-radius: 100%;
    }
    .info {
      color: #121212;
      font-size: 14px;
      p {
        margin-top: 10px;
        .item {
          min-width: 70px;
          color: #999;
          margin-right: 20px;
          display: inline-block;
        }
      }
    }
  }
  .contact {
    width: 100%;
    margin-top: 20px;
    min-height: 420px;
    padding: 20px 30px;
    box-sizing: border-box;
    background-color: #fff;
    .hint {
      width: 100%;
      height: 40px;
      min-width: 670px;
      color: #121212;
      font-size: 14px;
      padding: 0 20px;
      line-height: 40px;
      border-radius: 2px;
      margin-bottom: 30px;
      box-sizing: border-box;
      border: 1px solid #3c7dff;
      background: rgba(60, 125, 255, 0.08);
    }
    .submit-btn {
      width: 132px;
      height: 44px;
      background: #3c7dff;
      border-radius: 4px;
    }
  }
}
</style>
