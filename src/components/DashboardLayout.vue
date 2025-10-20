<template>
  <div class="flex h-screen overflow-hidden bg-[var(--bg-secondary)]">
    <!-- Mobile Sidebar Overlay -->
    <Transition name="fade">
      <div
        v-if="isMobileSidebarOpen"
        @click="closeMobileSidebar"
        class="fixed inset-0 bg-black/50 z-40 lg:hidden"
        aria-hidden="true"
      ></div>
    </Transition>

    <!-- Sidebar -->
    <Transition name="slide">
      <div
        v-show="isMobileSidebarOpen || !isMobile"
        :class="[
          'fixed lg:static inset-y-0 left-0 z-40',
          'lg:translate-x-0 transition-transform duration-300',
          isMobileSidebarOpen
            ? 'translate-x-0'
            : '-translate-x-full lg:translate-x-0',
        ]"
      >
        <Sidebar @close="closeMobileSidebar" />
      </div>
    </Transition>

    <!-- Main Content Area -->
    <div class="flex-1 h-full overflow-hidden">
      <div :class="['h-full', 'p-0 md:p-6']">
        <div
          class="flex flex-col h-full md:border md:border-[var(--border-primary)] md:rounded-2xl bg-[var(--bg-primary)] overflow-hidden"
        >
          <!-- Header -->
          <Header @toggle-sidebar="toggleMobileSidebar" />

          <!-- Page Content -->
          <main class="flex-1 overflow-y-auto scrollbar-hidden p-4 md:p-6">
            <slot></slot>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import Sidebar from "./Sidebar.vue";
import Header from "./Header.vue";

const isMobileSidebarOpen = ref(false);
const isMobile = ref(false);

const checkMobile = () => {
  isMobile.value = window.innerWidth < 1024;
  if (!isMobile.value) {
    isMobileSidebarOpen.value = false;
  }
};

const toggleMobileSidebar = () => {
  isMobileSidebarOpen.value = !isMobileSidebarOpen.value;
};

const closeMobileSidebar = () => {
  isMobileSidebarOpen.value = false;
};

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
});
</script>

<style lang="css" scoped>
.scrollbar-hidden {
  scrollbar-width: none;
}

.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}

/* Transition animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
