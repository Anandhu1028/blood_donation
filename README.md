# BloodLife - Blood Donor Platform

A complete frontend-only Blood Bank Web Platform built with React, featuring a modern, stylish, and user-friendly UI for connecting blood donors with those in need.

## 🩸 Features

### Core Functionality
- **Donor Search**: Search for blood donors by blood group, location, and distance with real-time filtering
- **Donor Registration**: Multi-step registration flow with OTP verification (mock frontend)
- **Duplicate Prevention**: UI-level validation prevents duplicate registrations
- **Donor Dashboard**: Manage profile, view donation history, and track eligibility
- **Hospital Requests**: View emergency blood requests from hospitals
- **Profile Management**: Edit profile, delete account, and manage availability status

### UI/UX Features
- **Responsive Design**: Fully responsive across all devices
- **Dark/Light Theme**: Toggle between themes with localStorage persistence
- **Multilingual Support**: English and Hindi language options
- **Smooth Animations**: Framer Motion animations throughout
- **Toast Notifications**: Real-time feedback using Sonner
- **Modern Design**: Clean typography, vibrant colors, and glassmorphism effects
- **Blood Group Badges**: Color-coded gradient badges for each blood type
- **QR Code Donor Card**: Digital donor card (mock frontend)
- **Distance Calculation**: Haversine formula for accurate distance measurement

### Advanced Features
- **Eligibility Tracking**: Automatic calculation of next eligible donation date (90-day gap)
- **Availability Status**: Real-time donor availability indicators
- **Blood Compatibility**: Built-in blood group compatibility checker
- **Donation History**: Track all past donations with details
- **Emergency Banner**: Highlighted critical hospital requests
- **Location Services**: Geolocation support for finding nearby donors

## 🛠️ Tech Stack

- **React 19** - UI library
- **React Router DOM** - Client-side routing
- **Tailwind CSS 4** - Utility-first styling
- **Framer Motion** - Animations
- **Lucide React** - Icon library
- **Sonner** - Toast notifications
- **date-fns** - Date manipulation
- **clsx & tailwind-merge** - Class name utilities
- **Vite** - Build tool

## 📁 Project Structure

```
blood-life-platform/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx          # Navigation with theme/language toggle
│   │   │   └── Footer.jsx          # Footer with links and contact
│   │   └── ui/
│   │       ├── Button.jsx          # Reusable button component
│   │       ├── Card.jsx            # Card with header, body, footer
│   │       ├── Input.jsx           # Form input with validation
│   │       ├── Select.jsx          # Dropdown select
│   │       ├── Badge.jsx           # Status badges
│   │       ├── Modal.jsx           # Animated modal dialog
│   │       ├── Loader.jsx          # Loading spinner
│   │       └── BloodGroupBadge.jsx # Blood group display
│   ├── contexts/
│   │   ├── ThemeContext.jsx        # Dark/light theme management
│   │   ├── LanguageContext.jsx     # Multilingual support
│   │   └── DonorContext.jsx        # Donor state management
│   ├── pages/
│   │   ├── HomePage.jsx            # Landing page with hero & features
│   │   ├── SearchPage.jsx          # Donor search with filters
│   │   ├── RegisterPage.jsx        # Multi-step registration
│   │   ├── DashboardPage.jsx       # Donor dashboard
│   │   ├── HospitalsPage.jsx       # Hospital blood requests
│   │   └── AboutPage.jsx           # About page
│   ├── lib/
│   │   ├── utils.js                # Utility functions
│   │   └── data.js                 # Mock data & constants
│   ├── App.jsx                     # Main app with routing
│   ├── main.jsx                    # Entry point
│   └── index.css                   # Global styles
├── tailwind.config.js              # Tailwind configuration
├── postcss.config.js               # PostCSS configuration
└── package.json                    # Dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Navigate to the project directory:
```bash
cd blood-life-platform
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 🎨 Design System

### Color Palette
- **Primary (Blood)**: Red shades (#e63946, #ff6b6b, #c1121f)
- **Accent**: Teal shades (#2a9d8f, #4ecdc4)
- **Background**: Gray-50 (light) / Gray-950 (dark)

### Typography
- **Display Font**: Outfit (headings)
- **Body Font**: Inter (content)

### Components
All components follow a consistent design pattern with:
- Hover effects and transitions
- Dark mode support
- Responsive breakpoints
- Accessibility features

## 📱 Pages Overview

### 1. Home Page
- Hero section with CTA buttons
- Statistics showcase
- Feature highlights
- Benefits section
- Call-to-action

### 2. Search Donors
- Advanced filters (blood group, city, distance, availability)
- Donor cards with details
- Distance calculation from user location
- Detailed donor profile modal
- Contact options (call, email)

### 3. Register
- **Step 1**: Personal info (name, age, gender, blood group)
- **Step 2**: Contact details (phone, email, emergency contact)
- **Step 3**: Address & ID proof
- **Step 4**: OTP verification (mock)
- Duplicate registration prevention
- Form validation

### 4. Dashboard
- Profile overview with blood group badge
- Eligibility status and countdown
- Donation statistics
- Donation history
- Edit profile
- QR code donor card (mock)
- Delete profile option

### 5. Hospital Requests
- Emergency blood requests
- Urgency indicators (Critical, High, Medium)
- Hospital contact information
- Blood units needed
- Call-to-action buttons

### 6. About
- Mission statement
- Core values
- Statistics
- How it works
- Team section

## 🔧 Key Features Implementation

### Duplicate Registration Prevention
```javascript
// Checks phone and email before registration
if (isDonorRegistered(formData.phone, formData.email)) {
  toast.error('You are already registered!');
}
```

### Eligibility Calculation
```javascript
// 90-day gap between donations
function calculateNextDonationDate(lastDonationDate) {
  const next = new Date(lastDonationDate);
  next.setDate(next.getDate() + 90);
  return next;
}
```

### Distance Calculation
```javascript
// Haversine formula for accurate distance
function calculateDistance(lat1, lon1, lat2, lon2) {
  // Returns distance in kilometers
}
```

### Blood Compatibility
```javascript
const bloodCompatibility = {
  'A+': ['A+', 'A-', 'O+', 'O-'],
  'AB+': ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  // ... more mappings
};
```

## 💾 Data Persistence

All data is stored in localStorage:
- Donor profiles
- Current user session
- Donation history
- Theme preference
- Language preference

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Mock Features (Frontend Only)

The following features are mocked for demonstration:
- OTP verification (displays OTP in toast)
- ID proof upload
- QR code generation
- Map integration (coordinates stored, no actual map)
- Hospital requests (static data)

## 🎯 Future Enhancements

- Backend integration with API
- Real OTP service
- Actual map integration (Leaflet/Google Maps)
- Real-time notifications
- Blood availability heatmap
- Advanced analytics dashboard
- Social sharing features
- Email notifications
- SMS alerts

## 📄 License

This is a demonstration project for educational purposes.

## 👥 Contributing

This is a frontend-only demo project. Feel free to fork and enhance!

## 🙏 Acknowledgments

- Icons by Lucide
- Fonts by Google Fonts
- Animations by Framer Motion
- UI inspiration from modern healthcare platforms

---

**Built with ❤️ for saving lives**
