import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { ThemeProvider } from './components/theme-provider';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import OrdersPage from './pages/OrdersPage';
import EarningsPage from './pages/EarningsPage';
import ProfilePage from './pages/ProfilePage';
import NewOrderPage from './pages/NewOrderPage';
import TestConnection from './pages/TestConnection';
import './styles/globals.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="opti-ui-theme">
        <Router>
          <div className="min-h-screen bg-background font-sans antialiased">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              
              {/* Customer Routes */}
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/earnings" element={<EarningsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/new-order" element={<NewOrderPage />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              
              {/* Test Route */}
              <Route path="/test" element={<TestConnection />} />
              
              {/* Redirect unknown routes */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <Toaster position="top-center" richColors />
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;