<template>
  <div
    :class="[
      'bs-input',
      { 'bs-input-hover': hovering, 'bs-input-disabled': inputDisabled },
    ]"
    @mouseleave="onMouseleave"
    @mouseenter="onMouseenter"
  >
    <i v-if="prefixIcon" :class="['iconfont', 'prefix-icon', prefixIcon]"></i>
    <input
      ref="inputEl"
      :type="type"
      :placeholder="placeholder"
      :disabled="inputDisabled"
      :readonly="readonly"
      :maxlength="maxlength"
      :minlength="minlength"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      @change="onChange"
      @keydown="onKeyDown"
    />
    <i v-show="showClear" @click="onClear" class="iconfont icon-wrong"></i>
    <i
      v-if="suffixIcon"
      @click="onSuffixClick"
      :class="['iconfont', 'suffix-icon', suffixIcon]"
    ></i>
  </div>
</template>

<script setup>
import { isString } from '@vue/shared';
import { ref, computed, shallowRef, nextTick, watch } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  suffixIcon: {
    type: String,
  },
  prefixIcon: {
    type: String,
  },
  maxlength: {
    type: String,
  },
  minlength: {
    type: String,
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  modelValue: {
    type: String,
    default: '',
  },
});

const inputEl = shallowRef();
const inputValue = computed(() => inputEl.value);
const nativeInputValue = computed(() =>
  props.modelValue ? props.modelValue : '',
);
const setNativeInputValue = () => {
  const input = inputValue.value;
  if (!input || input.value === nativeInputValue.value) return;
  input.value = nativeInputValue.value;
};
watch(nativeInputValue, () => setNativeInputValue());

const inputDisabled = computed(() => props.disabled);

const focused = ref(false);
const hovering = ref(false);

const showClear = computed(
  () =>
    props.clearable &&
    !props.readonly &&
    !inputDisabled.value &&
    !!nativeInputValue.value &&
    (focused.value || hovering.value),
);

const emit = defineEmits({
  'update:modelValue': value => isString(value),
  input: value => isString(value),
  change: value => isString(value),
  clear: () => true,
  focus: evt => evt instanceof FocusEvent,
  blur: evt => evt instanceof FocusEvent,
  keydown: evt => evt instanceof Event,
  click: evt => evt instanceof Event,
});

const onInput = async e => {
  const { value } = e.target;
  emit('update:modelValue', value);
  emit('input', value);
  emit('change', value);
  await nextTick();
  setNativeInputValue();
};
const onClear = () => {
  emit('update:modelValue', '');
  emit('clear');
  emit('input', '');
  emit('change', '');
};
const onFocus = e => {
  focused.value = true;
  emit('focus', e);
};
const onBlur = e => {
  focused.value = false;
  emit('blur', e);
};
const onChange = e => {
  const { value } = e.target;
  emit('update:modelValue', value);
  emit('change', value);
};
const onMouseleave = () => {
  if (props.disabled || props.readonly) return;
  hovering.value = false;
};
const onMouseenter = () => {
  if (props.disabled || props.readonly) return;
  hovering.value = true;
};
const onSuffixClick = e => {
  if (!props.suffixIcon) return;
  emit('click', e);
};
const onKeyDown = evt => {
  emit('keydown', evt);
};
</script>

<style lang="scss" scoped>
.bs-input {
  border: getCssVar('border');
  border-radius: getCssVar('border-radius', 'base');
  padding: 0 5px;
  height: 32px;
  display: flex;
  align-items: center;
  input {
    width: 100%;
    height: 100%;
    margin-top: 5px;
    &::-ms-reveal {
      display: none;
    }
  }
  .icon-wrong,
  .suffix-icon {
    cursor: pointer;
    margin-left: 5px;
  }
  .prefix-icon {
    margin-right: 5px;
  }
}
.bs-input-hover {
  &:hover,
  &:focus-within {
    border: getCssVar('border', 'hover');
  }
}
.bs-input-disabled {
  background: getCssVar('bg-color', 'disabled');
}
</style>
