<template>
  <div class="flex h-screen overflow-hidden bg-[var(--bg-secondary)]">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content Area -->
    <div class="p-[24px] flex-1 h-[100%]">
      <div class="flex flex-col h-[100%] border border-[var(--border-primary)] rounded-2xl bg-[var(--bg-primary)] max-w-[100%] mx-auto">
        <!-- Header -->
        <Header />
        <!-- Page Content -->
        <main class="flex-1 overflow-y-auto p-8">
          <slot></slot>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
</script>
