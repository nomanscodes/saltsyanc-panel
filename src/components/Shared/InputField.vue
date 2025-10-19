<template>
  <div class="flex-1" :class="containerClass">
    <div class="relative">
      <div v-if="icon" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <component :is="icon" class="size-token-lg" :style="{ color: iconColor || 'var(--text-tertiary)' }" />
      </div>
      <input
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :style="computedInputStyle"
        :readonly="readonly"
        :class="[
          'w-full box-border h-10 py-2.5 text-sm-regular transition-all',
          icon ? 'pl-10 pr-3' : 'px-3',
          disabled ? 'opacity-50 cursor-not-allowed' : '',
          inputClass
        ]"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  placeholderColor: {
    type: String,
    default: 'var(--text-placeholder)'
  },
  icon: {
    type: [Object, Function],
    default: null
  },
  iconColor: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  containerClass: {
    type: String,
    default: 'max-w-[300px]'
  },
  inputClass: {
    type: String,
    default: ''
  },
  bgColor: {
    type: String,
    default: 'transparent'
  },
  textColor: {
    type: String,
    default: '#ffffff'
  },
  borderColor: {
    type: String,
    default: 'var(--border-primary)'
  },
  borderWidth: {
    type: String,
    default: '1px'
  },
  borderRadius: {
    type: String,
    default: '8px'
  },
  focusRingColor: {
    type: String,
    default: 'var(--focus-ring)'
  },
  focusRingWidth: {
    type: String,
    default: '2px'
  },
  outlineColor: {
    type: String,
    default: ''
  },
  outlineWidth: {
    type: String,
    default: '0px'
  },
  outlineOffset: {
    type: String,
    default: '0px'
  },
  readonly: {
    type: Boolean,
    default: false
  }
});

const computedInputStyle = computed(() => ({
  backgroundColor: props.bgColor,
  color: props.textColor,
  border: `${props.borderWidth} solid ${props.borderColor}`,
  borderRadius: props.borderRadius,
  outline: props.outlineWidth !== '0px' ? `${props.outlineWidth} solid ${props.outlineColor || props.borderColor}` : 'none',
  outlineOffset: props.outlineOffset,
  '--placeholder-color': props.placeholderColor,
  '--focus-ring-color': props.focusRingColor,
  '--focus-ring-width': props.focusRingWidth
}));

defineEmits(['update:modelValue']);
</script>

<style scoped>
input::placeholder {
  color: var(--placeholder-color);
}

input:focus {
  outline: none;
  box-shadow: 0 0 0 var(--focus-ring-width) var(--focus-ring-color);
}
</style>
