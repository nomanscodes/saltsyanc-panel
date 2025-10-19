<template>
    <div
        class="bg-[var(--fg-brand-primary)] rounded-token-lg border border-[var(--border-primary)] relative overflow-hidden h-auto">
        <svg class="absolute" viewBox="0 0 444 248" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.8" filter="url(#filter0_f_540_7203)">
                <path
                    d="M348.586 200.167L118.048 -48.9651C117.288 -49.7863 116.086 -50.0259 115.07 -49.5589L-34.8727 19.3128C-36.9661 20.2744 -36.8531 23.2866 -34.6935 24.0886L162.426 97.2971C165.283 98.3582 167.304 94.4675 164.793 92.7406L54.5438 16.9288L345.287 204.099C347.843 205.745 350.65 202.398 348.586 200.167Z"
                    fill="#5087E4" />
                <path opacity="0.5"
                    d="M202.403 51.662L49.6754 -69.6104C46.8227 -71.8757 42.8902 -72.2106 39.6954 -70.4605L-14.9619 -40.5194C-20.5198 -37.4748 -21.3108 -29.8092 -16.4918 -25.6938L133.968 102.8C142.4 110.001 153.9 98.6461 146.807 90.1237L112.69 49.1266C106.526 41.7203 114.66 31.0904 123.42 35.1038L193.002 66.9837C202.726 71.4389 210.78 58.3132 202.403 51.662Z"
                    fill="#9ABAEF" />
            </g>
            <defs>
                <filter id="filter0_f_540_7203" x="-149.813" y="-185.008" width="612.548" height="502.979"
                    filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="56.7168" result="effect1_foregroundBlur_540_7203" />
                </filter>
            </defs>
        </svg>

        <div class="relative p-4 sm:p-6 md:p-[var(--spacing-xl3)] flex flex-col">
            <h2 class="text-lg sm:text-xl md:text-2xl font-bold text-[var(--text-primary-on-brand)] mb-3 md:mb-2">
                Refer a friend and Get ৳10 off. Get up to ৳600.
            </h2>
            <div class="flex flex-col gap-3 md:gap-4 mb-3 md:mb-4">
                <div>
                    <span class="text-white text-xs sm:text-sm mb-1 block">Your referral invite link</span>
                    <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                        <InputField 
                            v-model="referralStore.userProfile.referralLink" 
                            readonly
                            :container-class="'flex-1'" 
                            :disabled="referralStore.loading" 
                        />
                        <Button 
                            text="Copy" 
                            :icon-leading="true" 
                            :icon="Copy" 
                            bg-color="var(--bg-primary)"
                            text-color="var(--text-secondary)"
                            :disabled="referralStore.loading || !referralStore.userProfile.referralLink"
                            @click="copyLink"
                            padding-top="8px"
                            padding-bottom="8px"
                            padding-left="16px"
                            padding-right="16px"
                        />
                    </div>
                </div>
                <div class="flex flex-col sm:flex-row items-start justify-between gap-4">
                    <div>
                        <span class="text-white text-xs sm:text-sm mb-1 block">Share with</span>
                        <div class="flex items-center gap-2 sm:gap-3">
                            <Button 
                                :icon-only="true" 
                                :icon="Facebook" 
                                bg-color="var(--bg-primary)"
                                text-color="var(--text-secondary)" 
                            />
                            <Button 
                                :icon-only="true" 
                                :icon="Instagram" 
                                bg-color="var(--bg-primary)"
                                text-color="var(--text-secondary)" 
                            />
                            <Button 
                                :icon-only="true" 
                                :icon="Mail" 
                                bg-color="var(--bg-primary)"
                                text-color="var(--text-secondary)" 
                            />
                        </div>
                    </div>
                    <div>
                        <span class="text-white text-xs sm:text-sm mb-1 block">QR Code</span>
                        <img src="../assets/image/qr.png" class="w-12 h-12 sm:w-[58px] sm:h-[58px]" alt="QR Code for referral">
                    </div>
                </div>
            </div>
            <Button 
                text="Request for New Connection" 
                bg-color="var(--bg-primary)" 
                text-color="var(--text-secondary)"
                @click="openDrawer"
                padding-top="8px"
                padding-bottom="8px"
                padding-left="16px"
                padding-right="16px"
            />
        </div>

        <!-- Toast notification -->
        <Teleport to="body">
            <Transition name="toast">
                <div v-if="showToast"
                    class="fixed top-4 right-4 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50"
                    role="status" aria-live="polite">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Link copied to clipboard!</span>
                </div>
            </Transition>
        </Teleport>

        <!-- Global Drawer for Referral Form -->
        <GlobalDrawer v-model="isDrawerOpen" title="New Connection Referred" size="lg" @close="closeDrawer">
            <ReferralForm @success="handleReferralSuccess" @cancel="closeDrawer" />
        </GlobalDrawer>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useReferralStore } from '@/stores/referral.store'
import InputField from './Shared/InputField.vue'
import Button from './Shared/Button.vue'
import GlobalDrawer from './GlobalDrawer.vue'
import ReferralForm from './ReferralForm.vue'
import { Copy, Facebook, Instagram, Mail } from 'lucide-vue-next'

const referralStore = useReferralStore()
const showToast = ref(false)
const isDrawerOpen = ref(false)

const copyLink = async () => {
    try {
        await navigator.clipboard.writeText(referralStore.userProfile.referralLink)
        showToast.value = true
        setTimeout(() => {
            showToast.value = false
        }, 3000)
    } catch (err) {
        console.error('Error copying link: ', err)
    }
}

const openDrawer = () => {
    isDrawerOpen.value = true
}

const closeDrawer = () => {
    isDrawerOpen.value = false
}

const handleReferralSuccess = () => {
    // Close drawer after successful referral creation
    setTimeout(() => {
        closeDrawer()
    }, 1500)
}

// Fetch profile on mount
onMounted(() => {
    referralStore.fetchProfile()
})
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
    transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
    opacity: 0;
    transform: translateY(-1rem);
}
</style>