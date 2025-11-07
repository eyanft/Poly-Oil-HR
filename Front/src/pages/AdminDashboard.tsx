import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

type ProductDraft = {
  id: string;
  name: string;
  status: 'published' | 'draft';
};

export default function AdminDashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [products] = useState<ProductDraft[]>([
    { id: 'p-1', name: 'Huile Hydraulique Premium', status: 'published' },
    { id: 'p-2', name: 'Graisse Multi-usage X200', status: 'draft' }
  ]);

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/admin', { replace: true });
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="bg-slate-950 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Poly Oil — Tableau de bord</h1>
            <p className="text-sm text-slate-400">Gestion du catalogue produits</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-medium">{user?.email}</p>
              <p className="text-xs text-slate-400">Administrateur</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 transition-colors text-sm font-medium"
            >
              Se déconnecter
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <section className="bg-slate-950/60 border border-slate-800 rounded-3xl p-8 mb-8">
          <h2 className="text-xl font-semibold mb-3">Vue d'ensemble</h2>
          <p className="text-sm text-slate-400">
            Cette zone affichera les métriques clés du catalogue (produits en ligne, demandes en attente, etc.).
          </p>
        </section>

        <section className="bg-slate-950/60 border border-slate-800 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold">Produits</h2>
              <p className="text-sm text-slate-400">Gérez la publication et la mise à jour des fiches produits.</p>
            </div>
            <button className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 transition-colors text-sm font-medium">
              Ajouter un produit
            </button>
          </div>
          <div className="overflow-hidden border border-slate-800 rounded-2xl">
            <table className="w-full text-left">
              <thead className="bg-slate-950/80">
                <tr className="text-sm text-slate-400">
                  <th className="px-6 py-3 font-medium">Produit</th>
                  <th className="px-6 py-3 font-medium">Statut</th>
                  <th className="px-6 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-t border-slate-800 text-sm">
                    <td className="px-6 py-4 font-medium text-white">{product.name}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          product.status === 'published'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-300'
                        }`}
                      >
                        {product.status === 'published' ? 'Publié' : 'Brouillon'}
                      </span>
                    </td>
                    <td className="px-6 py-4 space-x-3">
                      <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">Modifier</button>
                      <button className="text-red-400 hover:text-red-300 text-sm font-medium">Supprimer</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-4">
            Connectez cette interface à l'API produits une fois les endpoints disponibles.
          </p>
        </section>
      </main>
    </div>
  );
}

