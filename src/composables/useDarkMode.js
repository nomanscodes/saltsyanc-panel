import { ref, watch } from 'vue';

// Shared state across all instances
const isDark = ref(false);
let isInitialized = false;

export function useDarkMode() {
  // Initialize dark mode from localStorage or system preference (only once)
  const initDarkMode = () => {
    if (isInitialized) return;
    
    const stored = localStorage.getItem('darkMode');
    
    if (stored !== null) {
      isDark.value = stored === 'true';
    } else {
      // Check system preference
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    applyDarkMode();
    isInitialized = true;
  };

  // Apply dark mode to HTML element
  const applyDarkMode = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    isDark.value = !isDark.value;
    localStorage.setItem('darkMode', isDark.value.toString());
    applyDarkMode();
  };

  // Initialize on first use
  if (!isInitialized) {
    initDarkMode();
  }

  return {
    isDark,
    toggleDarkMode
  };
}
