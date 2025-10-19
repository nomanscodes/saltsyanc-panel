<template>
  <div class="">
    <!-- Top Section Card - Contains CopyReferralLink and PointsBalanceCard -->
    <div class="">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Copy Referral Link Section -->
        <CopyReferralLink />
        <!-- Points Balance Card Section -->
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
