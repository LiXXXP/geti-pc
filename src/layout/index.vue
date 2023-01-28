<template>
  <div style="height: 100%">
    <Header />
    <div class="gwin-geti-app-main">
      <Sidebar v-if="!key" />
      <div class="gwin-geti-app-right">
        <Content class="gwin-geti-app-content" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import Header from './components/header.vue'
import Sidebar from './components/sidebar.vue'
import Content from './components/content.vue'

const route = useRoute()
const key = computed(() => {
  return route.path.includes('changePassword') || route.path.includes('changeMobile')
})
</script>

<style lang="scss" scoped>
@import '../styles/mixin.scss';

@include b('app-main') {
  width: 100%;
  min-height: calc(100vh - 50px);
  background: hsl(0, 0%, 95%);
  display: flex;
}
@include b('app-right') {
  width: 100%;
  overflow: hidden;
}
@include b('app-tags') {
  background: #fff;
  border-top: 1px solid #f5f5f5;
}
@include b('app-content') {
  border-top: 1px solid #f5f5f5;
  flex: 1;
  padding: 20px;
}
</style>
