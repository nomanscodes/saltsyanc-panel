# SaltSync Referral Module

A modern, fully-featured referral management system built with Vue 3, Pinia, and Tailwind CSS. This application provides a comprehensive interface for managing referrals, tracking points, and monitoring referral history.

## 🚀 Features

### Core Functionality
- **Referral Link Management**: Copy and share referral links with integrated QR code
- **Points System**: Track current and lifetime points with detailed breakdown
- **Referral History**: Advanced table with search, filtering, and pagination
- **Add Referrals**: Comprehensive form with validation and phone normalization
- **Dark Mode**: Seamless light/dark theme switching with localStorage persistence
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop

### Key Components
- **GlobalDrawer**: Reusable drawer component with focus-trap and keyboard navigation
- **ReferralForm**: Multi-field form with district/upazilla dependency and validation
- **CopyReferralLink**: Share referral links via social media or QR code
- **PointsBalanceCard**: Visual points display with breakdown categories
- **ReferralHistoryTable**: Sortable, filterable table with pagination

## 🛠️ Tech Stack

- **Framework**: Vue 3 (Composition API)
- **State Management**: Pinia
- **Routing**: Vue Router
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide Vue Next
- **Build Tool**: Vite
- **Package Manager**: pnpm

## 📋 Prerequisites

- Node.js: `^20.19.0 || >=22.12.0`
- pnpm: `10.16.1+`

## 🔧 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd test
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Start development server**
```bash
pnpm dev
```

4. **Build for production**
```bash
pnpm build
```

5. **Preview production build**
```bash
pnpm preview
```

## 📁 Project Structure

```
├── public/               # Static assets
├── src/
│   ├── assets/          # Images, fonts, etc.
│   ├── components/      # Vue components
│   │   ├── Shared/     # Reusable components (Button, InputField, etc.)
│   │   ├── Header.vue
│   │   ├── Sidebar.vue
│   │   ├── GlobalDrawer.vue
│   │   ├── ReferralForm.vue
│   │   └── ...
│   ├── composables/     # Vue composables
│   │   └── useDarkMode.js
│   ├── config/          # Configuration files
│   │   └── navigation.js
│   ├── router/          # Vue Router configuration
│   ├── stores/          # Pinia stores
│   │   ├── referral.store.js
│   │   └── points.store.js
│   ├── views/           # Page components
│   │   └── ReferralsView.vue
│   ├── App.vue
│   └── main.js
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Design System

### Color System
The application uses CSS custom properties for theming:
- `--bg-primary`: Primary background
- `--text-primary`: Primary text
- `--border-primary`: Primary borders
- `--bg-brand-solid`: Brand color
- And many more...

### Responsive Breakpoints
- Mobile: `< 640px`
- Tablet: `640px - 1024px`
- Desktop: `> 1024px`

### Component Props
All reusable components accept customizable props:
- **Button**: text, icon, size, colors, padding
- **InputField**: type, placeholder, colors, disabled
- **GlobalDrawer**: title, size, side, slots

## 🔑 Key Features Detail

### 1. Referral Form
- **7 Fields**: Name, Phone, Email, District, Upazilla, Address, Package
- **Validation**: HTML5 + custom validation
- **Phone Normalization**: Auto-formats to +880 Bangladesh format
- **Dynamic Dropdowns**: Upazilla options based on selected district
- **Error Handling**: Field-level and form-level error messages

### 2. Dark Mode
- Toggle button in header
- Persists to localStorage
- Respects system preference
- Smooth transitions
- All components support dark mode

### 3. Responsive Layout
- Mobile hamburger menu
- Collapsible sidebar
- Adaptive spacing and font sizes
- Horizontal scroll tables on mobile
- Stack to column layout on small screens

### 4. State Management (Pinia)
```javascript
// Referral Store
- userProfile
- referrals
- searchQuery
- statusFilter
- pagination
- createReferral()
- fetchReferrals()

// Points Store
- currentPoints
- lifetimePoints
- pointsBreakdown
- fetchPoints()
```

## 🔐 Form Validation

### Phone Number
- Accepts formats: `01XXXXXXXXX`, `+8801XXXXXXXXX`, `8801XXXXXXXXX`
- Auto-normalizes to: `+880XXXXXXXXX`
- Validates Bangladesh mobile numbers (starts with 013-019)

### Email
- Standard email validation
- Duplicate detection (409 error)

### Required Fields
All fields except phone are required with visual indicators

## 📱 Mobile Optimization

- Touch-friendly button sizes
- Reduced padding and margins
- Smaller font sizes
- Horizontal scroll tables
- Stacked layouts
- Hidden non-essential UI elements
- Optimized spacing

## 🎯 Usage Examples

### Adding a Referral
1. Click "Request for New Connection"
2. Fill in all required fields
3. Select district (upazilla auto-populates)
4. Submit form
5. Success message and auto-close drawer

### Searching Referrals
1. Type in search box (debounced 300ms)
2. Filter by status dropdown
3. Results update automatically
4. Paginate through results

### Copying Referral Link
1. Click "Copy" button
2. Toast notification appears
3. Link copied to clipboard
4. Share via social media icons

## 🧪 Mock API

The application includes a mock API service with:
- 300-800ms latency simulation
- Realistic error responses
- 15-25 seeded referral items
- Duplicate email detection (409)
- Pagination support

## 🎨 Customization

### Changing Theme Colors
Edit CSS custom properties in your global styles:
```css
:root {
  --bg-brand-solid: #your-color;
  --text-primary: #your-color;
}
```

### Adding New Routes
```javascript
// router/index.js
{
  path: '/new-route',
  component: () => import('@/views/NewView.vue')
}
```

### Creating Reusable Components
Follow the pattern in `src/components/Shared/`:
- Accept customizable props
- Use CSS variables for theming
- Support dark mode
- Include responsive classes

## 🐛 Troubleshooting

### Dark mode not persisting
- Check localStorage is enabled
- Clear browser cache
- Check console for errors

### Form not submitting
- Check browser console for validation errors
- Ensure all required fields are filled
- Verify phone number format

### Table not loading
- Check Pinia store state
- Verify API service is imported
- Check browser network tab

## 📄 License

This project is private and proprietary.

## 👥 Contributing

This is a private project. Contributions are managed internally.

## 📞 Support

For issues or questions, please contact the development team.

---

**Built with ❤️ using Vue 3, Pinia, and Tailwind CSS**
