import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import * as productService from '../services/products';
import { 
  LayoutDashboard, 
  Package, 
  Plus, 
  Edit, 
  Trash2, 
  LogOut, 
  Menu, 
  X, 
  User,
  TrendingUp,
  AlertCircle,
  Upload,
  Image as ImageIcon,
  Wand2
} from 'lucide-react';
import logo from '../assets/po.png';
import { removeBackground } from '@imgly/background-removal';

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

// Dropdown options based on static products
const CATEGORY_OPTIONS = ['Huiles Moteur', 'Huiles de Boîte', 'Divers'];
const VOLUME_OPTIONS = ['1L', '4L', '5L', '20L'];
const OIL_TYPE_OPTIONS = ['Minérale', 'Semi-Synthèse', '100% Synthèse'];

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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [removeBgEnabled, setRemoveBgEnabled] = useState(true);
  const [isRemovingBg, setIsRemovingBg] = useState(false);

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/admin', { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    setImagePreview(null);
    setIsFormOpen(true);
  };

  const openEditForm = (product: productService.Product) => {
    setFormMode('edit');
    setActiveProductId(product._id);
    setFormData(toFormData(product));
    setFormError(null);
    setImagePreview(product.image || null);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setFormData(EMPTY_FORM);
    setActiveProductId(null);
    setIsSubmitting(false);
    setImagePreview(null);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const compressImage = (file: File, maxWidth: number = 800, quality: number = 0.8): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Redimensionner si nécessaire
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Impossible de créer le contexte canvas'));
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedBase64);
        };
        img.onerror = () => reject(new Error('Erreur lors du chargement de l\'image'));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Erreur lors de la lecture du fichier'));
      reader.readAsDataURL(file);
    });
  };

  const removeBackgroundAndAddWhite = async (imageDataUrl: string): Promise<string> => {
    let objectUrl: string | null = null;
    try {
      // Convertir data URL en Blob
      const response = await fetch(imageDataUrl);
      const blob = await response.blob();
      
      // Supprimer le fond
      const blobWithoutBg = await removeBackground(blob);
      
      // Convertir le Blob en Image pour ajouter un fond blanc
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            if (objectUrl) URL.revokeObjectURL(objectUrl);
            reject(new Error('Impossible de créer le contexte canvas'));
            return;
          }
          
          // Remplir avec un fond blanc
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // Dessiner l'image sans fond par-dessus
          ctx.drawImage(img, 0, 0);
          
          // Nettoyer l'URL de l'objet
          if (objectUrl) URL.revokeObjectURL(objectUrl);
          
          // Convertir en base64
          const resultBase64 = canvas.toDataURL('image/png', 1.0);
          resolve(resultBase64);
        };
        img.onerror = () => {
          if (objectUrl) URL.revokeObjectURL(objectUrl);
          reject(new Error('Erreur lors du chargement de l\'image sans fond'));
        };
        objectUrl = URL.createObjectURL(blobWithoutBg);
        img.src = objectUrl;
      });
    } catch (err) {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      throw new Error(err instanceof Error ? err.message : 'Erreur lors de la suppression du fond');
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setFormError('Veuillez sélectionner un fichier image valide');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setFormError('L\'image ne doit pas dépasser 5MB');
      return;
    }

    try {
      setFormError(null);
      setIsRemovingBg(removeBgEnabled);
      
      // Compresser l'image pour réduire la taille
      let processedImage = await compressImage(file);
      
      // Supprimer le fond si activé
      if (removeBgEnabled) {
        try {
          processedImage = await removeBackgroundAndAddWhite(processedImage);
        } catch (bgError) {
          console.warn('Erreur lors de la suppression du fond, utilisation de l\'image originale:', bgError);
          // Continuer avec l'image compressée si la suppression du fond échoue
        }
      }
      
      setFormData((prev) => ({ ...prev, image: processedImage }));
      setImagePreview(processedImage);
      setIsRemovingBg(false);
    } catch (err) {
      setIsRemovingBg(false);
      setFormError(err instanceof Error ? err.message : 'Erreur lors du traitement de l\'image');
    }
  };

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Validation de base
    if (!accessToken) {
      setFormError('Votre session a expiré. Merci de vous reconnecter.');
      setIsSubmitting(false);
      return;
    }

    // Validate required fields
    if (!formData.name.trim()) {
      setFormError('Le nom du produit est requis');
      setIsSubmitting(false);
      return;
    }

    if (!formData.category.trim()) {
      setFormError('La catégorie est requise');
      setIsSubmitting(false);
      return;
    }

    if (!formData.description.trim()) {
      setFormError('La description est requise');
      setIsSubmitting(false);
      return;
    }

    // Validate image
    if (!formData.image.trim()) {
      setFormError('Veuillez uploader une image ou entrer une URL d\'image');
      setIsSubmitting(false);
      return;
    }

    if (!formData.volume.trim()) {
      setFormError('Le volume est requis');
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    try {
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

      console.log('Submitting product:', { formMode, payload: { ...payload, image: payload.image.substring(0, 50) + '...' } });

      if (formMode === 'create') {
        await productService.createProduct(payload, accessToken);
        console.log('Product created successfully');
      } else if (activeProductId) {
        await productService.updateProduct(activeProductId, payload, accessToken);
        console.log('Product updated successfully');
      } else {
        throw new Error('Mode de formulaire invalide');
      }

      // Recharger les produits
      await loadProducts();
      console.log('Products reloaded');
      
      // Fermer le formulaire
      closeForm();
    } catch (err) {
      console.error('Failed to submit product form', err);
      let errorMessage = 'Impossible de sauvegarder le produit';
      
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === 'object' && err !== null) {
        const errorObj = err as { message?: string; error?: string };
        errorMessage = errorObj.message || errorObj.error || errorMessage;
      }
      
      setFormError(errorMessage);
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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white transition-transform duration-300 ease-in-out lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center">
                  <img src={logo} alt="Poly Oil logo" className="w-12 h-12 object-contain" />
                </div>
                <div>
                  <h1 className="text-lg font-bold">Poly Oil</h1>
                  <p className="text-xs text-slate-400">Admin Panel</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                if (isMobile) setSidebarOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-600 text-white transition-colors"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span className="font-medium">Tableau de bord</span>
            </button>
            <button
              onClick={() => {
                const productsSection = document.querySelector('[data-section="products"]');
                if (productsSection) {
                  productsSection.scrollIntoView({ behavior: 'smooth' });
                }
                if (isMobile) setSidebarOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <Package className="w-5 h-5" />
              <span className="font-medium">Produits</span>
            </button>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-slate-700">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-800/50">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.email}</p>
                <p className="text-xs text-slate-400">Administrateur</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full mt-3 flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Déconnexion</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="px-4 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-600 hover:text-gray-900"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Gestion des Produits</h1>
                <p className="text-sm text-gray-500">Gérez votre catalogue de produits</p>
              </div>
            </div>
            <button
              onClick={openCreateForm}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span className="font-medium">Nouveau produit</span>
            </button>
          </div>
        </header>

        {/* Main Body */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Produits</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{productCount}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Statut</p>
                  <p className="text-3xl font-bold text-green-600 mt-2">Actif</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Dernière mise à jour</p>
                  <p className="text-lg font-semibold text-gray-900 mt-2">Aujourd'hui</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <LayoutDashboard className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200" data-section="products">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Liste des Produits</h2>
              <p className="text-sm text-gray-500 mt-1">Gérez la publication et la mise à jour des fiches produits</p>
            </div>

            <div className="p-6">
              {status === 'loading' && (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-500">Chargement des produits...</p>
                </div>
              )}

              {status === 'error' && error && (
                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {status !== 'loading' && products.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12">
                  <Package className="w-16 h-16 text-gray-300 mb-4" />
                  <p className="text-gray-500 font-medium">Aucun produit enregistré</p>
                  <p className="text-gray-400 text-sm mt-1">Commencez par ajouter votre premier produit</p>
                </div>
              )}

              {products.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Produit
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Catégorie
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Volume
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Prix
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {products.map((product) => (
                        <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <p className="font-semibold text-gray-900">{product.name}</p>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-1">{product.description}</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {product.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-700">{product.volume}</td>
                          <td className="px-6 py-4 text-gray-700">{product.price ?? '—'}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => openEditForm(product)}
                                className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              >
                                <Edit className="w-4 h-4" />
                                Modifier
                              </button>
                              <button
                                onClick={() => handleDelete(product._id)}
                                className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:pointer-events-none"
                                disabled={deletingId === product._id}
                              >
                                <Trash2 className="w-4 h-4" />
                                {deletingId === product._id ? 'Suppression...' : 'Supprimer'}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Product Form Modal */}
          {isFormOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl z-10">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {formMode === 'create' ? 'Ajouter un produit' : 'Modifier le produit'}
                  </h3>
                  <button
                    onClick={closeForm}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <div className="p-6">
                  {formError && (
                    <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg mb-6 animate-fade-in">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-red-800 font-medium text-sm mb-1">Erreur</p>
                        <p className="text-red-600 text-sm">{formError}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFormError(null)}
                        className="text-red-400 hover:text-red-600 transition-colors"
                        aria-label="Fermer l'erreur"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {isSubmitting && (
                    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-blue-700 text-sm font-medium">Enregistrement du produit en cours...</p>
                      </div>
                    </div>
                  )}

                  <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={submitForm} noValidate>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700" htmlFor="name">
                        Nom du produit <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700" htmlFor="category">
                        Catégorie <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="">Sélectionner une catégorie</option>
                        {CATEGORY_OPTIONS.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-sm font-medium text-gray-700" htmlFor="description">
                        Description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-sm h-28 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700" htmlFor="image">
                          Image du produit <span className="text-red-500">*</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={removeBgEnabled}
                            onChange={(e) => setRemoveBgEnabled(e.target.checked)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <div className="flex items-center gap-1.5">
                            <Wand2 className="w-4 h-4 text-gray-600" />
                            <span className="text-sm text-gray-700">Supprimer le fond</span>
                          </div>
                        </label>
                      </div>
                      
                      {isRemovingBg && (
                        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-blue-700 text-sm font-medium">Suppression du fond en cours...</p>
                          </div>
                        </div>
                      )}
                      
                      {/* Image Preview */}
                      {imagePreview && (
                        <div className="mb-4">
                          <div className="relative inline-block">
                            <img
                              src={imagePreview}
                              alt="Aperçu"
                              className="w-48 h-48 object-contain border border-gray-300 rounded-lg bg-gray-50"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setImagePreview(null);
                                setFormData((prev) => ({ ...prev, image: '' }));
                              }}
                              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Upload Input */}
                      <div className="relative">
                        <input
                          type="file"
                          id="image"
                          name="image"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <label
                          htmlFor="image"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 hover:border-blue-400 transition-colors"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            {imagePreview ? (
                              <>
                                <ImageIcon className="w-10 h-10 text-blue-500 mb-2" />
                                <p className="text-sm text-gray-600">Cliquez pour changer l'image</p>
                              </>
                            ) : (
                              <>
                                <Upload className="w-10 h-10 text-gray-400 mb-2" />
                                <p className="mb-2 text-sm text-gray-500">
                                  <span className="font-semibold">Cliquez pour uploader</span> ou glissez-déposez
                                </p>
                                <p className="text-xs text-gray-500">PNG, JPG, GIF jusqu'à 5MB</p>
                              </>
                            )}
                          </div>
                        </label>
                      </div>
                      
                      {/* Fallback URL input */}
                      <div className="mt-3">
                        <label className="text-xs text-gray-500 mb-1 block">Ou entrez une URL d'image</label>
                        <input
                          type="text"
                          name="imageUrl"
                          value={formData.image.startsWith('data:') ? '' : formData.image}
                          onChange={(e) => {
                            const url = e.target.value;
                            setFormData((prev) => ({ ...prev, image: url }));
                            if (url && !url.startsWith('data:')) {
                              setImagePreview(url);
                            } else if (!url) {
                              setImagePreview(null);
                            }
                          }}
                          placeholder="https://exemple.com/image.jpg"
                          className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700" htmlFor="volume">
                        Volume <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="volume"
                        name="volume"
                        value={formData.volume}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="">Sélectionner un volume</option>
                        {VOLUME_OPTIONS.map((volume) => (
                          <option key={volume} value={volume}>
                            {volume}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700" htmlFor="oilType">
                        Type d'huile
                      </label>
                      <select
                        id="oilType"
                        name="oilType"
                        value={formData.oilType}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Sélectionner un type d'huile</option>
                        {OIL_TYPE_OPTIONS.map((oilType) => (
                          <option key={oilType} value={oilType}>
                            {oilType}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700" htmlFor="viscosity">
                        Viscosité
                      </label>
                      <input
                        id="viscosity"
                        name="viscosity"
                        value={formData.viscosity}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700" htmlFor="apiStandard">
                        Norme API
                      </label>
                      <input
                        id="apiStandard"
                        name="apiStandard"
                        value={formData.apiStandard}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700" htmlFor="aceaStandard">
                        Norme ACEA
                      </label>
                      <input
                        id="aceaStandard"
                        name="aceaStandard"
                        value={formData.aceaStandard}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700" htmlFor="manufacturerStandards">
                        Normes constructeurs
                      </label>
                      <input
                        id="manufacturerStandards"
                        name="manufacturerStandards"
                        value={formData.manufacturerStandards}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700" htmlFor="applications">
                        Applications
                      </label>
                      <input
                        id="applications"
                        name="applications"
                        value={formData.applications}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700" htmlFor="technology">
                        Technologie
                      </label>
                      <input
                        id="technology"
                        name="technology"
                        value={formData.technology}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700" htmlFor="packaging">
                        Conditionnement
                      </label>
                      <input
                        id="packaging"
                        name="packaging"
                        value={formData.packaging}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-sm font-medium text-gray-700" htmlFor="specifications">
                        Spécifications (une par ligne)
                      </label>
                      <textarea
                        id="specifications"
                        name="specifications"
                        value={formData.specifications}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-sm h-24 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-sm font-medium text-gray-700" htmlFor="features">
                        Points forts (un par ligne)
                      </label>
                      <textarea
                        id="features"
                        name="features"
                        value={formData.features}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-sm h-24 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700" htmlFor="price">
                        Prix / commercialisation
                      </label>
                      <input
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="md:col-span-2 flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={closeForm}
                        className="px-6 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Annuler
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Enregistrement...</span>
                          </>
                        ) : (
                          <span>Enregistrer</span>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

