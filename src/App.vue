<template>
  <ElConfigProvider :locale="zhCn">
    <router-view />
  </ElConfigProvider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { defineComponent, watch } from 'vue-demi'
import { useRoute } from 'vue-router'
defineComponent({
  zhCn
})
const route = useRoute()
watch(
  () => route.path,
  () => {
    if ((window as any)._czc) {
      const location = window.location
      const refererUrl = '/'
      const contentUrl = location.pathname + location.hash
      ;(window as any)._czc.push(['_trackPageview', contentUrl, refererUrl])
    }
  }
)
</script>

<style lang="scss" scoped></style>
