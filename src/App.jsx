import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { HospitalsPage } from './pages/HospitalsPage';
import { HospitalDashboardPage } from './pages/HospitalDashboardPage';
import { AboutPage } from './pages/AboutPage';
import { EligibilityPage } from './pages/EligibilityPage';
import { DonationProcessPage } from './pages/DonationProcessPage';
import { HealthBenefitsPage } from './pages/HealthBenefitsPage';
import { FaqPage } from './pages/FaqPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminHospitalsPage } from './pages/admin/AdminHospitalsPage';
import { useTheme } from './contexts/ThemeContext';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { theme } = useTheme();
  const location = useLocation();

  const isRouteAdmin = location.pathname.startsWith('/admin');

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${theme === 'dark' ? 'dark' : ''}`}>
      {!isRouteAdmin && <Navbar />}

      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/hospitals" element={<HospitalsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/eligibility" element={<EligibilityPage />} />
          <Route path="/process" element={<DonationProcessPage />} />
          <Route path="/benefits" element={<HealthBenefitsPage />} />
          <Route path="/faq" element={<FaqPage />} />

          {/* Protected / Role Based */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/hospital-dashboard" element={<HospitalDashboardPage />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/hospitals" element={<AdminHospitalsPage />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!isRouteAdmin && <Footer />}
    </div>
  );
}

export default App;
