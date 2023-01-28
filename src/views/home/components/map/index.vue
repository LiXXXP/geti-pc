<template>
  <div id="map" class="gwin-geti-map"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useMapMethod } from './map'
const { initMap, destroyMap } = useMapMethod()

onMounted(() => {
  initMap()
})

onUnmounted(() => {
  destroyMap()
})
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('map') {
  width: 100vw;
  height: 100%;
}
</style>
