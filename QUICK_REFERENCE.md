# 🚀 BloodLife Platform - Quick Reference Guide

## 📍 Project Location
```
C:\Users\computer\.gemini\antigravity\scratch\blood-life-platform
```

## 🌐 Running the Application

### Start Development Server
```bash
cd C:\Users\computer\.gemini\antigravity\scratch\blood-life-platform
npm run dev
```

**Access at**: http://localhost:5173

### Build for Production
```bash
npm run build
npm run preview
```

## 📁 File Structure Overview

```
blood-life-platform/
├── 📄 Documentation
│   ├── README.md                    # Setup & features
│   ├── PROJECT_SUMMARY.md           # Complete overview
│   ├── COMPONENT_GUIDE.md           # UI/UX documentation
│   └── CREATIVE_FEATURES.md         # Enhancement ideas
│
├── 📦 Configuration
│   ├── package.json                 # Dependencies
│   ├── tailwind.config.js           # Theme config
│   ├── postcss.config.js            # PostCSS setup
│   ├── vite.config.js               # Vite config
│   └── index.html                   # Entry HTML
│
└── 📂 src/
    ├── 🎨 components/
    │   ├── layout/
    │   │   ├── Navbar.jsx           # Navigation bar
    │   │   └── Footer.jsx           # Footer
    │   └── ui/
    │       ├── Button.jsx           # Reusable button
    │       ├── Card.jsx             # Card component
    │       ├── Input.jsx            # Form input
    │       ├── Select.jsx           # Dropdown
    │       ├── Badge.jsx            # Status badge
    │       ├── Modal.jsx            # Dialog modal
    │       ├── Loader.jsx           # Loading state
    │       └── BloodGroupBadge.jsx  # Blood badge
    │
    ├── 🔄 contexts/
    │   ├── ThemeContext.jsx         # Dark/light mode
    │   ├── LanguageContext.jsx      # i18n support
    │   └── DonorContext.jsx         # State management
    │
    ├── 📄 pages/
    │   ├── HomePage.jsx             # Landing page
    │   ├── SearchPage.jsx           # Find donors
    │   ├── RegisterPage.jsx         # Sign up
    │   ├── DashboardPage.jsx        # User dashboard
    │   ├── HospitalsPage.jsx        # Requests
    │   └── AboutPage.jsx            # About us
    │
    ├── 🛠️ lib/
    │   ├── utils.js                 # Helper functions
    │   └── data.js                  # Mock data
    │
    ├── App.jsx                      # Main app
    ├── main.jsx                     # Entry point
    └── index.css                    # Global styles
```

## 🎯 Key Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | HomePage | Landing with hero & features |
| `/search` | SearchPage | Find blood donors |
| `/register` | RegisterPage | Donor registration |
| `/dashboard` | DashboardPage | Donor profile & history |
| `/hospitals` | HospitalsPage | Emergency requests |
| `/about` | AboutPage | About the platform |

## 🎨 Component Quick Reference

### Button
```jsx
import { Button } from './components/ui/Button';

<Button variant="primary" size="md">Click Me</Button>
// Variants: primary, secondary, outline, ghost
// Sizes: sm, md, lg
```

### Card
```jsx
import { Card, CardHeader, CardBody, CardFooter } from './components/ui/Card';

<Card hover>
  <CardHeader>Title</CardHeader>
  <CardBody>Content</CardBody>
  <CardFooter>Footer</CardFooter>
</Card>
```

### Input
```jsx
import { Input } from './components/ui/Input';

<Input 
  label="Email" 
  type="email" 
  error={errors.email}
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

### Badge
```jsx
import { Badge } from './components/ui/Badge';

<Badge variant="success">Available</Badge>
// Variants: success, warning, danger, info
```

### Modal
```jsx
import { Modal } from './components/ui/Modal';

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Title">
  Content here
</Modal>
```

### BloodGroupBadge
```jsx
import { BloodGroupBadge } from './components/ui/BloodGroupBadge';

<BloodGroupBadge bloodGroup="O+" size="lg" />
// Sizes: sm, md, lg
```

## 🔧 Context Usage

### Theme
```jsx
import { useTheme } from './contexts/ThemeContext';

const { theme, toggleTheme } = useTheme();
// theme: 'light' | 'dark'
```

### Language
```jsx
import { useLanguage } from './contexts/LanguageContext';

const { language, changeLanguage, t } = useLanguage();
// language: 'en' | 'hi'
// t('key') - translation function
```

### Donor
```jsx
import { useDonor } from './contexts/DonorContext';

const { 
  donors,              // All donors
  currentDonor,        // Logged-in donor
  donationHistory,     // Donation records
  registerDonor,       // Register new donor
  updateDonor,         // Update profile
  deleteDonor,         // Delete profile
  isDonorRegistered,   // Check duplicate
  loginDonor,          // Login
  logoutDonor,         // Logout
  addDonationRecord    // Add donation
} = useDonor();
```

## 🛠️ Utility Functions

```jsx
import { 
  formatDate,                    // Format date to readable string
  calculateNextDonationDate,     // Calculate next eligible date
  isDonorEligible,               // Check if can donate now
  daysUntilEligible,             // Days until next donation
  calculateDistance,             // Distance between coordinates
  validatePhone,                 // Validate phone number
  validateEmail,                 // Validate email
  generateOTP,                   // Generate 6-digit OTP
  getCompatibleBloodGroups,      // Get compatible blood types
  getBloodGroupColor,            // Get gradient color
  formatPhoneNumber,             // Format for display
  cn                             // Merge class names
} from './lib/utils';
```

## 📊 Mock Data

```jsx
import { 
  mockDonors,              // 8 sample donors
  mockDonationHistory,     // Sample donation records
  mockHospitalRequests,    // 3 hospital requests
  bloodGroups,             // All 8 blood types
  indianStates,            // List of states
  idProofTypes,            // ID proof options
  translations             // i18n strings
} from './lib/data';
```

## 🎨 Tailwind Custom Classes

### Buttons
```css
.btn                    /* Base button */
.btn-primary            /* Blood-red button */
.btn-secondary          /* Teal button */
.btn-outline            /* Outlined button */
.btn-ghost              /* Transparent button */
```

### Cards
```css
.card                   /* Base card */
.card-hover             /* Hover lift effect */
.glass                  /* Glassmorphism */
```

### Inputs
```css
.input                  /* Base input */
.input-error            /* Error state */
```

### Badges
```css
.badge                  /* Base badge */
.badge-success          /* Green badge */
.badge-warning          /* Yellow badge */
.badge-danger           /* Red badge */
.badge-info             /* Blue badge */
```

### Utilities
```css
.gradient-text          /* Blood to accent gradient */
.blood-badge            /* Blood group badge */
.section                /* Page section */
.container-custom       /* Max-width container */
```

## 🎯 Common Tasks

### Add a New Page
1. Create `src/pages/NewPage.jsx`
2. Add route in `src/App.jsx`:
```jsx
<Route path="/new" element={<NewPage />} />
```
3. Add link in `src/components/layout/Navbar.jsx`

### Add a New Component
1. Create `src/components/ui/NewComponent.jsx`
2. Export component
3. Import where needed:
```jsx
import { NewComponent } from './components/ui/NewComponent';
```

### Add Translation
1. Edit `src/lib/data.js`
2. Add to `translations.en` and `translations.hi`
3. Use with `t('key')`

### Add Mock Data
1. Edit `src/lib/data.js`
2. Add to appropriate export
3. Import where needed

### Modify Theme Colors
1. Edit `tailwind.config.js`
2. Update `theme.extend.colors`
3. Use in components with `text-{color}` or `bg-{color}`

## 🔍 Testing Flows

### Test Registration
1. Go to `/register`
2. Fill all 4 steps
3. Use OTP shown in toast
4. Should redirect to `/dashboard`

### Test Search
1. Go to `/search`
2. Click "Use My Location"
3. Apply filters
4. View donor profiles

### Test Dashboard
1. Register first (if not logged in)
2. Go to `/dashboard`
3. Edit profile
4. View QR card
5. Test delete (creates new session)

### Test Theme Toggle
1. Click Sun/Moon icon in navbar
2. Theme should change instantly
3. Refresh page - theme persists

### Test Language Toggle
1. Click Globe icon in navbar
2. Select Hindi
3. Text should change
4. Refresh page - language persists

## 📱 Responsive Testing

### Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Test Points
1. Resize browser to mobile width
2. Check hamburger menu works
3. Verify cards stack properly
4. Test forms are usable
5. Check footer stacks

## 🐛 Common Issues & Solutions

### Issue: Styles not applying
**Solution**: Restart dev server, clear browser cache

### Issue: Components not found
**Solution**: Check import paths are correct

### Issue: Dark mode not working
**Solution**: Check `html` tag has `dark` class

### Issue: Translations not showing
**Solution**: Verify key exists in `translations` object

### Issue: LocalStorage not persisting
**Solution**: Check browser allows localStorage

## 📚 Learning Resources

### React
- [React Docs](https://react.dev)
- [React Router](https://reactrouter.com)

### Tailwind CSS
- [Tailwind Docs](https://tailwindcss.com)
- [Tailwind UI](https://tailwindui.com)

### Framer Motion
- [Framer Motion Docs](https://www.framer.com/motion/)

### Icons
- [Lucide Icons](https://lucide.dev)

## 🎉 Quick Demo Script

1. **Start**: `npm run dev` → Open http://localhost:5173
2. **Home**: Show hero, features, stats
3. **Search**: Filter donors, view profiles
4. **Register**: Complete 4-step form
5. **Dashboard**: Show profile, stats, history
6. **Hospitals**: View emergency requests
7. **Theme**: Toggle dark/light mode
8. **Language**: Switch to Hindi
9. **About**: Show mission and team

## 📞 Support

For issues or questions:
1. Check documentation files
2. Review component code
3. Check browser console for errors
4. Verify all dependencies installed

---

## ✅ Checklist for Presentation

- [ ] Dev server running
- [ ] Browser open to localhost:5173
- [ ] Test registration flow
- [ ] Test search functionality
- [ ] Test theme toggle
- [ ] Test language toggle
- [ ] Show dashboard features
- [ ] Demonstrate responsive design
- [ ] Show hospital requests
- [ ] Highlight animations

---

**BloodLife Platform - Ready to Save Lives! 🩸**

**Version**: 1.0.0
**Status**: ✅ Production Ready
**Last Updated**: December 2024
