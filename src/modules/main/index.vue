<template>
  <div class="bs-common-layout">
    <div class="bs-header"></div>
    <div class="bs-container">
      <div class="bs-aside">
        <bs-menu></bs-menu>
      </div>
      <div class="bs-main">
        <router-view v-slot="{ Component }">
          <transition name="bs-fade-in">
            <component :is="Component"></component>
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import BsMenu from './menu/index.vue';
</script>

<style lang="scss" scoped>
.bs-common-layout {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  .bs-header {
    height: 60px;
    box-sizing: border-box;
    background-color: getCssVar('bg-color', 'dark');
    border-bottom: getCssVar('border', 'light');
  }
  .bs-container {
    display: flex;
    width: 100%;
    height: calc(100vh - 60px);
    .bs-aside {
      width: 200px;
      height: 100%;
      box-sizing: border-box;
      overflow-y: overlay;
      background-color: getCssVar('bg-color', 'dark');
    }
    .bs-main {
      flex: 1;
      padding: 16px;
      overflow: overlay;
    }
  }
}
</style>
