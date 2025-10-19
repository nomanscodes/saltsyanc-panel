// Mock data seed for referrals
export interface ReferralItem {
  id: string;
  date: string;
  name: string;
  phone: string;
  email: string;
  status: 'pending' | 'success' | 'rejected';
  discount: number | null;
  point: number | null;
  createdAt: Date;
}

const statuses: Array<'pending' | 'success' | 'rejected'> = ['pending', 'success', 'rejected'];
const names = [
  'Forhad Sheikh', 'Nathan Richards', 'Jessica Parker', 'Tanya Lopez', 
  'Michelle Chen', 'Curtis Brown', 'Sarah Wilson', 'Ahmed Khan',
  'Priya Sharma', 'David Lee', 'Emma Davis', 'Michael Johnson',
  'Sophia Martinez', 'James Anderson', 'Olivia Taylor', 'Daniel Thomas',
  'Isabella Garcia', 'Matthew White', 'Mia Rodriguez', 'Christopher Harris'
];

const emailDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];

// Generate random date within last 6 months
const getRandomDate = (): Date => {
  const now = new Date();
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
  const timestamp = sixMonthsAgo.getTime() + Math.random() * (now.getTime() - sixMonthsAgo.getTime());
  return new Date(timestamp);
};

// Format date as "DD Month, YYYY"
const formatDate = (date: Date): string => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
};

// Generate phone number
const generatePhone = (): string => {
  const areaCode = Math.floor(Math.random() * 900) + 100;
  const firstPart = Math.floor(Math.random() * 900) + 100;
  const secondPart = Math.floor(Math.random() * 9000) + 1000;
  return `(${areaCode}) ${firstPart}-${secondPart}`;
};

// Generate email from name
const generateEmail = (name: string): string => {
  const firstName = name.split(' ')[0].toLowerCase();
  const domain = emailDomains[Math.floor(Math.random() * emailDomains.length)];
  return `${firstName}@${domain}`;
};

// Generate referral items (15-25 items)
const generateReferrals = (): ReferralItem[] => {
  const count = Math.floor(Math.random() * 11) + 15; // 15-25 items
  const items: ReferralItem[] = [];
  
  for (let i = 0; i < count; i++) {
    const name = names[Math.floor(Math.random() * names.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const createdAt = getRandomDate();
    const hasEmail = Math.random() > 0.2; // 80% have email
    
    items.push({
      id: `REF-${Date.now()}-${i}`,
      date: formatDate(createdAt),
      name,
      phone: generatePhone(),
      email: hasEmail ? generateEmail(name) : '',
      status,
      discount: status === 'success' ? (Math.random() > 0.5 ? 200 : 10) : null,
      point: status === 'success' ? (Math.random() > 0.5 ? 200 : 100) : null,
      createdAt
    });
  }
  
  // Sort by date descending (newest first)
  return items.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

// Seed data
export let mockReferrals: ReferralItem[] = generateReferrals();

// User profile
export const mockProfile = {
  id: 'USER-001',
  name: 'Current User',
  email: 'user@example.com',
  referralCode: 'ABC123',
  referralLink: 'https://example.com/referral?code=ABC123',
};

// Reset seed data (useful for testing)
export const resetSeedData = (): void => {
  mockReferrals = generateReferrals();
};
