import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { apiService, type CreateReferralPayload } from '@/api/api.service';
import type { ReferralItem } from '@/api/mock/seed';

export const useReferralStore = defineStore('referral', () => {
  // State
  const referrals = ref<ReferralItem[]>([]);
  const total = ref(0);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const userProfile = ref({
    referralCode: '',
    referralLink: '',
    name: '',
    email: '',
  });

  // Filters
  const searchQuery = ref('');
  const statusFilter = ref<'pending' | 'success' | 'rejected' | ''>('');
  const currentPage = ref(1);
  const itemsPerPage = ref(10);

  // Computed
  const totalPages = computed(() => Math.ceil(total.value / itemsPerPage.value));
  
  const hasError = computed(() => error.value !== null);
  
  const isEmpty = computed(() => !loading.value && referrals.value.length === 0);

  // Actions
  const fetchProfile = async () => {
    loading.value = true;
    error.value = null;
    
    try {
      const response = await apiService.getMyProfile();
      
      if (response.success && response.data) {
        userProfile.value = {
          referralCode: response.data.referralCode,
          referralLink: response.data.referralLink,
          name: response.data.name,
          email: response.data.email,
        };
      } else {
        error.value = response.error || 'Failed to fetch profile';
      }
    } catch (err) {
      error.value = 'An unexpected error occurred';
      console.error('Error fetching profile:', err);
    } finally {
      loading.value = false;
    }
  };

  const fetchReferrals = async () => {
    loading.value = true;
    error.value = null;
    
    try {
      const response = await apiService.getMyHistory({
        search: searchQuery.value,
        status: statusFilter.value || undefined,
        page: currentPage.value,
        limit: itemsPerPage.value,
      });
      
      if (response.success && response.data) {
        referrals.value = response.data.items;
        total.value = response.data.total;
      } else {
        error.value = response.error || 'Failed to fetch referrals';
      }
    } catch (err) {
      error.value = 'An unexpected error occurred';
      console.error('Error fetching referrals:', err);
    } finally {
      loading.value = false;
    }
  };

  const createReferral = async (payload: CreateReferralPayload) => {
    loading.value = true;
    error.value = null;
    
    try {
      const response = await apiService.postManual(payload);
      
      if (response.success && response.data) {
        // Refresh the list after successful creation
        await fetchReferrals();
        return { success: true, data: response.data };
      } else {
        error.value = response.error || 'Failed to create referral';
        return { success: false, error: error.value, statusCode: response.statusCode };
      }
    } catch (err) {
      error.value = 'An unexpected error occurred';
      console.error('Error creating referral:', err);
      return { success: false, error: error.value };
    } finally {
      loading.value = false;
    }
  };

  const setSearchQuery = (query: string) => {
    searchQuery.value = query;
    currentPage.value = 1; // Reset to first page on search
  };

  const setStatusFilter = (status: 'pending' | 'success' | 'rejected' | '') => {
    statusFilter.value = status;
    currentPage.value = 1; // Reset to first page on filter
  };

  const setPage = (page: number) => {
    currentPage.value = page;
  };

  const setItemsPerPage = (count: number) => {
    itemsPerPage.value = count;
    currentPage.value = 1; // Reset to first page
  };

  const clearError = () => {
    error.value = null;
  };

  return {
    // State
    referrals,
    total,
    loading,
    error,
    userProfile,
    searchQuery,
    statusFilter,
    currentPage,
    itemsPerPage,
    
    // Computed
    totalPages,
    hasError,
    isEmpty,
    
    // Actions
    fetchProfile,
    fetchReferrals,
    createReferral,
    setSearchQuery,
    setStatusFilter,
    setPage,
    setItemsPerPage,
    clearError,
  };
});
