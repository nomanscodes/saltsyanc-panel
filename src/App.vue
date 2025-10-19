<script setup>
import { onMounted } from 'vue'
import DashboardLayout from './components/DashboardLayout.vue'

// Initialize dark mode on app mount
onMounted(() => {
  const stored = localStorage.getItem('darkMode')
  if (stored === 'true') {
    document.documentElement.classList.add('dark')
  } else if (stored === null) {
    // Check system preference if no stored value
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (prefersDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('darkMode', 'true')
    }
  }
})
</script>

<template>
  <DashboardLayout>
    <router-view />
  </DashboardLayout>
</template>

<style scoped></style>
