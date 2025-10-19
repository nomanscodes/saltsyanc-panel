<template>
    <div class="flex flex-col gap-4 md:gap-6">
        <!-- reward points display -->
        <CardWrapper>
            <div class="py-3 px-4 md:py-base md:px-lg relative flex items-center gap-2 md:gap-3">
                <div class="text-4xl md:text-[64px]">
                    🏆
                </div>

                <div class="flex flex-1 flex-col gap-1 md:gap-2">
                    <div class="text-[var(--text-quaternary)] text-sm md:text-xl">Your Points Balance</div>
                    <div v-if="pointsStore.loading" class="flex items-center gap-2">
                        <div class="w-24 md:w-32 h-8 md:h-10 bg-[var(--bg-secondary)] animate-pulse rounded"></div>
                    </div>
                    <div v-else-if="pointsStore.hasError" class="text-red-500 text-xs md:text-sm">
                        Failed to load points
                    </div>
                    <div v-else class="">
                        <div class="flex items-center justify-between gap-2">
                            <b class="text-[var(--text-primary)] text-2xl md:text-4xl">
                                {{ pointsStore.currentPoints }}
                                <span class="text-[var(--text-quaternary)] text-lg md:text-2xl font-normal">
                                    / {{ pointsStore.lifetimePoints }}
                                </span>
                            </b>
                            <Button 
                                text="Upgrade" 
                                bg-color="var(--bg-brand-solid)" 
                                text-color="white"
                                padding-top="4px"
                                padding-bottom="4px"
                                padding-left="12px"
                                padding-right="12px"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </CardWrapper>

        <!-- Points breakdown cards -->
        <div class="grid grid-cols-2 gap-3 md:gap-6">
            <CardWrapper v-for="item in pointsStore.pointsBreakdown" :key="item.label">
                <div class="py-3 px-4 md:py-base md:px-lg relative flex items-center gap-2 md:gap-3">
                    <Button 
                        :icon-only="true" 
                        :icon="Share" 
                        bg-color="var(--bg-brand-secondary)"
                        border-color="var(--bg-brand-secondary)"
                        padding="8px"
                    />

                    <div class="flex flex-1 flex-col gap-1 md:gap-2">
                        <div class="text-[var(--text-quaternary)] text-xs md:text-md">{{ item.label }}</div>
                        <div v-if="pointsStore.loading" class="w-16 md:w-20 h-6 md:h-8 bg-[var(--bg-secondary)] animate-pulse rounded"></div>
                        <b v-else class="text-[var(--text-primary)] text-xl md:text-3xl">{{ item.value }}</b>
                    </div>
                </div>
            </CardWrapper>
        </div>

        <!-- Error retry button -->
        <div v-if="pointsStore.hasError" class="text-center">
            <button
                @click="retryFetch"
                class="px-3 md:px-4 py-2 text-xs md:text-sm bg-[var(--bg-brand-solid)] text-white rounded-lg hover:bg-[var(--bg-brand-solid-hover)] transition-colors"
            >
                Retry Loading Points
            </button>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { usePointsStore } from '@/stores/points.store'
import { Share } from 'lucide-vue-next'
import CardWrapper from './CardWrapper.vue'
import Button from './Shared/Button.vue'

const pointsStore = usePointsStore()

const retryFetch = () => {
    pointsStore.clearError()
    pointsStore.fetchPoints()
}

// Fetch points on mount
onMounted(() => {
    pointsStore.fetchPoints()
})
</script>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>