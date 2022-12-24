<template>
  <button :class="['bs-button', typeClass]" :disabled="disabled">
    <i v-if="prefixIcon" :class="['iconfont', 'prefix-icon', prefixIcon]"></i>
    <slot></slot>
    <i v-if="suffixIcon" :class="['iconfont', 'suffix-icon', suffixIcon]"></i>
  </button>
</template>

<script>
import { defineComponent, computed } from 'vue';

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
    type: {
      type: String,
    },
  },
  setup(props) {
    const typeClass = computed(() => {
      switch (props.type) {
        case 'primary':
          return 'bs-button-primary';
        case 'success':
          return 'bs-button-success';
        case 'info':
          return 'bs-button-info';
        case 'warning':
          return 'bs-button-warning';
        default:
          return '';
      }
    });
    return {
      ...props,
      typeClass,
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
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: getCssVar('text-color', 'dark');
  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    background: getCssVar('bg-color', 'disabled');
    color: getCssVar('text-color', 'light');
    cursor: not-allowed;
  }
}
.bs-button-primary {
  background: getCssVar('colors', 'primary');
  color: getCssVar('text-color', 'light');
}
.bs-button-success {
  background: getCssVar('colors', 'success');
  color: getCssVar('text-color', 'light');
}
.bs-button-info {
  background: getCssVar('colors', 'info');
  color: getCssVar('text-color', 'light');
}
.bs-button-warning {
  background: getCssVar('colors', 'warning');
  color: getCssVar('text-color', 'light');
}
</style>
