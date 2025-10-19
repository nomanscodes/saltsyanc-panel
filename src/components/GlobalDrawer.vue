<template>
  <Teleport to="body">
    <Transition name="drawer">
      <div v-if="modelValue" class="fixed inset-0 z-50 overflow-hidden" @keydown.esc="handleClose" role="dialog"
        aria-modal="true" :aria-labelledby="titleId">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/60 transition-opacity" @click="handleBackdropClick" aria-hidden="true">
        </div>

        <!-- Drawer Panel -->
        <div ref="drawerRef" :class="[
          'absolute bg-[var(--bg-primary)] shadow-xl flex flex-col transition-transform',
          sizeClasses,
          sideClasses
        ]" @click.stop>

          <svg class="absolute top-0 lef-0 bottom-0" viewBox="0 0 355 368" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.8" filter="url(#filter0_f_714_18999)">
              <path
                d="M213.299 406.719L-38.1532 91.2456C-38.6238 90.6553 -38.7218 89.8503 -38.4067 89.1643L14.9322 -26.9611C15.6757 -28.5796 18.0045 -28.4923 18.6246 -26.8227L75.2249 125.578C76.0453 127.787 73.0372 129.35 71.7021 127.408L13.089 42.1703L216.607 404.493C217.811 406.638 214.832 408.643 213.299 406.719Z"
                fill="#6C9BE8" />
              <path opacity="0.5"
                d="M39.9427 156.487L-53.8178 38.4071C-55.5692 36.2015 -55.8281 33.1611 -54.4751 30.6911L-31.3264 -11.5666C-28.9725 -15.8636 -23.046 -16.4752 -19.8641 -12.7494L79.4796 103.577C85.0466 110.096 76.2681 118.987 69.679 113.504L37.9825 87.1258C32.2564 82.3605 24.038 88.6495 27.1409 95.4221L51.7885 149.218C55.2329 156.736 45.085 162.963 39.9427 156.487Z"
                fill="#BBD1F4" />
            </g>
            <defs>
              <filter id="filter0_f_714_18999" x="-143.036" y="-115.826" width="447.623" height="611.02"
                filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="43.85" result="effect1_foregroundBlur_714_18999" />
              </filter>
            </defs>
          </svg>


          <div class="relative">
            <!-- Header -->
          <div v-if="showHeader"
            class="flex items-center justify-between px-6 py-4 border-b border-[var(--border-primary)]">
            <slot name="header">
              <h2 :id="titleId" class="text-xl font-semibold text-[var(--text-primary)]">
                {{ title }}
              </h2>
            </slot>
            <button @click="handleClose"
              class="p-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)]"
              aria-label="Close drawer">
              <svg class="w-5 h-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Content -->
          <div class="flex-1 overflow-y-auto px-6 py-6">
            <slot></slot>
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer" class="px-6 py-4 border-t border-[var(--border-primary)] bg-[var(--bg-secondary)]">
            <slot name="footer"></slot>
          </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl', 'full'].includes(value)
  },
  side: {
    type: String,
    default: 'right',
    validator: (value) => ['left', 'right'].includes(value)
  },
  showHeader: {
    type: Boolean,
    default: true
  },
  closeOnBackdrop: {
    type: Boolean,
    default: true
  },
  closeOnEsc: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['update:modelValue', 'close']);

const drawerRef = ref(null);
const titleId = computed(() => `drawer-title-${Math.random().toString(36).substr(2, 9)}`);

// Size classes
const sizeClasses = computed(() => {
  const sizes = {
    sm: 'w-80',
    md: 'w-96',
    lg: 'w-[32rem]',
    xl: 'w-[40rem]',
    full: 'w-full'
  };
  return sizes[props.size];
});

// Side classes
const sideClasses = computed(() => {
  if (props.side === 'left') {
    return 'left-0 top-0 bottom-0';
  }
  return 'right-0 top-0 bottom-0';
});

// Focus trap elements
let focusableElements = [];
let firstFocusableElement = null;
let lastFocusableElement = null;

const handleClose = () => {
  if (props.closeOnEsc) {
    emit('update:modelValue', false);
    emit('close');
  }
};

const handleBackdropClick = () => {
  if (props.closeOnBackdrop) {
    emit('update:modelValue', false);
    emit('close');
  }
};

// Focus trap implementation
const setupFocusTrap = () => {
  if (!drawerRef.value) return;

  focusableElements = drawerRef.value.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  if (focusableElements.length > 0) {
    firstFocusableElement = focusableElements[0];
    lastFocusableElement = focusableElements[focusableElements.length - 1];

    // Focus first element
    nextTick(() => {
      firstFocusableElement?.focus();
    });
  }
};

const handleTabKey = (e) => {
  if (!props.modelValue) return;

  if (e.key === 'Tab') {
    if (focusableElements.length === 0) {
      e.preventDefault();
      return;
    }

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstFocusableElement) {
        e.preventDefault();
        lastFocusableElement?.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastFocusableElement) {
        e.preventDefault();
        firstFocusableElement?.focus();
      }
    }
  }
};

// Watch for drawer open/close
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Setup focus trap after DOM update
    nextTick(() => {
      setupFocusTrap();
    });
  } else {
    // Restore body scroll
    document.body.style.overflow = '';
  }
});

// Add keyboard listeners
onMounted(() => {
  document.addEventListener('keydown', handleTabKey);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleTabKey);
  // Restore body scroll on unmount
  document.body.style.overflow = '';
});
</script>

<style scoped>
/* Drawer transitions */
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.3s ease;
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}

/* Right side drawer transitions */
.drawer-enter-active .right-0,
.drawer-leave-active .right-0 {
  transition: transform 0.3s ease;
}

.drawer-enter-from .right-0 {
  transform: translateX(100%);
}

.drawer-leave-to .right-0 {
  transform: translateX(100%);
}

/* Left side drawer transitions */
.drawer-enter-active .left-0,
.drawer-leave-active .left-0 {
  transition: transform 0.3s ease;
}

.drawer-enter-from .left-0 {
  transform: translateX(-100%);
}

.drawer-leave-to .left-0 {
  transform: translateX(-100%);
}
</style>
