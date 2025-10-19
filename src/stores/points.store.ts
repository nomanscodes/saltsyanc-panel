import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { apiService } from '@/api/api.service';

export const usePointsStore = defineStore('points', () => {
  // State
  const currentPoints = ref(0);
  const lifetimePoints = ref(0);
  const pendingPoints = ref(0);
  const redeemedPoints = ref(0);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Computed
  const hasError = computed(() => error.value !== null);
  
  const pointsBreakdown = computed(() => [
    {
      label: 'Current Points',
      value: currentPoints.value,
      icon: '💰',
    },
    {
      label: 'Lifetime Points',
      value: lifetimePoints.value,
      icon: '🏆',
    },
    {
      label: 'Pending Points',
      value: pendingPoints.value,
      icon: '⏳',
    },
    {
      label: 'Redeemed Points',
      value: redeemedPoints.value,
      icon: '✅',
    },
  ]);

  // Actions
  const fetchPoints = async () => {
    loading.value = true;
    error.value = null;
    
    try {
      const response = await apiService.getPoints();
      
      if (response.success && response.data) {
        currentPoints.value = response.data.currentPoints;
        lifetimePoints.value = response.data.lifetimePoints;
        pendingPoints.value = response.data.pendingPoints;
        redeemedPoints.value = response.data.redeemedPoints;
      } else {
        error.value = response.error || 'Failed to fetch points';
      }
    } catch (err) {
      error.value = 'An unexpected error occurred';
      console.error('Error fetching points:', err);
    } finally {
      loading.value = false;
    }
  };

  const clearError = () => {
    error.value = null;
  };

  return {
    // State
    currentPoints,
    lifetimePoints,
    pendingPoints,
    redeemedPoints,
    loading,
    error,
    
    // Computed
    hasError,
    pointsBreakdown,
    
    // Actions
    fetchPoints,
    clearError,
  };
});
