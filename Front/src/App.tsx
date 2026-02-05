import { Navigate, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HomePage from './pages/Home';
import SplashScreen from './components/SplashScreen';
import HuileMoteurTunisiePage from './pages/HuileMoteurTunisie';
import LubrifiantsAutomobilesPage from './pages/LubrifiantsAutomobiles';
import EauLaveGlacePage from './pages/EauLaveGlace';
import ContactPage from './pages/Contact';
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
      <Route path="/" element={<SplashScreen />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/huile-moteur-tunisie" element={<HuileMoteurTunisiePage />} />
      <Route path="/lubrifiants-automobiles" element={<LubrifiantsAutomobilesPage />} />
      <Route path="/eau-lave-glace" element={<EauLaveGlacePage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/admin" element={<AdminLoginPage />} />
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute>
            <AdminDashboardPage />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}
