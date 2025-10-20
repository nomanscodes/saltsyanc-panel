<template>
  <aside
    class="w-[240px] h-screen bg-[var(--bg-primary)] md:bg-[var(--bg)] border-r md:border-0 border-[var(--border-primary)] relative overflow-hidden"
  >
    <!-- gradient  -->
    <svg
      class="absolute"
      width="240"
      height="470"
      viewBox="0 0 240 470"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.8" filter="url(#filter0_f_3267_1740)">
        <path
          d="M213.298 406.718L-38.1538 91.2447C-38.6244 90.6543 -38.7224 89.8493 -38.4073 89.1633L14.9316 -26.9621C15.675 -28.5806 18.0039 -28.4933 18.624 -26.8236L75.2243 125.578C76.0447 127.786 73.0366 129.349 71.7015 127.407L13.0884 42.1693L216.606 404.492C217.811 406.637 214.832 408.642 213.298 406.718Z"
          fill="#6C9BE8"
        />
        <path
          opacity="0.5"
          d="M39.942 156.486L-53.8186 38.4061C-55.5699 36.2005 -55.8289 33.1602 -54.4758 30.6901L-31.3271 -11.5676C-28.9732 -15.8646 -23.0467 -16.4762 -19.8649 -12.7504L79.4789 103.576C85.0459 110.095 76.2673 118.986 69.6783 113.503L37.9817 87.1248C32.2556 82.3596 24.0372 88.6485 27.1402 95.4211L51.7878 149.217C55.2322 156.735 45.0843 162.962 39.942 156.486Z"
          fill="#BBD1F4"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_3267_1740"
          x="-143.037"
          y="-115.827"
          width="447.623"
          height="611.02"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="43.85"
            result="effect1_foregroundBlur_3267_1740"
          />
        </filter>
      </defs>
    </svg>

    <div class="relative flex flex-col h-full">
      <!-- Logo Section -->
      <div class="p-6">
        <div class="flex items-center justify-between">
          <img
            src="@/assets/image/logo.svg"
            alt="SaltSync Internet Logo"
            class="h-12 w-[139px] object-contain"
          />

          <button
            @click="$emit('close')"
            class="p-1 hover:bg-[var(--bg-secondary-hover)] rounded-token-md transition-colors lg:hidden"
            aria-label="Close menu"
          >
            <svg
              class="w-6 h-6 text-[var(--text-primary)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Navigation Menu -->
      <nav class="flex-1 overflow-y-auto py-4 scrollbar-thin">
        <!-- Dynamic Navigation Groups -->
        <div
          v-for="(group, groupIndex) in navigationGroups"
          :key="group.title"
          :class="[
            'px-3',
            groupIndex !== navigationGroups.length - 1 ? 'mb-6' : '',
          ]"
        >
          <h2
            class="text-xs-semibold text-[var(--text-secondary)] uppercase px-3 mb-2"
          >
            {{ group.title }}
          </h2>
          <ul class="space-y-1">
            <li v-for="item in group.items" :key="item.path">
              <router-link
                :to="item.path"
                @click="$emit('close')"
                :class="[
                  'flex items-center rounded-token-xl text-md-medium text-[var(--text-primary)] hover:bg-[var(--bg-secondary-hover)] transition-colors',
                  'py-[var(--spacing-xs)] px-[var(--spacing-md)]',
                  item.badge ? 'justify-between' : '',
                ]"
                :exact-active-class="
                  item.exact
                    ? 'text-md-semibold text-[var(--text-primary-on-brand)] sidebar-link-active'
                    : undefined
                "
                :active-class="
                  !item.exact
                    ? 'text-md-semibold text-[var(--text-primary-on-brand)] sidebar-link-active'
                    : undefined
                "
              >
                <div class="flex items-center gap-[var(--spacing-2)]">
                  <component :is="item.icon" :size="16" />
                  {{ item.name }}
                </div>
                <span
                  v-if="item.badge"
                  class="size-token-lg rounded-token-full bg-error-500 text-white text-xs-semibold flex items-center justify-center"
                >
                  {{ item.badge }}
                </span>
              </router-link>
            </li>
          </ul>
        </div>
      </nav>

      <!-- Theme Toggle Section -->
      <div class="p-4 border-t border-[var(--border-secondary)]">
        <div class="bg-gray-900 rounded-token-lg p-3">
          <p class="text-sm-semibold text-white mb-1">Enterprise</p>
          <p class="text-xs-regular text-gray-400 mb-3">
            Last login on May 1, 2025
          </p>
          <div class="flex items-center gap-2 bg-gray-800 rounded-token-md p-1">
            <button
              @click="toggleDarkMode"
              :class="[
                'flex-1 px-2 py-1 rounded-token-sm text-xs-medium transition-colors',
                !isDark
                  ? 'bg-white text-gray-900'
                  : 'text-gray-400 hover:text-white',
              ]"
            >
              Light
            </button>
            <button
              @click="toggleDarkMode"
              :class="[
                'flex-1 px-2 py-1 rounded-token-sm text-xs-medium transition-colors',
                isDark
                  ? 'bg-white text-gray-900'
                  : 'text-gray-400 hover:text-white',
              ]"
            >
              Dark
            </button>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useDarkMode } from "@/composables/useDarkMode";
import { navigationGroups } from "@/config/navigation";

defineEmits(["close"]);

const { isDark, toggleDarkMode } = useDarkMode();
</script>
