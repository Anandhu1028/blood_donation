# BloodLife Platform - Component & UI Behavior Documentation

## 🎨 Design Philosophy

The BloodLife platform follows modern web design principles with:
- **Vibrant Color Palette**: Blood-red primary colors with teal accents
- **Smooth Animations**: Framer Motion for page transitions and micro-interactions
- **Glassmorphism**: Frosted glass effects on cards and modals
- **Responsive First**: Mobile-first approach with breakpoints at sm, md, lg, xl
- **Dark Mode**: Full dark mode support with smooth transitions
- **Accessibility**: ARIA labels, keyboard navigation, and semantic HTML

## 📐 Layout Structure

### Navbar
- **Sticky positioning** at top with backdrop blur
- **Active route indicator** with animated underline
- **Mobile hamburger menu** with slide-down animation
- **Theme toggle** (Sun/Moon icons)
- **Language selector** dropdown (English/Hindi)
- **User menu** showing logged-in donor name with dashboard link
- **Logout button** (only when authenticated)

### Footer
- **4-column grid** on desktop, stacked on mobile
- **Brand section** with logo and social links
- **Quick links** to main pages
- **Resources** for blood donation info
- **Contact information** with icons
- **Copyright** and legal links

## 🧩 Reusable Components

### Button (`Button.jsx`)
**Variants:**
- `primary`: Blood-red background, white text
- `secondary`: Teal background
- `outline`: Transparent with border
- `ghost`: Transparent, hover background

**Sizes:** `sm`, `md`, `lg`

**Behavior:**
- Hover: Scale down slightly (active:scale-95)
- Disabled: 50% opacity, no pointer events
- Icons: Automatically spaced with gap-2

### Card (`Card.jsx`)
**Structure:**
- `Card`: Main container with shadow and border
- `CardHeader`: Top section with bottom border
- `CardBody`: Main content area
- `CardFooter`: Bottom section with top border

**Props:**
- `hover`: Adds hover lift effect (-translate-y-1)
- `className`: Custom styling

### Input (`Input.jsx`)
**Features:**
- Label above input
- Error message below in red
- Focus ring in blood-red
- Dark mode support
- Full width by default

### Select (`Select.jsx`)
**Features:**
- Dropdown with placeholder
- Options array or object with value/label
- Error handling
- Cursor pointer on hover

### Badge (`Badge.jsx`)
**Variants:**
- `success`: Green (available status)
- `warning`: Yellow (pending eligibility)
- `danger`: Red (critical/unavailable)
- `info`: Blue (informational)

### BloodGroupBadge (`BloodGroupBadge.jsx`)
**Features:**
- Circular gradient background
- Color varies by blood group
- Sizes: sm (40px), md (48px), lg (64px)
- Bold white text

### Modal (`Modal.jsx`)
**Behavior:**
- Backdrop blur overlay
- Click outside to close
- Escape key to close
- Smooth scale-in animation
- Prevents body scroll when open
- Sizes: sm, md, lg, xl

### Loader (`Loader.jsx`)
**Features:**
- Blood droplet icon with bounce animation
- "Loading..." text
- Optional fullScreen mode with backdrop

## 📄 Page Layouts

### HomePage
**Sections:**
1. **Hero**: Gradient background, tagline, CTA buttons, animated blood group badges
2. **Stats**: 4-column grid with donor count, donations, lives saved, hospitals
3. **Features**: 6 feature cards with icons and descriptions
4. **Benefits**: 2-column layout with checklist and CTA card
5. **Final CTA**: Full-width gradient section

**Animations:**
- Staggered fade-in for feature cards
- Floating blood droplet in hero
- Hover effects on all cards

### SearchPage
**Layout:**
- **Sidebar (1/4)**: Sticky filters card
  - Blood group dropdown
  - City dropdown
  - Distance slider (5-100km)
  - Availability checkbox
  - "Use My Location" button
- **Results (3/4)**: Donor cards
  - Blood group badge
  - Name, age, gender, location
  - Distance from user
  - Availability status
  - Last donation date
  - Action buttons (View, Call, Email)

**Behavior:**
- Real-time filtering
- Distance calculation using geolocation
- Sort by distance (nearest first)
- Modal for detailed donor profile

### RegisterPage
**Multi-Step Form:**

**Step 1: Personal Info**
- Full name (required)
- Age (18-65, required)
- Gender (dropdown, required)
- Blood group (dropdown, required)
- Last donation date (optional)

**Step 2: Contact**
- Phone (10 digits, required, duplicate check)
- Email (validated, required, duplicate check)
- Emergency contact (10 digits, required)

**Step 3: Address & ID**
- Address (required)
- City (required)
- State (dropdown, required)
- Pincode (6 digits, required)
- ID proof type (dropdown, required)
- ID proof number (required)

**Step 4: OTP Verification**
- 6-digit OTP input
- Mock OTP displayed in toast
- Resend OTP button

**UI Behavior:**
- Progress indicator at top
- Validation on each step
- Can't proceed with errors
- Back button (except step 1)
- Smooth slide transitions between steps
- Duplicate registration shows error toast

### DashboardPage
**Layout:**
- **Left Sidebar (1/3)**:
  - Blood group badge
  - Donor name and details
  - Availability status
  - Quick stats
  - Edit and QR card buttons
  - Delete profile link

- **Main Content (2/3)**:
  - **Stats Cards**: Total donations, last donation, badge level
  - **Eligibility Card**: 
    - If eligible: Green checkmark, "You're Eligible!" message
    - If not: Orange clock, countdown to next eligible date
  - **Donation History**: List of past donations with location and date

**Modals:**
- **Edit Profile**: Form with phone, email, address, city, availability toggle
- **Delete Confirmation**: Warning with confirm/cancel buttons
- **QR Card**: Mock QR code with donor details, download button

### HospitalsPage
**Layout:**
- **Header**: Gradient with title
- **Emergency Banner**: Red background, shows count of critical requests
- **Request Cards**: Full-width cards with:
  - Blood group badge
  - Hospital name and location
  - Urgency badge (Critical/High/Medium)
  - Units needed
  - Contact person
  - Action buttons (Call, Map, Donate)

**Urgency Indicators:**
- Critical: Red badge, pulsing alert icon, red border on card
- High: Orange badge
- Medium: Blue badge

### AboutPage
**Sections:**
1. **Hero**: Gradient background with mission statement
2. **Mission**: Centered text block
3. **Stats**: 4-column grid (lives saved, donors, hospitals, cities)
4. **Values**: 4 value cards with icons
5. **How It Works**: 3-step process with large numbers
6. **Team**: 4 team member cards with emoji avatars
7. **CTA**: Gradient section with "Become a Donor" button

## 🎭 Animations & Transitions

### Page Transitions
- Fade in on mount
- Staggered children animations
- Scroll-triggered animations (whileInView)

### Micro-Interactions
- Button hover: Slight scale and shadow
- Card hover: Lift effect (-translate-y-1)
- Input focus: Ring animation
- Modal: Scale in from 95% to 100%
- Toast: Slide in from right

### Loading States
- Bouncing blood droplet
- Skeleton screens (not implemented but can be added)

## 🌈 Color System

### Blood Group Gradients
- A+: Red to Pink
- A-: Dark Red to Dark Pink
- B+: Orange to Red
- B-: Dark Orange to Dark Red
- AB+: Purple to Pink
- AB-: Dark Purple to Dark Pink
- O+: Rose to Red
- O-: Dark Rose to Dark Red

### Status Colors
- Available: Green (#10b981)
- Unavailable: Red (#ef4444)
- Pending: Yellow (#f59e0b)
- Info: Blue (#3b82f6)

## 🔔 Notifications (Toast)

**Types:**
- Success: Green checkmark
- Error: Red X
- Info: Blue info icon
- Warning: Yellow warning icon

**Triggers:**
- Registration success
- Profile update
- Profile deletion
- OTP sent
- Invalid OTP
- Duplicate registration
- Form validation errors

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md, lg)
- **Desktop**: > 1024px (xl)

**Responsive Behaviors:**
- Navbar: Hamburger menu on mobile
- Grid layouts: Stack on mobile
- Sidebar filters: Hidden on mobile (toggle button)
- Footer: 1 column on mobile, 4 on desktop
- Cards: Full width on mobile, grid on desktop

## 🔐 Authentication Flow

1. User visits site (not logged in)
2. Clicks "Register" in navbar
3. Completes 4-step registration
4. OTP verification (mock)
5. Redirected to dashboard
6. Navbar shows user name and logout button
7. Can access dashboard
8. Logout clears session

**Protected Routes:**
- Dashboard: Redirects to /register if not logged in

**Duplicate Prevention:**
- Check phone and email in step 2
- Show error toast if already registered
- Suggest login or delete existing profile

## 💾 LocalStorage Schema

```javascript
{
  "donors": [...], // Array of all donors
  "currentDonor": {...}, // Logged-in donor object
  "donationHistory": {...}, // Object keyed by donor ID
  "theme": "light" | "dark",
  "language": "en" | "hi"
}
```

## 🌍 Multilingual Support

**Supported Languages:**
- English (en)
- Hindi (hi)

**Translated Elements:**
- Navbar links
- Page titles
- Button labels
- Common phrases

**Implementation:**
```javascript
const { t } = useLanguage();
<h1>{t('appName')}</h1> // "BloodLife" or "ब्लडलाइफ"
```

## 🎯 Key User Flows

### Flow 1: Find a Donor
1. Click "Find Donor" on homepage
2. Allow location access (or use default)
3. Select blood group filter
4. Adjust distance slider
5. View donor cards sorted by distance
6. Click "View Profile" for details
7. Call or email donor

### Flow 2: Register as Donor
1. Click "Register" in navbar
2. Fill Step 1: Personal info
3. Fill Step 2: Contact (duplicate check)
4. Fill Step 3: Address & ID
5. Receive OTP (mock, shown in toast)
6. Enter OTP in Step 4
7. Submit and redirect to dashboard

### Flow 3: Manage Profile
1. Login (automatic after registration)
2. View dashboard
3. Click "Edit" to update details
4. Toggle availability status
5. View donation history
6. Generate QR card
7. Delete profile if needed

### Flow 4: Respond to Hospital Request
1. Visit "Hospital Requests" page
2. See emergency banner for critical requests
3. Filter by blood group (implicit)
4. Click "Call Hospital" to contact
5. Click "I Can Donate" to express interest

## 🎨 UI Best Practices Implemented

✅ **Consistent spacing**: 4px, 8px, 12px, 16px, 24px, 32px
✅ **Rounded corners**: 8px (lg), 12px (xl), 16px (2xl)
✅ **Shadow hierarchy**: sm, md, lg, xl, 2xl
✅ **Font sizes**: xs, sm, base, lg, xl, 2xl, 3xl, 4xl
✅ **Icon sizes**: Consistent 16px (sm), 20px (md), 24px (lg)
✅ **Button padding**: Proportional to size
✅ **Form spacing**: Consistent gaps between fields
✅ **Card padding**: 24px (p-6) standard
✅ **Section padding**: 64px vertical (py-16)
✅ **Container max-width**: 1280px (max-w-7xl)

## 🚀 Performance Optimizations

- Lazy loading for images (can be added)
- Memoized filtered lists (useMemo)
- Debounced search inputs (utility provided)
- Optimized re-renders with proper key props
- CSS transitions over JS animations where possible
- Minimal bundle size with tree-shaking

---

**This documentation serves as a complete reference for understanding the UI behavior, component structure, and user interactions in the BloodLife platform.**
