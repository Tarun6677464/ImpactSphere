import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import AppLayout from './layouts/AppLayout';

const AnimalWelfarePage = lazy(() => import('./pages/AnimalWelfarePage'));
const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage'));
const CorporateFundingPage = lazy(() => import('./pages/CorporateFundingPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const DonationsPage = lazy(() => import('./pages/DonationsPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const ScholarshipsPage = lazy(() => import('./pages/ScholarshipsPage'));
const VolunteerLoginPage = lazy(() => import('./pages/VolunteerLoginPage'));

export default function App() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-slate-500">Loading...</div>}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/admin" element={<AdminLoginPage />} />
        <Route path="/login/volunteer" element={<VolunteerLoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="donations" element={<DonationsPage />} />
          <Route path="corporate-funding" element={<CorporateFundingPage />} />
          <Route
            path="animal-welfare"
            element={
              <ProtectedRoute roles={['ADMIN', 'VOLUNTEER']}>
                <AnimalWelfarePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="scholarships"
            element={
              <ProtectedRoute roles={['ADMIN', 'VOLUNTEER']}>
                <ScholarshipsPage />
              </ProtectedRoute>
            }
          />
          <Route index element={<Navigate to="/dashboard" replace />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
}
