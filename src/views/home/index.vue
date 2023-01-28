<template>
  <div class="gwin-geti-home">
    <Header></Header>
    <Map></Map>
    <Search></Search>
    <Info></Info>
    <Contact></Contact>
  </div>
</template>

<script setup lang="ts">
import Map from '@/views/home/components/map/index.vue'
import Search from '@/views/home/components/search/index.vue'
import Info from '@/views/home/components/info/index.vue'
import Header from '@/layout/components/header.vue'
import Contact from '@/components/Contact/index.vue'
</script>

<style lang="scss" scoped>
@import '../../styles/mixin.scss';
@include b('home') {
  width: 100vw;
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
  overflow-y: overlay;
  position: relative;
}
</style>
