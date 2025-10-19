<template>
  <button
    :type="type"
    :disabled="disabled"
    :style="computedButtonStyle"
    :class="['btn', iconOnly ? 'btn-icon-only' : '', disabled ? 'btn-disabled' : '', rounded ? 'btn-rounded' : '']"
    @click="handleClick"
  >
    <component
      v-if="(iconOnly || iconLeading) && icon"
      :is="icon"
      :style="{ width: '20px', height: '20px' }"
    />
    <span v-if="!iconOnly && text">{{ text }}</span>
    <component
      v-if="iconTrailing && icon"
      :is="icon"
      :style="{ width: '20px', height: '20px' }"
    />
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({

  text: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'button'
  },
  rounded: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  iconOnly: {
    type: Boolean,
    default: false
  },
  iconLeading: {
    type: Boolean,
    default: false
  },
  iconTrailing: {
    type: Boolean,
    default: false
  },
  icon: {
    type: [Object, Function],
    default: null
  },
  bgColor: {
    type: String,
    default: 'var(--bg-primary)'
  },
  textColor: {
    type: String,
    default: 'var(--text-primary)'
  },
  borderColor: {
    type: String,
    default: 'var(--border-primary)'
  },
  borderRadius: {
    type: String,
    default: '8px'
  }
});

const emit = defineEmits(['click']);

const computedButtonStyle = computed(() => {
  const baseStyle = {
    backgroundColor: props.bgColor,
    color: props.textColor,
    border: `1px solid ${props.borderColor}`,
    borderRadius: props.borderRadius,
    gap: '6px'
  };

  if (props.iconOnly) {
    return {
      ...baseStyle,
      width: '40px',
      height: '40px',
      padding: '10px'
    };
  }

  return {
    ...baseStyle,
    paddingTop: '8px',
    paddingRight: '20px',
    paddingBottom: '8px',
    paddingLeft: '20px'
  };
});

const handleClick = (event) => {
  if (!props.disabled) {
    emit('click', event);
  }
};
</script>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  outline: none;
  box-sizing: border-box;
}

.btn-icon-only {
  width: 40px;
  min-width: 40px;
  padding: 10px !important;
}

.btn:hover:not(.btn-disabled) {
  opacity: 0.9;
}

.btn:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}

.btn-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-rounded {
  border-radius: 9999px !important;
}
</style>
