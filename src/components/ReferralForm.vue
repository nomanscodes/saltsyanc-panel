<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-6">
    <!-- Name Field -->
    <div>
      <label for="name" class="block text-sm font-medium text-[var(--text-primary)] mb-2">
        Name <span class="text-red-500">*</span>
      </label>
      <InputField
        id="name"
        v-model="formData.name"
        type="text"
        :disabled="loading"
        placeholder="Enter name"
        container-class="w-full"
        bg-color="[var(--bg-primary)]"
        text-color="[var(--text-primary)]"
      />
      <p v-if="errors.name" id="name-error" class="mt-1 text-sm text-red-500" role="alert">
        {{ errors.name }}
      </p>
    </div>

    <!-- Phone Field -->
    <div>
      <label for="phone" class="block text-sm font-medium text-[var(--text-primary)] mb-2">
        Phone <span class="text-red-500">*</span>
      </label>
      <InputField
        id="phone"
        v-model="formData.phone"
        type="tel"
        :disabled="loading"
        placeholder="Enter phone number"
        container-class="w-full"
 bg-color="[var(--bg-primary)]"
        text-color="[var(--text-primary)]"
      />
      <p v-if="errors.phone" id="phone-error" class="mt-1 text-sm text-red-500" role="alert">
        {{ errors.phone }}
      </p>
    </div>

    <!-- Email Field -->
    <div>
      <label for="email" class="block text-sm font-medium text-[var(--text-primary)] mb-2">
        Email <span class="text-red-500">*</span>
      </label>
      <InputField
        id="email"
        v-model="formData.email"
        type="email"
        :disabled="loading"
        placeholder="Enter email address"
        container-class="w-full"
 bg-color="[var(--bg-primary)]"
        text-color="[var(--text-primary)]"
      />
      <p v-if="errors.email" id="email-error" class="mt-1 text-sm text-red-500" role="alert">
        {{ errors.email }}
      </p>
    </div>

    <!-- District Name Field -->
    <div>
      <label for="district" class="block text-sm font-medium text-[var(--text-primary)] mb-2">
        District Name <span class="text-red-500">*</span>
      </label>
      <select
        id="district"
        v-model="formData.district"
        :disabled="loading"
        class="w-full h-10 px-3 py-2.5 text-sm text-[var(--text-primary)] bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        aria-required="true"
        aria-describedby="district-error"
      >
        <option value="">Select district name</option>
        <option v-for="district in districtList" :key="district" :value="district">
          {{ district }}
        </option>
      </select>
      <p v-if="errors.district" id="district-error" class="mt-1 text-sm text-red-500" role="alert">
        {{ errors.district }}
      </p>
    </div>

    <!-- Upazilla Name Field -->
    <div>
      <label for="upazilla" class="block text-sm font-medium text-[var(--text-primary)] mb-2">
        Upazilla Name <span class="text-red-500">*</span>
      </label>
      <select
        id="upazilla"
        v-model="formData.upazilla"
        :disabled="loading || !formData.district"
        class="w-full h-10 px-3 py-2.5 text-sm text-[var(--text-primary)] bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        aria-required="true"
        aria-describedby="upazilla-error"
      >
        <option value="">Select upazilla name</option>
        <option v-for="upazilla in upazillaList" :key="upazilla" :value="upazilla">
          {{ upazilla }}
        </option>
      </select>
      <p v-if="errors.upazilla" id="upazilla-error" class="mt-1 text-sm text-red-500" role="alert">
        {{ errors.upazilla }}
      </p>
    </div>

    <!-- Address Field -->
    <div>
      <label for="address" class="block text-sm font-medium text-[var(--text-primary)] mb-2">
        Address <span class="text-red-500">*</span>
      </label>
      <InputField
        id="address"
        v-model="formData.address"
        type="text"
        :disabled="loading"
        placeholder="Enter address"
        container-class="w-full"
   bg-color="[var(--bg-primary)]"
        text-color="[var(--text-primary)]"
      />
      <p v-if="errors.address" id="address-error" class="mt-1 text-sm text-red-500" role="alert">
        {{ errors.address }}
      </p>
    </div>

    <!-- Package Name Field -->
    <div>
      <label for="package" class="block text-sm font-medium text-[var(--text-primary)] mb-2">
        Package Name <span class="text-red-500">*</span>
      </label>
      <select
        id="package"
        v-model="formData.package"
        :disabled="loading"
        class="w-full h-10 px-3 py-2.5 text-sm text-[var(--text-primary)] bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        aria-required="true"
        aria-describedby="package-error"
      >
        <option value="">Select package</option>
        <option v-for="pkg in packageList" :key="pkg.value" :value="pkg.value">
          {{ pkg.label }}
        </option>
      </select>
      <p v-if="errors.package" id="package-error" class="mt-1 text-sm text-red-500" role="alert">
        {{ errors.package }}
      </p>
    </div>

    <!-- Error Message -->
    <div
      v-if="generalError"
      class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
      role="alert"
    >
      <p class="text-sm text-red-700 dark:text-red-400">{{ generalError }}</p>
    </div>

    <!-- Success Message -->
    <div
      v-if="successMessage"
      class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
      role="status"
    >
      <p class="text-sm text-green-700 dark:text-green-400">{{ successMessage }}</p>
    </div>

    <!-- Submit Button -->
    <div class="flex gap-3 justify-end">
      <button
        type="submit"
        :disabled="loading"
        class="px-4 py-2 text-sm font-medium text-white bg-[var(--bg-brand-solid)] rounded-lg hover:bg-[var(--bg-brand-solid-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
      >
        <span v-if="loading" class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        {{ loading ? 'Adding...' : 'Add Referral' }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useReferralStore } from '@/stores/referral.store';
import InputField from './Shared/InputField.vue';
import Button from './Shared/Button.vue';


const emit = defineEmits(['success', 'cancel']);

const referralStore = useReferralStore();

const formData = reactive({
  name: '',
  phone: '',
  email: '',
  district: '',
  upazilla: '',
  address: '',
  package: ''
});

const errors = reactive({
  name: '',
  phone: '',
  email: '',
  district: '',
  upazilla: '',
  address: '',
  package: ''
});

const loading = ref(false);
const generalError = ref('');
const successMessage = ref('');

// District list (sample data - replace with actual data)
const districtList = [
  'Dhaka', 'Chittagong', 'Rajshahi', 'Khulna', 'Barisal', 'Sylhet', 
  'Rangpur', 'Mymensingh', 'Comilla', 'Narayanganj', 'Gazipur'
];

// Upazilla list based on district (sample data - replace with actual data)
const upazillaList = computed(() => {
  const upazillas = {
    'Dhaka': ['Dhanmondi', 'Gulshan', 'Mirpur', 'Mohammadpur', 'Uttara'],
    'Chittagong': ['Agrabad', 'Khulshi', 'Patenga', 'Halishahar'],
    'Rajshahi': ['Boalia', 'Rajpara', 'Shah Makhdum'],
    'Khulna': ['Daulatpur', 'Khalishpur', 'Sonadanga'],
    'Barisal': ['Barisal Sadar', 'Bakerganj', 'Mehendiganj'],
    'Sylhet': ['Sylhet Sadar', 'Companiganj', 'Golapganj'],
    'Rangpur': ['Rangpur Sadar', 'Gangachara', 'Mithapukur'],
    'Mymensingh': ['Mymensingh Sadar', 'Muktagachha', 'Trishal'],
    'Comilla': ['Comilla Sadar', 'Burichang', 'Chandina'],
    'Narayanganj': ['Narayanganj Sadar', 'Rupganj', 'Sonargaon'],
    'Gazipur': ['Gazipur Sadar', 'Kaliakair', 'Kapasia']
  };
  return upazillas[formData.district] || [];
});

// Package list (sample data - replace with actual data)
const packageList = [
  { label: 'Basic - 10 Mbps', value: 'basic_10' },
  { label: 'Standard - 20 Mbps', value: 'standard_20' },
  { label: 'Premium - 50 Mbps', value: 'premium_50' },
  { label: 'Ultra - 100 Mbps', value: 'ultra_100' },
  { label: 'Enterprise - 200 Mbps', value: 'enterprise_200' }
];

// Normalize phone number to +880 format
const normalizePhone = (phone) => {
  if (!phone) return '';
  
  // Remove all non-digit characters except +
  let cleaned = phone.replace(/[^\d+]/g, '');
  
  // If starts with 0, replace with +880
  if (cleaned.startsWith('0')) {
    cleaned = '+880' + cleaned.substring(1);
  }
  // If starts with 880, add +
  else if (cleaned.startsWith('880')) {
    cleaned = '+' + cleaned;
  }
  // If starts with 1 (without country code), add +880
  else if (cleaned.startsWith('1') && !cleaned.startsWith('+')) {
    cleaned = '+880' + cleaned;
  }
  // If doesn't start with +880, assume it's missing
  else if (!cleaned.startsWith('+880')) {
    cleaned = '+880' + cleaned;
  }
  
  return cleaned;
};

// Validate form
const validateForm = () => {
  let isValid = true;
  
  // Reset errors
  Object.keys(errors).forEach(key => errors[key] = '');
  generalError.value = '';
  
  // Validate name
  if (!formData.name.trim()) {
    errors.name = 'Name is required';
    isValid = false;
  }
  
  // Validate phone
  if (!formData.phone.trim()) {
    errors.phone = 'Phone is required';
    isValid = false;
  } else {
    const phoneRegex = /^(\+?880|0)?1[3-9]\d{8}$/;
    const cleanedPhone = formData.phone.replace(/[^\d+]/g, '');
    if (!phoneRegex.test(cleanedPhone)) {
      errors.phone = 'Please enter a valid Bangladesh phone number';
      isValid = false;
    }
  }
  
  // Validate email
  if (!formData.email.trim()) {
    errors.email = 'Email is required';
    isValid = false;
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }
  }
  
  // Validate district
  if (!formData.district) {
    errors.district = 'District is required';
    isValid = false;
  }
  
  // Validate upazilla
  if (!formData.upazilla) {
    errors.upazilla = 'Upazilla is required';
    isValid = false;
  }
  
  // Validate address
  if (!formData.address.trim()) {
    errors.address = 'Address is required';
    isValid = false;
  }
  
  // Validate package
  if (!formData.package) {
    errors.package = 'Package is required';
    isValid = false;
  }
  
  return isValid;
};

// Reset form
const resetForm = () => {
  formData.name = '';
  formData.phone = '';
  formData.email = '';
  formData.district = '';
  formData.upazilla = '';
  formData.address = '';
  formData.package = '';
  Object.keys(errors).forEach(key => errors[key] = '');
  generalError.value = '';
  successMessage.value = '';
};

// Handle submit
const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }
  
  loading.value = true;
  generalError.value = '';
  successMessage.value = '';
  
  try {
    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: normalizePhone(formData.phone.trim()),
      district: formData.district,
      upazilla: formData.upazilla,
      address: formData.address.trim(),
      package: formData.package
    };
    
    const result = await referralStore.createReferral(payload);
    
    if (result.success) {
      successMessage.value = 'Referral added successfully!';
      
      // Reset form after delay
      setTimeout(() => {
        resetForm();
        emit('success', result.data);
      }, 1000);
    } else {
      // Handle specific error codes
      if (result.statusCode === 409) {
        errors.email = 'This email already exists in your referrals';
      } else {
        generalError.value = result.error || 'Failed to add referral. Please try again.';
      }
    }
  } catch (err) {
    generalError.value = 'An unexpected error occurred. Please try again.';
    console.error('Form submission error:', err);
  } finally {
    loading.value = false;
  }
};

// Handle cancel
const handleCancel = () => {
  resetForm();
  emit('cancel');
};
</script>

<style scoped>
/* Loading spinner animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
