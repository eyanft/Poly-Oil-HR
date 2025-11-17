import { Navigate, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HomePage from './pages/Home';
import AdminLoginPage from './pages/AdminLogin';
import AdminDashboardPage from './pages/AdminDashboard';
import { useAuth } from './contexts/AuthContext';

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { t } = useTranslation();
  const { user, status } = useAuth();

  if (status === 'idle' || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <p className="text-sm text-slate-300">{t('admin.dashboard.loadingProducts')}</p>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/admin" replace />;
  }

  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<AdminLoginPage />} />
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute>
            <AdminDashboardPage />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
