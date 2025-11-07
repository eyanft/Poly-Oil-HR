import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import * as productService from '../services/products';

type ProductFormData = {
  name: string;
  category: string;
  description: string;
  image: string;
  volume: string;
  oilType: string;
  viscosity: string;
  apiStandard: string;
  aceaStandard: string;
  manufacturerStandards: string;
  applications: string;
  technology: string;
  packaging: string;
  specifications: string;
  features: string;
  price: string;
};

const EMPTY_FORM: ProductFormData = {
  name: '',
  category: '',
  description: '',
  image: '',
  volume: '',
  oilType: '',
  viscosity: '',
  apiStandard: '',
  aceaStandard: '',
  manufacturerStandards: '',
  applications: '',
  technology: '',
  packaging: '',
  specifications: '',
  features: '',
  price: '',
};

function toFormData(product: productService.Product): ProductFormData {
  return {
    name: product.name ?? '',
    category: product.category ?? '',
    description: product.description ?? '',
    image: product.image ?? '',
    volume: product.volume ?? '',
    oilType: product.oilType ?? '',
    viscosity: product.viscosity ?? '',
    apiStandard: product.apiStandard ?? '',
    aceaStandard: product.aceaStandard ?? '',
    manufacturerStandards: product.manufacturerStandards ?? '',
    applications: product.applications ?? '',
    technology: product.technology ?? '',
    packaging: product.packaging ?? '',
    specifications: (product.specifications ?? []).join('\n'),
    features: (product.features ?? []).join('\n'),
    price: product.price ?? '',
  };
}

function parseMultiline(value: string) {
  return value
    .split(/[\n;]+/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

export default function AdminDashboardPage() {
  const { user, accessToken, logout } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<productService.Product[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [formData, setFormData] = useState<ProductFormData>(EMPTY_FORM);
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/admin', { replace: true });
    }
  }, [user, navigate]);

  const loadProducts = useCallback(async () => {
    try {
      setStatus('loading');
      setError(null);
      const data = await productService.fetchProducts();
      setProducts(data);
      setStatus('idle');
    } catch (err) {
      console.error('Failed to load products', err);
      setStatus('error');
      setError(err instanceof Error ? err.message : "Impossible de charger les produits");
    }
  }, []);

  useEffect(() => {
    void loadProducts();
  }, [loadProducts]);

  const handleLogout = async () => {
    await logout();
    navigate('/', { replace: true });
  };

  const openCreateForm = () => {
    setFormMode('create');
    setFormData(EMPTY_FORM);
    setActiveProductId(null);
    setFormError(null);
    setIsFormOpen(true);
  };

  const openEditForm = (product: productService.Product) => {
    setFormMode('edit');
    setActiveProductId(product._id);
    setFormData(toFormData(product));
    setFormError(null);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setFormData(EMPTY_FORM);
    setActiveProductId(null);
    setIsSubmitting(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!accessToken) {
      setFormError('Votre session a expiré. Merci de vous reconnecter.');
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    const payload: productService.ProductPayload = {
      name: formData.name.trim(),
      category: formData.category.trim(),
      description: formData.description.trim(),
      image: formData.image.trim(),
      volume: formData.volume.trim(),
      oilType: formData.oilType.trim() || undefined,
      viscosity: formData.viscosity.trim() || undefined,
      apiStandard: formData.apiStandard.trim() || undefined,
      aceaStandard: formData.aceaStandard.trim() || undefined,
      manufacturerStandards: formData.manufacturerStandards.trim() || undefined,
      applications: formData.applications.trim() || undefined,
      technology: formData.technology.trim() || undefined,
      packaging: formData.packaging.trim() || undefined,
      price: formData.price.trim() || undefined,
      specifications: parseMultiline(formData.specifications),
      features: parseMultiline(formData.features),
    };

    try {
      if (formMode === 'create') {
        await productService.createProduct(payload, accessToken);
      } else if (activeProductId) {
        await productService.updateProduct(activeProductId, payload, accessToken);
      }
      await loadProducts();
      closeForm();
    } catch (err) {
      console.error('Failed to submit product form', err);
      setFormError(err instanceof Error ? err.message : 'Impossible de sauvegarder le produit');
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!accessToken) {
      setError('Votre session a expiré. Merci de vous reconnecter.');
      return;
    }
    const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?');
    if (!confirmed) return;

    try {
      setDeletingId(id);
      await productService.deleteProduct(id, accessToken);
      await loadProducts();
    } catch (err) {
      console.error('Failed to delete product', err);
      setError(err instanceof Error ? err.message : 'Impossible de supprimer le produit');
    } finally {
      setDeletingId(null);
    }
  };

  const productCount = useMemo(() => products.length, [products]);

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
          <div className="flex flex-wrap gap-6">
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl px-6 py-4">
              <p className="text-sm text-slate-400">Produits catalogue</p>
              <p className="text-2xl font-semibold mt-2">{productCount}</p>
            </div>
          </div>
        </section>

        <section className="bg-slate-950/60 border border-slate-800 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold">Produits</h2>
              <p className="text-sm text-slate-400">Gérez la publication et la mise à jour des fiches produits.</p>
            </div>
            <button
              onClick={openCreateForm}
              className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 transition-colors text-sm font-medium"
            >
              Ajouter un produit
            </button>
          </div>

          {status === 'loading' && (
            <div className="border border-dashed border-slate-700 rounded-2xl p-6 text-sm text-slate-400">
              Chargement des produits...
            </div>
          )}

          {status === 'error' && error && (
            <div className="border border-red-500/40 bg-red-500/10 text-red-200 rounded-2xl p-4 mb-4 text-sm">
              {error}
            </div>
          )}

          {status !== 'loading' && products.length === 0 && (
            <div className="border border-dashed border-slate-700 rounded-2xl p-6 text-sm text-slate-400">
              Aucun produit n'est encore enregistré.
            </div>
          )}

          {products.length > 0 && (
            <div className="overflow-hidden border border-slate-800 rounded-2xl">
              <table className="w-full text-left">
                <thead className="bg-slate-950/80">
                  <tr className="text-sm text-slate-400">
                    <th className="px-6 py-3 font-medium">Produit</th>
                    <th className="px-6 py-3 font-medium">Catégorie</th>
                    <th className="px-6 py-3 font-medium">Volume</th>
                    <th className="px-6 py-3 font-medium">Prix</th>
                    <th className="px-6 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} className="border-t border-slate-800 text-sm">
                      <td className="px-6 py-4 font-medium text-white">
                        <p>{product.name}</p>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-1">{product.description}</p>
                      </td>
                      <td className="px-6 py-4 text-slate-300">{product.category}</td>
                      <td className="px-6 py-4 text-slate-300">{product.volume}</td>
                      <td className="px-6 py-4 text-slate-300">{product.price ?? '—'}</td>
                      <td className="px-6 py-4 space-x-3">
                        <button
                          onClick={() => openEditForm(product)}
                          className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="text-red-400 hover:text-red-300 text-sm font-medium disabled:opacity-50 disabled:pointer-events-none"
                          disabled={deletingId === product._id}
                        >
                          {deletingId === product._id ? 'Suppression...' : 'Supprimer'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {isFormOpen && (
            <div className="mt-8 border border-slate-800 rounded-2xl p-6 bg-slate-950/70">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">
                  {formMode === 'create' ? 'Ajouter un produit' : 'Modifier le produit'}
                </h3>
                <button onClick={closeForm} className="text-sm text-slate-400 hover:text-slate-200">
                  Fermer
                </button>
              </div>

              {formError && (
                <div className="border border-red-500/40 bg-red-500/10 text-red-200 rounded-xl p-3 text-sm mb-4">
                  {formError}
                </div>
              )}

              <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={submitForm}>
                <div className="space-y-2">
                  <label className="text-sm text-slate-400" htmlFor="name">
                    Nom du produit*
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-400" htmlFor="category">
                    Catégorie*
                  </label>
                  <input
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm text-slate-400" htmlFor="description">
                    Description*
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm h-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-400" htmlFor="image">
                    URL de l'image*
                  </label>
                  <input
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-400" htmlFor="volume">
                    Volume*
                  </label>
                  <input
                    id="volume"
                    name="volume"
                    value={formData.volume}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-400" htmlFor="oilType">
                    Type d'huile
                  </label>
                  <input
                    id="oilType"
                    name="oilType"
                    value={formData.oilType}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-400" htmlFor="viscosity">
                    Viscosité
                  </label>
                  <input
                    id="viscosity"
                    name="viscosity"
                    value={formData.viscosity}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-400" htmlFor="apiStandard">
                    Norme API
                  </label>
                  <input
                    id="apiStandard"
                    name="apiStandard"
                    value={formData.apiStandard}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-400" htmlFor="aceaStandard">
                    Norme ACEA
                  </label>
                  <input
                    id="aceaStandard"
                    name="aceaStandard"
                    value={formData.aceaStandard}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-400" htmlFor="manufacturerStandards">
                    Normes constructeurs
                  </label>
                  <input
                    id="manufacturerStandards"
                    name="manufacturerStandards"
                    value={formData.manufacturerStandards}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-400" htmlFor="applications">
                    Applications
                  </label>
                  <input
                    id="applications"
                    name="applications"
                    value={formData.applications}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-400" htmlFor="technology">
                    Technologie
                  </label>
                  <input
                    id="technology"
                    name="technology"
                    value={formData.technology}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-400" htmlFor="packaging">
                    Conditionnement
                  </label>
                  <input
                    id="packaging"
                    name="packaging"
                    value={formData.packaging}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm text-slate-400" htmlFor="specifications">
                    Spécifications (une par ligne)
                  </label>
                  <textarea
                    id="specifications"
                    name="specifications"
                    value={formData.specifications}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm text-slate-400" htmlFor="features">
                    Points forts (un par ligne)
                  </label>
                  <textarea
                    id="features"
                    name="features"
                    value={formData.features}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-400" htmlFor="price">
                    Prix / commercialisation
                  </label>
                  <input
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={closeForm}
                    className="px-4 py-2 rounded-full border border-slate-700 text-sm text-slate-300 hover:bg-slate-800"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 transition-colors text-sm font-medium disabled:opacity-50 disabled:pointer-events-none"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

