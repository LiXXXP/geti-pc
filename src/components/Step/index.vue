<template>
  <div class="steps">
    <el-steps :active="props.stepActive" finish-status="success" align-center>
      <el-step v-for="item in props.stepTitle" :key="item">
        <template #title>
          <span>{{ item }}</span>
        </template>
      </el-step>
    </el-steps>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  stepActive?: number
  stepTitle?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  stepActive: 0,
  stepTitle: () => []
})
</script>

<style lang="scss" scoped>
.steps {
  width: 720px;
  margin-bottom: 90px;
  :deep(.el-step__icon) {
    width: 43px;
    height: 43px;
    color: #999;
    font-size: 20px;
    border: 1px solid #999;
  }
  :deep(.el-step__icon-inner) {
    font-weight: 400;
  }
  :deep(.el-step__head.is-process .el-step__icon) {
    color: #fff;
    border: 1px solid #3c7dff;
    background-color: #3c7dff;
  }
  :deep(.el-step__head.is-success .el-step__icon) {
    color: #3c7dff;
    border: 1px solid #3c7dff;
  }
  :deep(.el-step__head.is-success .el-step__line) {
    background-color: #3c7dff;
  }
  :deep(.el-step__title.is-success) {
    color: #3c7dff;
  }
  :deep(.el-step__title.is-wait) {
    color: #999;
  }
  :deep(.el-step.is-horizontal .el-step__line) {
    top: 20px;
    left: 70%;
    right: -30%;
    height: 1px;
    i {
      border-width: 0;
    }
  }
}
</style>
