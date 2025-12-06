import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { DonorProvider } from './contexts/DonorContext';
import { DataProvider } from './contexts/DataContext';
import { AuthProvider } from './contexts/AuthContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <ThemeProvider>
        <LanguageProvider>
          <DonorProvider>
            <DataProvider>
              <AuthProvider>
                <App />
                <Toaster position="top-right" richColors />
              </AuthProvider>
            </DataProvider>
          </DonorProvider>
        </LanguageProvider>
      </ThemeProvider>
    </HashRouter>
  </StrictMode>
);
