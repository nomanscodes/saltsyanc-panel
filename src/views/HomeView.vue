<template>
  <div class="max-w-7xl mx-auto">
    <h1 class="display-lg-bold text-[var(--text-primary)] mb-4">Welcome Home</h1>
    <p class="text-lg-regular text-[var(--text-secondary)] mb-6">
      This is the home page of your dashboard.
    </p>

    <!-- Demo Card -->
    <div class="bg-[var(--bg-primary)] rounded-token-2xl shadow-token-lg p-6 border border-[var(--border-secondary)]">
      <h2 class="text-xl-semibold text-[var(--text-primary)] mb-2">Quick Stats</h2>
      <p class="text-md-regular text-[var(--text-secondary)] mb-4">
        Your dashboard overview will appear here.
      </p>

      <div class="flex gap-3">
        <router-link
          to="/referrals"
          class="px-4 py-2 bg-brand-500 text-white rounded-token-lg text-sm-semibold hover:bg-brand-600 transition-colors focus-ring"
        >
          Go to Referrals
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// Home page component
</script>
