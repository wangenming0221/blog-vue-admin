<template>
  <a-layout class="app-wrapper">
      <!-- 侧边栏 -->
      <SideBar class="sidebar-container" />

      <a-layout class="main-container">
        <a-layout-header class="fixed-header" :style="{ background: '#fff' }">

        </a-layout-header>

        <div class="fixed-content">
          <AppMain />
        </div>
      </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
  import SideBar from "./SideBar.vue";
  import AppMain from "./AppMain.vue";

</script>

<style lang="scss" scoped>


</style>