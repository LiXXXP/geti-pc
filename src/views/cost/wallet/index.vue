<template>
  <div class="gwin-geti-wallet">
    <div class="gwin-geti-wallet__header">
      <el-row justify="space-between">
        <div class="gwin-geti-wallet__title">我的钱包</div>
        <span class="gwin-geti-wallet__pay" @click="toPay">充值</span>
      </el-row>
      <el-row class="gwin-geti-money">
        <p>¥</p>
        <span>{{ walletState.banlance }}</span>
      </el-row>
    </div>
    <div class="gwin-geti-table-bg">
      <el-row justify="space-around">
        <el-col :span="20" :xs="10" :sm="12" :md="16" :lg="17" :xl="20">
          <el-row :gutter="20">
            <el-col :span="5">
              <el-select v-model="walletState.formData.category" clearable placeholder="全部交易类型">
                <el-option
                  v-for="item in walletState.moneyType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="5">
              <el-select v-model="walletState.formData.item" clearable placeholder="全部交易项">
                <el-option
                  v-for="item in walletState.moneyItem"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="8">
              <el-date-picker
                v-model="walletState.formData.time"
                clearable
                end-placeholder="结束日期"
                range-separator=" - "
                start-placeholder="开始日期"
                :default-time="defaultTime"
                type="daterange"
              >
              </el-date-picker>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4" :xs="14" :sm="12" :md="8" :lg="7" :xl="4" style="text-align: right">
          <el-button type="primary" @click="getProductList">查询</el-button>
          <el-button @click="clearSelection">重置</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="walletState.tableData"
        :header-cell-style="{ background: '#FAFBFD', color: '#1A2234' }"
        style="width: 100%; margin-top: 30px"
      >
        <el-table-column label="流水号" prop="id" />
        <el-table-column label="支付方式" prop="payMethod" />
        <el-table-column label="交易类型">
          <template #default="scope">
            <span v-if="scope.row.category">{{ scope.row.category == 1 ? '充值' : '扣费' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="交易金额(元)">
          <template #default="scope">
            <span v-if="scope.row.amount">{{
              scope.row.category == 1 ? '+' + scope.row.amount : '-' + scope.row.amount
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="钱包余额" prop="balance" />
        <el-table-column label="交易项" prop="item" />
        <el-table-column label="说明" prop="memo">
          <template #default="scope">
            <el-popover trigger="hover" :content="scope.row.memo">
              <template #reference>
                <el-button type="text" class="gwin-platform-text">{{ scope.row.memo }}</el-button>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="交易时间">
          <template #default="scope">
            <span v-if="scope.row.createAt">{{ formatStapTime(scope.row.createAt, 1) }}</span>
          </template>
        </el-table-column>
      </el-table>
      <Pagination
        :current-page="walletState.pageParam.pageNum"
        :page-size="walletState.pageParam.pageSize"
        :total="walletState.pageParam.total"
        @current-change="currentChange"
        @size-change="sizeChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'

import Pagination from '@/components/Pagination/index.vue'
import { formatStapTime } from '@/utils'
import { walletState, useWalletMethod } from './wallet'

const { defaultTime, getMoney, getProductList, clearSelection, currentChange, sizeChange, toPay } = useWalletMethod()
onMounted(() => {
  Promise.all([getMoney(), getProductList()])
})
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('wallet') {
  box-sizing: border-box;
  @include e('header') {
    padding: 20px;
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
  @include e('pay') {
    color: #3860f4;
    font-size: 14px;
    cursor: pointer;
  }
}
@include b('money') {
  font-size: 22px;
  font-weight: 500;
  color: #1a2234;
  margin-top: 20px;
  display: flex;
  align-items: center;
  font-family: Roboto-Medium, Roboto;
  span {
    font-size: 32px;
    font-weight: 600;
    margin-left: 6px;
  }
}
@include b('table-bg') {
  width: 100%;
  padding: 20px;
  margin-top: 20px;
  background-color: #fff;
}
</style>
