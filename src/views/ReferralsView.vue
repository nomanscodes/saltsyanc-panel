<template>
  <div class="flex flex-col gap-6">
    <!-- Top Section Card - Contains CopyReferralLink and PointsBalanceCard -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- Copy Referral Link Section -->
      <div class="lg:col-span-5">
        <CopyReferralLink />
      </div>

      <!-- Points Balance Card Section -->
      <div class="lg:col-span-7">
        <PointsBalanceCard />
      </div>
    </div>

    <!-- Referral History Table -->
    <ReferralHistoryTable />
  </div>
</template>

<script setup>
import CopyReferralLink from '../components/CopyReferralLink.vue'
import PointsBalanceCard from '../components/PointsBalanceCard.vue'
import ReferralHistoryTable from '../components/ReferralHistoryTable.vue'
</script>
