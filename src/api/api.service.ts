import { simulateLatency, shouldSimulateError } from './mock/config';
import { mockReferrals, mockProfile, type ReferralItem } from './mock/seed';

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode?: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  referralCode: string;
  referralLink: string;
}

export interface PointsData {
  currentPoints: number;
  lifetimePoints: number;
  pendingPoints: number;
  redeemedPoints: number;
}

export interface CreateReferralPayload {
  name: string;
  email: string;
  phone?: string;
}

// API Service class
class ApiService {
  /**
   * Get user profile with referral code and link
   */
  async getMyProfile(): Promise<ApiResponse<UserProfile>> {
    await simulateLatency();
    
    if (shouldSimulateError()) {
      return {
        success: false,
        error: 'Failed to fetch profile',
        statusCode: 500,
      };
    }
    
    return {
      success: true,
      data: mockProfile,
      statusCode: 200,
    };
  }

  /**
   * Get referral history with optional filters
   */
  async getMyHistory(params?: {
    search?: string;
    status?: 'pending' | 'success' | 'rejected';
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<{ items: ReferralItem[]; total: number }>> {
    await simulateLatency();
    
    if (shouldSimulateError()) {
      return {
        success: false,
        error: 'Failed to fetch referral history',
        statusCode: 500,
      };
    }
    
    let filtered = [...mockReferrals];
    
    // Apply search filter
    if (params?.search) {
      const searchLower = params.search.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchLower) ||
          item.email.toLowerCase().includes(searchLower) ||
          item.phone.includes(searchLower)
      );
    }
    
    // Apply status filter
    if (params?.status) {
      filtered = filtered.filter((item) => item.status === params.status);
    }
    
    const total = filtered.length;
    
    // Apply pagination
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const items = filtered.slice(startIndex, endIndex);
    
    return {
      success: true,
      data: { items, total },
      statusCode: 200,
    };
  }

  /**
   * Create manual referral
   * Rules:
   * - Duplicate email returns 409
   * - New referral starts as 'pending'
   */
  async postManual(payload: CreateReferralPayload): Promise<ApiResponse<ReferralItem>> {
    await simulateLatency();
    
    if (shouldSimulateError()) {
      return {
        success: false,
        error: 'Failed to create referral',
        statusCode: 500,
      };
    }
    
    // Validate required fields
    if (!payload.name || !payload.email) {
      return {
        success: false,
        error: 'Name and email are required',
        statusCode: 400,
      };
    }
    
    // Check for duplicate email
    const existingReferral = mockReferrals.find(
      (ref) => ref.email.toLowerCase() === payload.email.toLowerCase()
    );
    
    if (existingReferral) {
      return {
        success: false,
        error: 'Email already exists in referrals',
        statusCode: 409,
      };
    }
    
    // Normalize phone number (+880)
    let phone = payload.phone || '';
    if (phone && !phone.startsWith('+880')) {
      phone = phone.startsWith('0') ? `+880${phone.slice(1)}` : `+880${phone}`;
    }
    
    // Create new referral
    const now = new Date();
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const formattedDate = `${now.getDate()} ${months[now.getMonth()]}, ${now.getFullYear()}`;
    
    const newReferral: ReferralItem = {
      id: `REF-${Date.now()}`,
      date: formattedDate,
      name: payload.name,
      phone: phone || `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      email: payload.email,
      status: 'pending',
      discount: null,
      point: null,
      createdAt: now,
    };
    
    // Add to beginning of array (newest first)
    mockReferrals.unshift(newReferral);
    
    return {
      success: true,
      data: newReferral,
      statusCode: 201,
    };
  }

  /**
   * Get points data
   */
  async getPoints(): Promise<ApiResponse<PointsData>> {
    await simulateLatency();
    
    if (shouldSimulateError()) {
      return {
        success: false,
        error: 'Failed to fetch points',
        statusCode: 500,
      };
    }
    
    // Calculate points from referrals
    const successfulReferrals = mockReferrals.filter((ref) => ref.status === 'success');
    const pendingReferrals = mockReferrals.filter((ref) => ref.status === 'pending');
    
    const currentPoints = successfulReferrals.reduce((sum, ref) => sum + (ref.point || 0), 0);
    const pendingPoints = pendingReferrals.length * 100; // Assume 100 points per pending
    const redeemedPoints = Math.floor(currentPoints * 0.3); // 30% redeemed
    const lifetimePoints = currentPoints + redeemedPoints;
    
    return {
      success: true,
      data: {
        currentPoints,
        lifetimePoints,
        pendingPoints,
        redeemedPoints,
      },
      statusCode: 200,
    };
  }
}

// Export singleton instance
export const apiService = new ApiService();
