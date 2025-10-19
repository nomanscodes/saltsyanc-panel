<template>
  <header class="h-auto md:h-18 flex flex-row items-center justify-between px-4 md:px-6 py-3 md:py-0 gap-3 border-b border-[var(--border-tertiary)]">
    <!-- Left: Menu button (mobile only) + Search Bar (desktop only) -->
    <div class="flex items-center gap-3 flex-1">
      <!-- Mobile Menu Button - shown on mobile, hidden on desktop -->
      <button
        @click="toggleMobileSidebar"
        class="lg:hidden p-2 hover:bg-[var(--bg-secondary-hover)] rounded-lg transition-colors"
        aria-label="Toggle menu"
      >
        <svg class="w-6 h-6 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <!-- Search Bar - hidden on mobile, shown on desktop -->
      <div class="hidden md:block w-full md:flex-1 md:max-w-md">
        <InputField 
          v-model="searchQuery" 
          :icon="Search"
          placeholder="Type a command or search..."
          textColor="var(--text-primary)"
          container-class="w-full"
        />
      </div>
    </div>

    <!-- Right: Dark Mode Toggle -->
    <div class="flex items-center gap-2">
      <!-- Dark Mode Toggle - always visible -->
      <button
        @click="toggleDarkMode"
        class="w-10 h-10 px-1.5 py-1 rounded-token-md hover:bg-[var(--bg-secondary-hover)] transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)]"
        :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
      >
        <!-- Sun Icon (Light Mode) -->
        <svg v-if="isDark" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 1V3M10 17V19M19 10H17M3 10H1M16.364 16.364L14.95 14.95M14.95 5.05L16.364 3.636M3.636 16.364L5.05 14.95M5.05 5.05L3.636 3.636M14 10C14 12.2091 12.2091 14 10 14C7.79086 14 6 12.2091 6 10C6 7.79086 7.79086 6 10 6C12.2091 6 14 7.79086 14 10Z" 
            stroke="currentColor" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round"
            class="text-[var(--text-secondary)]"
          />
        </svg>
        <!-- Moon Icon (Dark Mode) -->
        <svg v-else width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 10.79C18.8427 12.4922 18.2039 14.1144 17.1582 15.4668C16.1126 16.8192 14.7035 17.8458 13.0957 18.4265C11.4879 19.0073 9.74801 19.1181 8.07951 18.7461C6.41101 18.3741 4.88299 17.5345 3.67425 16.3258C2.46552 15.117 1.62596 13.589 1.25393 11.9205C0.881908 10.252 0.992719 8.51208 1.57348 6.9043C2.15425 5.29651 3.18085 3.88737 4.53324 2.84175C5.88562 1.79614 7.50782 1.15731 9.20999 1C8.21341 2.34827 7.73385 4.00945 7.85852 5.68141C7.98319 7.35338 8.70391 8.92506 9.89005 10.1112C11.0762 11.2973 12.6479 12.0181 14.3198 12.1427C15.9918 12.2674 17.653 11.7879 19.0013 10.7913L19 10.79Z" 
            stroke="currentColor" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round"
            class="text-[var(--text-secondary)]"
          />
        </svg>
      </button>

      <!-- Message and Notifications - Hidden on mobile, shown on desktop -->
      <div class="hidden md:flex items-center gap-1.5 h-10 bg-[var(--bg-secondary-subtle)] rounded-token-md px-1.5 py-1">
        <!-- Message Icon -->
        <button
          class="w-10 h-10 px-1.5 py-1 rounded-token-md hover:bg-[var(--bg-secondary-hover)] transition-colors flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8 12H8.01M12 12H12.01M16 12H16.01M7.9 20C9.80858 20.9791 12.0041 21.2443 14.0909 20.7478C16.1777 20.2514 18.0186 19.0259 19.2818 17.2922C20.545 15.5586 21.1474 13.4308 20.9806 11.2922C20.8137 9.15366 19.8886 7.14502 18.3718 5.62824C16.855 4.11146 14.8464 3.1863 12.7078 3.01946C10.5693 2.85263 8.44147 3.45509 6.70782 4.71829C4.97417 5.98149 3.74869 7.82236 3.25222 9.90916C2.75575 11.996 3.02094 14.1915 4 16.1L2 22L7.9 20Z"
              stroke="#475569" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>

        <!-- Notification Icon with Badge -->
        <button
          class="relative w-10 h-10 px-1.5 py-1 rounded-token-md hover:bg-[var(--bg-secondary-hover)] transition-colors flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14.9997 19C14.9997 20.6569 13.6566 22 11.9997 22C10.3429 22 8.99972 20.6569 8.99972 19M13.7962 6.23856C14.2317 5.78864 14.4997 5.17562 14.4997 4.5C14.4997 3.11929 13.3804 2 11.9997 2C10.619 2 9.49972 3.11929 9.49972 4.5C9.49972 5.17562 9.76772 5.78864 10.2032 6.23856M17.9997 11.2C17.9997 9.82087 17.3676 8.49823 16.2424 7.52304C15.1171 6.54786 13.591 6 11.9997 6C10.4084 6 8.8823 6.54786 7.75708 7.52304C6.63186 8.49823 5.99972 9.82087 5.99972 11.2C5.99972 13.4818 5.43385 15.1506 4.72778 16.3447C3.92306 17.7056 3.5207 18.3861 3.53659 18.5486C3.55476 18.7346 3.58824 18.7933 3.73906 18.9036C3.87089 19 4.53323 19 5.85791 19H18.1415C19.4662 19 20.1286 19 20.2604 18.9036C20.4112 18.7933 20.4447 18.7346 20.4629 18.5486C20.4787 18.3861 20.0764 17.7056 19.2717 16.3447C18.5656 15.1506 17.9997 13.4818 17.9997 11.2Z"
              stroke="#475569" stroke-linecap="round" stroke-linejoin="round" />
            <circle cx="17.0703" cy="5.82617" r="4.5" fill="#EF4444" stroke="#475569" />
          </svg>
        </button>
      </div>

      <!-- User Avatar - Hidden on mobile, shown on desktop -->
      <div class="relative hidden md:block">
        <button @click="toggleUserMenu"
          class="flex items-center gap-1.5 h-10 bg-[var(--bg-secondary-subtle)] rounded-token-md px-1.5 py-1 hover:bg-[var(--bg-secondary-hover)] transition-all focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)]">
          <img src="../assets/image/user.svg" alt="User Avatar" class="w-8 h-8 object-cover" />
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6L8 10L12 6" stroke="#94A3B8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>

        <!-- User Dropdown Menu -->
        <transition enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95">
          <div v-if="isUserMenuOpen"
            class="absolute right-0 mt-2 w-48 bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-token-lg shadow-token-lg py-1 z-50">
            <a href="#"
              class="block px-4 py-2 text-sm-regular text-[var(--text-primary)] hover:bg-[var(--bg-secondary-hover)] transition-colors">
              Profile
            </a>
            <a href="#"
              class="block px-4 py-2 text-sm-regular text-[var(--text-primary)] hover:bg-[var(--bg-secondary-hover)] transition-colors">
              Settings
            </a>
            <hr class="my-1 border-[var(--border-secondary)]" />
            <a href="#"
              class="block px-4 py-2 text-sm-regular text-[var(--text-error-primary)] hover:bg-[var(--bg-secondary-hover)] transition-colors">
              Sign out
            </a>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useDarkMode } from '@/composables/useDarkMode'
import InputField from './Shared/InputField.vue'
import { Search } from 'lucide-vue-next'

const { isDark, toggleDarkMode } = useDarkMode()

const searchQuery = ref('')
const isUserMenuOpen = ref(false)

// Emit event for mobile sidebar toggle
const emit = defineEmits(['toggle-sidebar'])

const toggleMobileSidebar = () => {
  emit('toggle-sidebar')
}

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value
}

const closeUserMenu = (event) => {
  if (!event.target.closest('.relative')) {
    isUserMenuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeUserMenu)
})

onUnmounted(() => {
  document.removeEventListener('click', closeUserMenu)
})
</script>
      
