<template>
  <router-view v-slot="{ Component }">
    <transition name="bs-fade-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>
