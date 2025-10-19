<template>
    <div class="bg-[var(--bg-primary)] rounded-lg border border-[var(--border-primary)] p-3 md:p-xl">
        <div class="flex flex-col">
            <h2 class="text-lg md:text-2xl text-[var(--text-primary)] font-semibold mb-3 md:mb-0">My Referral History</h2>
            <div class="flex flex-col sm:flex-row flex-1 sm:flex-initial gap-2 md:gap-3 py-3 md:py-base">
                <!-- Search Bar -->
                <InputField 
                    :model-value="referralStore.searchQuery"
                    @update:model-value="handleSearch"
                    :icon="Search" 
                    placeholder="Search..."
                    text-color="var(--text-primary)"
                    :disabled="referralStore.loading"
                    container-class="flex-1"
                />
                <select 
                    :value="referralStore.statusFilter"
                    @change="handleStatusFilter"
                    :disabled="referralStore.loading"
                    class="border border-[var(--border-primary)] bg-[var(--bg-primary)] text-[var(--text-primary)] rounded-lg px-2 md:px-3 py-2 text-xs md:text-sm focus:ring-2 focus:ring-[var(--focus-ring)] focus:border-[var(--focus-ring)] disabled:opacity-50"
                >
                    <option value="">All Status</option>
                    <option value="success">Success</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>
        </div>

        <!-- Loading State -->
        <div v-if="referralStore.loading && referralStore.referrals.length === 0" class="py-12">
            <div class="flex flex-col items-center justify-center gap-4">
                <div class="w-12 h-12 border-4 border-[var(--border-primary)] border-t-[var(--bg-brand-solid)] rounded-full animate-spin"></div>
                <p class="text-[var(--text-secondary)]">Loading referrals...</p>
            </div>
        </div>

        <!-- Error State -->
        <div v-else-if="referralStore.hasError" class="py-12">
            <div class="flex flex-col items-center justify-center gap-4">
                <svg class="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-red-500 font-medium">{{ referralStore.error }}</p>
                <button
                    @click="retryFetch"
                    class="px-4 py-2 bg-[var(--bg-brand-solid)] text-white rounded-lg hover:bg-[var(--bg-brand-solid-hover)] transition-colors"
                >
                    Retry
                </button>
            </div>
        </div>

        <!-- Empty State -->
        <div v-else-if="referralStore.isEmpty" class="py-12">
            <div class="flex flex-col items-center justify-center gap-4">
                <svg class="w-16 h-16 text-[var(--text-tertiary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <p class="text-[var(--text-secondary)] text-lg font-medium">No referrals found</p>
                <p class="text-[var(--text-tertiary)] text-sm">Start adding referrals to see them here</p>
            </div>
        </div>

        <!-- Table -->
        <div v-else class="overflow-x-auto rounded-lg border border-[var(--border-secondary)] -mx-3 md:mx-0">
            <table class="min-w-full divide-y divide-gray-200 text-xs md:text-sm">
                <thead class="bg-[var(--bg-secondary)]">
                    <tr>
                        <th class="px-2 md:px-xl py-2 md:py-lg text-left font-semibold text-[var(--text-primary)] text-xs md:text-sm whitespace-nowrap">
                           <div class="flex items-center gap-1 md:gap-2">
                            <input 
                                type="checkbox" 
                                v-model="selectAll"
                                @change="toggleSelectAll"
                                class="h-4 w-4 md:h-5 md:w-5 border border-[var(--border-primary)] accent-[var(--bg-brand-solid)] cursor-pointer" 
                            />
                            Date
                           </div>
                        </th>
                        <th class="px-2 md:px-xl py-2 md:py-lg text-left font-semibold text-[var(--text-primary)] text-xs md:text-sm whitespace-nowrap">Name</th>
                        <th class="px-2 md:px-xl py-2 md:py-lg text-left font-semibold text-[var(--text-primary)] text-xs md:text-sm whitespace-nowrap">Phone</th>
                        <th class="px-2 md:px-xl py-2 md:py-lg text-left font-semibold text-[var(--text-primary)] text-xs md:text-sm whitespace-nowrap">Email</th>
                        <th class="px-2 md:px-xl py-2 md:py-lg text-left font-semibold text-[var(--text-primary)] text-xs md:text-sm whitespace-nowrap">Status</th>
                        <th class="px-2 md:px-xl py-2 md:py-lg text-left font-semibold text-[var(--text-primary)] text-xs md:text-sm whitespace-nowrap">Discount</th>
                        <th class="px-2 md:px-xl py-2 md:py-lg text-left font-semibold text-[var(--text-primary)] text-xs md:text-sm whitespace-nowrap">Point</th>
                    </tr>
                </thead>

                <tbody class="divide-y divide-gray-100">
                    <tr v-for="(item, index) in referralStore.referrals" :key="item.id"
                        class="hover:bg-[var(--bg-primary-hover)] transition">

                        <td class="px-2 md:px-xl py-2 md:py-lg text-[var(--text-primary)] font-medium text-xs md:text-sm whitespace-nowrap">
                          <div class="flex items-center gap-1 md:gap-2">
                              <input 
                                type="checkbox" 
                                v-model="selectedRows" 
                                :value="item.id" 
                                class="h-3 w-3 md:h-4 md:w-4 border border-[var(--border-primary)] accent-[var(--bg-brand-solid)] cursor-pointer" 
                              />
                            <span class="hidden sm:inline">{{ item.date }}</span>
                            <span class="sm:hidden">{{ item.date.split(' ')[0] }}</span>
                          </div>
                        </td>
                        <td class="px-2 md:px-xl py-2 md:py-lg text-[var(--text-primary)] font-medium text-xs md:text-sm whitespace-nowrap">{{ item.name }}</td>
                        <td class="px-2 md:px-xl py-2 md:py-lg text-[var(--text-primary)] font-medium text-xs md:text-sm whitespace-nowrap">{{ item.phone }}</td>
                        <td class="px-2 md:px-xl py-2 md:py-lg text-[var(--text-primary)] font-medium text-xs md:text-sm whitespace-nowrap">{{ item.email || 'N/A' }}</td>
                        <td class="px-2 md:px-xl py-2 md:py-lg">
                            <span class="px-1.5 md:px-2.5 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-medium whitespace-nowrap" :class="{
                                'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400': item.status === 'success',
                                'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400': item.status === 'pending',
                                'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400': item.status === 'rejected'
                            }">
                                {{ item.status.charAt(0).toUpperCase() + item.status.slice(1) }}
                            </span>
                        </td>
                        <td class="px-2 md:px-xl py-2 md:py-lg text-[var(--text-primary)] font-medium text-xs md:text-sm whitespace-nowrap">{{ item.discount || 'N/A' }}</td>
                        <td class="px-2 md:px-xl py-2 md:py-lg text-[var(--text-primary)] font-medium text-xs md:text-sm whitespace-nowrap">{{ item.point || 'N/A' }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div v-if="!referralStore.loading && !referralStore.isEmpty && !referralStore.hasError" class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs md:text-sm text-[var(--text-secondary)] mt-3 md:mt-4">
            <p class="text-xs md:text-sm">{{ selectedRows.length }} of {{ referralStore.total }} row(s) selected.</p>
            <div class="flex flex-wrap items-center gap-2 text-xs md:text-sm">
                <label class="whitespace-nowrap">Rows per page</label>
                <select 
                    :value="referralStore.itemsPerPage"
                    @change="handleItemsPerPageChange"
                    class="border border-[var(--border-primary)] bg-[var(--bg-primary)] text-[var(--text-primary)] rounded-lg px-2 py-1 text-xs md:text-sm"
                >
                    <option v-for="n in [5, 10, 20, 50]" :key="n" :value="n">{{ n }}</option>
                </select>
                <div class="flex items-center gap-1">
                    <button 
                        class="px-2 py-1 border border-[var(--border-primary)] rounded disabled:opacity-40 hover:bg-[var(--bg-secondary)] transition-colors text-xs md:text-sm" 
                        :disabled="referralStore.currentPage === 1" 
                        @click="handlePageChange(referralStore.currentPage - 1)"
                    >
                        «
                    </button>
                    <span class="px-1 md:px-2 text-xs md:text-sm whitespace-nowrap">Page {{ referralStore.currentPage }} of {{ referralStore.totalPages }}</span>
                    <button 
                        class="px-2 py-1 border border-[var(--border-primary)] rounded disabled:opacity-40 hover:bg-[var(--bg-secondary)] transition-colors text-xs md:text-sm" 
                        :disabled="referralStore.currentPage === referralStore.totalPages"
                        @click="handlePageChange(referralStore.currentPage + 1)"
                    >
                        »
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useReferralStore } from '@/stores/referral.store'
import InputField from './Shared/InputField.vue'
import { Search } from 'lucide-vue-next'

const referralStore = useReferralStore()
const selectedRows = ref([])
const selectAll = ref(false)

// Debounce search
let searchTimeout = null
const handleSearch = (value) => {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
        referralStore.setSearchQuery(value)
        referralStore.fetchReferrals()
    }, 300)
}

const handleStatusFilter = (event) => {
    referralStore.setStatusFilter(event.target.value)
    referralStore.fetchReferrals()
}

const handlePageChange = (page) => {
    referralStore.setPage(page)
    referralStore.fetchReferrals()
}

const handleItemsPerPageChange = (event) => {
    referralStore.setItemsPerPage(parseInt(event.target.value))
    referralStore.fetchReferrals()
}

const toggleSelectAll = () => {
    if (selectAll.value) {
        selectedRows.value = referralStore.referrals.map(item => item.id)
    } else {
        selectedRows.value = []
    }
}

const retryFetch = () => {
    referralStore.clearError()
    referralStore.fetchReferrals()
}

// Fetch referrals on mount
onMounted(() => {
    referralStore.fetchReferrals()
})

// Watch for referrals changes to update selectAll
watch(() => referralStore.referrals, () => {
    if (selectedRows.value.length > 0 && selectedRows.value.length < referralStore.referrals.length) {
        selectAll.value = false
    }
}, { deep: true })
</script>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
