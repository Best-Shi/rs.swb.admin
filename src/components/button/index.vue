<template>
  <button class="bs-button" :disabled="disabled">
    <i v-if="prefixIcon" :class="['iconfont', 'prefix-icon', prefixIcon]"></i>
    <slot></slot>
    <i v-if="suffixIcon" :class="['iconfont', 'suffix-icon', suffixIcon]"></i>
  </button>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BsButton',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    suffixIcon: {
      type: String,
    },
    prefixIcon: {
      type: String,
    },
  },
  setup(props) {
    return {
      ...props,
    };
  },
});
</script>

<style lang="scss" scoped>
.bs-button {
  border: getCssVar('border');
  border-radius: getCssVar('border-radius', 'base');
  height: 32px;
  box-sizing: border-box;
  padding: 5px 10px;
  text-align: center;
  background: getCssVar('bg-color', 'dark');
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: getCssVar('text-color', 'light');
  &:hover {
    background: getCssVar('bg-color', 'hover');
  }
  &:disabled {
    background: getCssVar('bg-color', 'disabled');
  }
}
</style>
