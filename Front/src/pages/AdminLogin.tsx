import { FormEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function AdminLoginPage() {
  const { user, status, error, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isLoading = status === 'loading';

  useEffect(() => {
    if (user?.role === 'admin') {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage(null);
    try {
      await login(email, password);
      setSuccessMessage('Connexion réussie. Redirection vers le tableau de bord...');
      setEmail('');
      setPassword('');
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Espace Administrateur</h1>
          <p className="text-gray-500 mt-2">Connectez-vous pour gérer le catalogue produits.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email professionnel
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin@poly-oil.com"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
              disabled={isLoading}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {successMessage && <p className="text-green-600 text-sm">{successMessage}</p>}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-red-600 text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </button>

          <p className="text-xs text-center text-gray-400">
            Un cookie sécurisé permet de maintenir votre session administrateur.
          </p>
        </form>
      </div>
    </div>
  );
}

