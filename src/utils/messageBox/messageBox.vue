<template>
  <transition name="bs-fade-in-linear" @after-leave="$emit('vanish')">
    <div
      @keydown.esc="onEsc"
      tabindex="-1"
      v-show="visible"
      ref="MessageBox"
      class="bs-mask-layer"
    >
      <div class="bs-message-box bs-animation-message-box">
        <i
          v-if="close"
          @click="onClose"
          class="iconfont icon-wrong bs-message-box-close"
        ></i>
        <h2 class="bs-message-box-title">
          {{ title }}
        </h2>
        <p class="bs-message-box-msg">
          <i :class="['iconfont', typeIcon]"></i>{{ message }}
        </p>
        <div class="bs-message-box-button">
          <bs-button @click="onCancel">取消</bs-button>
          <bs-button type="primary" @click="onConfirm">确认</bs-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { defineComponent, ref, computed, watch, nextTick } from 'vue';
import BsButton from '@comp/button/index.vue';
export default defineComponent({
  components: {
    BsButton,
  },
  props: {
    type: {
      type: String,
      default: '',
      validator: val => ['success', 'warning', 'info', 'error'].includes(val),
    },
    message: {
      type: String,
    },
    title: {
      type: String,
    },
    confirmText: {
      type: String,
    },
    confirmShow: {
      type: Boolean,
    },
    cancelText: {
      type: String,
    },
    cancelShow: {
      type: Boolean,
    },
    close: {
      type: Boolean,
    },
  },
  emits: ['vanish', 'action'],
  setup(props, { emit }) {
    const visible = ref(false);
    const MessageBox = ref(null);

    const onConfirm = () => {
      visible.value = false;
      emit('action', 'confirm');
    };
    const onCancel = () => {
      visible.value = false;
      emit('action', 'cancel');
    };
    const onClose = () => {
      visible.value = false;
      emit('action', 'close');
    };
    const onEsc = () => {
      visible.value = false;
      emit('action', 'close');
    };

    watch(visible, () => {
      nextTick().then(() => {
        MessageBox.value.focus();
      });
    });

    const typeIcon = computed(() => {
      switch (props.type) {
        case 'warning':
          return 'icon-information';
        case 'info':
          return 'icon-help';
        case 'error':
          return 'icon-wrong';
        default:
          return 'icon-success';
      }
    });

    return {
      visible,
      onConfirm,
      onCancel,
      onClose,
      onEsc,
      typeIcon,
      MessageBox,
    };
  },
});
</script>

<style lang="scss" scoped>
.bs-mask-layer {
  display: flex;
  align-items: center;
  justify-content: center;
  .bs-message-box {
    position: relative;
    width: 420px;
    min-height: 140px;
    box-sizing: border-box;
    background: getCssVar('bg-color', 'light');
    border-radius: getCssVar('border-radius', 'base');
    padding: 26px 20px 16px 20px;
    box-shadow: getCssVar('box-shadow');
    display: flex;
    flex-direction: column;
    .bs-message-box-close {
      position: absolute;
      right: 15px;
      top: 7px;
      font-size: 1.5em;
      cursor: pointer;
      &:hover {
        transform: scale(1.2);
      }
    }
    .bs-message-box-msg {
      font-size: 1.2em;
      display: flex;
      align-items: center;
      padding: 10px 0;
      .iconfont {
        margin-right: 10px;
        font-size: 1.2em;
        font-weight: bold;
      }
      .icon-information {
        color: getCssVar('colors', 'warning');
      }
      .icon-wrong {
        color: getCssVar('colors', 'error');
      }
      .icon-success {
        color: getCssVar('colors', 'success');
      }
      .icon-help {
        color: getCssVar('colors', 'info');
      }
    }
    .bs-message-box-button {
      display: flex;
      justify-content: flex-end;
      gap: 15px;
      margin-top: auto;
    }
  }
}
</style>
