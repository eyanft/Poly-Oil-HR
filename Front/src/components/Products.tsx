import { useState, useEffect, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, X, Grid3x3, List, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ProductModal from './ProductModal';
import CompareModal from './CompareModal';
import { fetchProducts, type Product as ApiProduct } from '../services/products';
import product1 from '../assets/20w504lb.png';
import product2 from '../assets/20w504lgold.png';
import product3 from '../assets/40fl20l.png';
import product4 from '../assets/90fl20l.png';
import product5 from '../assets/1040.png';
import product6 from '../assets/2050p2.png';
import product7 from '../assets/7580.png';
import product8 from '../assets/10405l.png';
import product9 from '../assets/atf.png';

// Unified Product type that can handle both static and API products
type UnifiedProduct = {
  _id: string; // Unique identifier (for API products) or generated for static
  id?: number; // Legacy id for static products
  name: string;
  category: string;
  description: string;
  image: string;
  volume: string;
  oilType?: string;
  viscosity?: string;
  apiStandard?: string;
  aceaStandard?: string;
  manufacturerStandards?: string;
  applications?: string;
  technology?: string;
  packaging?: string;
  specifications?: string[];
  features?: string[];
  price?: string;
  createdAt?: string;
  updatedAt?: string;
  isStatic?: boolean; // Flag to identify static products
};

// Static products
const staticProducts: Omit<UnifiedProduct, '_id'>[] = [
  {
    id: 1,
    name: 'PO-5000 20W-50',
    category: 'Huiles Moteur',
    description: 'Huile moteur à essence multigrade offrant une excellente protection',
    image: product1,
    volume: '4L',
    oilType: 'Minérale',
    viscosity: '20W50',
    apiStandard: 'API SF',
    aceaStandard: '',
    manufacturerStandards: '',
    applications: 'Automobile; Poids lourds',
    packaging: 'Bidon 4L',
    specifications: ['Norme API SF/CD', 'Multigrade 20W-50', 'Pour moteurs essence'],
    features: ['Protection contre l\'usure', 'Excellente stabilité thermique', 'Réduction de la consommation'],
    price: 'Sur devis',
    isStatic: true,
  },
  {
    id: 2,
    name: 'PO Gold 20W-50',
    category: 'Huiles Moteur',
    description: 'Huile moteur super haute qualité offrant une protection supérieure',
    image: product2,
    volume: '4L',
    oilType: 'Semi-Synthèse',
    viscosity: '20W50',
    apiStandard: 'API SL/CF',
    aceaStandard: 'ACEA A3/B3',
    manufacturerStandards: 'MB 229.1; VW 505.00/501.01',
    applications: 'Automobile; Poids lourds; Travaux publics; Agricole',
    packaging: 'Bidon 4L',
    specifications: ['Norme API SL/CF', 'Qualité supérieure', 'Protection maximale'],
    features: ['Performance optimale', 'Nettoyage du moteur', 'Longévité accrue'],
    price: 'Sur devis',
    isStatic: true,
  },
  {
    id: 3,
    name: 'Flexi Oil HD 40',
    category: 'Divers',
    description: 'Huile moteur diesel haute performance pour moteurs lourds',
    image: product3,
    volume: '20L',
    oilType: 'Minérale',
    viscosity: 'SAE 40',
    apiStandard: '',
    aceaStandard: '',
    manufacturerStandards: '',
    applications: 'Poids lourds; Travaux publics; Marine',
    packaging: 'Bidon 20L',
    specifications: ['SAE 40', 'Pour moteurs diesel', 'Usage industriel'],
    features: ['Résistance aux charges élevées', 'Protection anti-corrosion', 'Durabilité exceptionnelle'],
    price: 'Sur devis',
    isStatic: true,
  },
  {
    id: 4,
    name: 'Flexi Oil SAE 90',
    category: 'Huiles de Boîte',
    description: 'Huile de transmission API GL1 pour boîtes de vitesses',
    image: product4,
    volume: '20L',
    oilType: 'Minérale',
    packaging: 'Bidon 20L',
    specifications: ['SAE 90', 'API GL1', 'Pour transmissions'],
    features: ['Changement de vitesse fluide', 'Protection des engrenages', 'Réduction du bruit'],
    price: 'Sur devis',
    isStatic: true,
  },
  {
    id: 5,
    name: 'PO-5000 10W-40',
    category: 'Huiles Moteur',
    description: 'Huile moteur semi-synthétique haute performance',
    image: product5,
    volume: '1L',
    oilType: 'Semi-Synthèse',
    viscosity: '10W40',
    apiStandard: 'API SL/CF',
    packaging: 'Bidon 1L',
    specifications: ['API SL/CF', '10W-40', 'Semi-synthétique'],
    features: ['Démarrage à froid facilité', 'Protection toutes saisons', 'Économie de carburant'],
    price: 'Sur devis',
    isStatic: true,
  },
  {
    id: 6,
    name: 'PO Gold P2 20W-50',
    category: 'Huiles Moteur',
    description: 'Huile moteur premium pour performances exceptionnelles',
    image: product6,
    volume: '1L',
    oilType: '100% Synthèse',
    viscosity: '20W50',
    apiStandard: 'API SN',
    technology: 'ESTER',
    packaging: 'Bidon 1L',
    specifications: ['Qualité premium', 'API SL/CF', 'Additifs avancés'],
    features: ['Performance supérieure', 'Propreté maximale', 'Protection longue durée'],
    price: 'Sur devis',
    isStatic: true,
  },
  {
    id: 7,
    name: 'Gear Free G2 75W-80',
    category: 'Huiles de Boîte',
    description: 'Huile pour transmission manuelle et boîtier AT',
    image: product7,
    volume: '1L',
    oilType: 'Semi-Synthèse',
    viscosity: '2 Temps',
    apiStandard: 'API TC',
    packaging: 'Bidon 1L',
    specifications: ['API GL4', '75W-80', 'Multi-usage'],
    features: ['Changements précis', 'Résistance à l\'oxydation', 'Protection anti-usure'],
    price: 'Sur devis',
    isStatic: true,
  },
  {
    id: 8,
    name: 'PO-5000 10W-40',
    category: 'Huiles Moteur',
    description: 'Huile moteur essence et diesel semi-synthétique',
    image: product8,
    volume: '5L',
    oilType: 'Semi-Synthèse',
    viscosity: '10W40',
    apiStandard: 'API SL',
    packaging: 'Bidon 4L',
    specifications: ['API SL/CF', 'Essence et diesel', '10W-40'],
    features: ['Polyvalence maximale', 'Économique', 'Haute protection'],
    price: 'Sur devis',
    isStatic: true,
  },
  {
    id: 9,
    name: 'ATF A2 Dexron II',
    category: 'Huiles de Boîte',
    description: 'Huile pour transmission automatique',
    image: product9,
    volume: '1L',
    packaging: 'Bidon 1L',
    specifications: ['Dexron II', 'Transmission automatique', 'Fluide ATF'],
    features: ['Changement fluide', 'Protection hydraulique', 'Longévité transmission'],
    price: 'Sur devis',
    isStatic: true,
  },
  {
    id: 10,
    name: 'Liquide de frein DOT 4',
    category: 'Liquide Refroidissement',
    description: 'Liquide de frein haute performance pour systèmes de freinage',
    image: product1,
    volume: '500ml',
    packaging: 'Bidon 1L',
    specifications: ['Norme DOT 4', 'Point d\'ébullition élevé', 'Compatible tous véhicules'],
    features: ['Freinage sûr', 'Résistance à l\'humidité', 'Performance constante'],
    price: 'Sur devis',
    isStatic: true,
  },
  {
    id: 11,
    name: 'Lave-glace concentré',
    category: 'Divers',
    description: 'Solution de nettoyage efficace pour pare-brise',
    image: product2,
    volume: '2L',
    packaging: 'Bidon 2L',
    specifications: ['Concentré dilutable', 'Toutes saisons', 'Non toxique'],
    features: ['Nettoyage parfait', 'Protection anti-gel', 'Sans traces'],
    price: 'Sur devis',
    isStatic: true,
  },
  {
    id: 12,
    name: 'Graisse lithium EP2',
    category: 'Divers',
    description: 'Graisse multi-usage pour lubrification industrielle',
    image: product3,
    volume: '500g',
    packaging: 'Bidon 1L',
    specifications: ['Lithium EP2', 'Multi-usage', 'Haute adhérence'],
    features: ['Protection extrême', 'Résistance aux charges', 'Usage universel'],
    price: 'Sur devis',
    isStatic: true,
  },
  {
    id: 13,
    name: 'Eau déminéralisée',
    category: 'Liquide Refroidissement',
    description: 'Eau purifiée pour batteries et systèmes de refroidissement',
    image: product4,
    volume: '5L',
    packaging: 'Bidon 4L',
    specifications: ['100% pure', 'Sans minéraux', 'Usage automobile'],
    features: ['Évite les dépôts', 'Protection batteries', 'Polyvalente'],
    price: 'Sur devis',
    isStatic: true,
  },
  {
    id: 14,
    name: 'PO Premium 5W-40',
    category: 'Huiles Moteur',
    description: 'Huile moteur 100% synthèse pour performances optimales',
    image: product5,
    volume: '1L',
    oilType: '100% Synthèse',
    viscosity: '5W40',
    apiStandard: 'API SN',
    technology: 'ESTER',
    packaging: 'Bidon 1L',
    specifications: ['API SN', '5W-40', '100% Synthèse'],
    features: ['Performance maximale', 'Protection longue durée', 'Économie de carburant'],
    price: 'Sur devis',
    isStatic: true,
  },
  {
    id: 15,
    name: 'PO Classic 10W-50',
    category: 'Huiles Moteur',
    description: 'Huile moteur minérale pour usage standard',
    image: product6,
    volume: '1L',
    oilType: 'Minérale',
    viscosity: '10W50',
    apiStandard: 'API SL',
    packaging: 'Bidon 1L',
    specifications: ['API SL', '10W-50', 'Minérale'],
    features: ['Protection standard', 'Économique', 'Usage quotidien'],
    price: 'Sur devis',
    isStatic: true,
  },
  {
    id: 16,
    name: 'PO Advanced 2T',
    category: 'Huiles Moteur',
    description: 'Huile moteur 2 temps pour motos et scooters',
    image: product7,
    volume: '1L',
    oilType: 'Minérale',
    viscosity: '2 Temps',
    apiStandard: 'API TA',
    packaging: 'Bidon 1L',
    specifications: ['API TA', '2 Temps', 'Pour motos'],
    features: ['Protection moteur 2T', 'Faible fumée', 'Performance optimale'],
    price: 'Sur devis',
    isStatic: true,
  },
];

// Helper function to normalize products (convert API products to UnifiedProduct)
function normalizeApiProduct(apiProduct: ApiProduct): UnifiedProduct {
  return {
    ...apiProduct,
    isStatic: false,
  };
}

// Helper function to normalize static products (add _id)
function normalizeStaticProduct(staticProduct: Omit<UnifiedProduct, '_id'>, index: number): UnifiedProduct {
  return {
    ...staticProduct,
    _id: `static-${staticProduct.id || index}`,
  };
}

// Helper function to calculate filter counts
function calculateFilterCounts(products: UnifiedProduct[]) {
  const categories = new Map<string, number>();
  const oilTypes = new Map<string, number>();
  const viscosities = new Map<string, number>();
  const apiStandards = new Map<string, number>();
  const technologies = new Map<string, number>();
  const packaging = new Map<string, number>();

  products.forEach((product) => {
    // Categories
    if (product.category) {
      categories.set(product.category, (categories.get(product.category) || 0) + 1);
    }
    // Oil Types
    if (product.oilType) {
      oilTypes.set(product.oilType, (oilTypes.get(product.oilType) || 0) + 1);
    }
    // Viscosities
    if (product.viscosity) {
      viscosities.set(product.viscosity, (viscosities.get(product.viscosity) || 0) + 1);
    }
    // API Standards
    if (product.apiStandard) {
      apiStandards.set(product.apiStandard, (apiStandards.get(product.apiStandard) || 0) + 1);
    }
    // Technologies
    if (product.technology) {
      technologies.set(product.technology, (technologies.get(product.technology) || 0) + 1);
    }
    // Packaging
    if (product.packaging) {
      packaging.set(product.packaging, (packaging.get(product.packaging) || 0) + 1);
    }
  });

  return {
    categories: Array.from(categories.entries()).map(([name, count]) => ({ name, count })),
    oilTypes: Array.from(oilTypes.entries()).map(([name, count]) => ({ name, count })),
    viscosities: Array.from(viscosities.entries()).map(([name, count]) => ({ name, count })),
    apiStandards: Array.from(apiStandards.entries()).map(([name, count]) => ({ name, count })),
    technologies: Array.from(technologies.entries()).map(([name, count]) => ({ name, count })),
    packaging: Array.from(packaging.entries()).map(([name, count]) => ({ name, count })),
  };
}

const ITEMS_PER_PAGE = 16;

interface FilterSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function FilterSection({ title, isOpen, onToggle, children }: FilterSectionProps) {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-1 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-800">{title}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-600" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-600" />
        )}
      </button>
      {isOpen && (
        <div className="pb-4 space-y-2">
          {children}
        </div>
      )}
    </div>
  );
}

export default function Products() {
  const { t } = useTranslation();
  const [apiProducts, setApiProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<UnifiedProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('default');
  const [productsToCompare, setProductsToCompare] = useState<UnifiedProduct[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Load products from API
  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProducts();
        setApiProducts(data);
      } catch (err) {
        console.error('Failed to load products:', err);
        setError(err instanceof Error ? err.message : t('errors.generic'));
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  // Combine static and API products
  const allProducts = useMemo(() => {
    const normalizedStatic = staticProducts.map((p, i) => normalizeStaticProduct(p, i));
    const normalizedApi = apiProducts.map(normalizeApiProduct);
    return [...normalizedStatic, ...normalizedApi];
  }, [apiProducts]);

  // Calculate filter counts from all products
  const filterCounts = useMemo(() => calculateFilterCounts(allProducts), [allProducts]);

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedOilTypes, setSelectedOilTypes] = useState<string[]>([]);
  const [selectedViscosities, setSelectedViscosities] = useState<string[]>([]);
  const [selectedApiStandards, setSelectedApiStandards] = useState<string[]>([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const [selectedPackaging, setSelectedPackaging] = useState<string[]>([]);

  // Collapsible filter sections
  const [openSections, setOpenSections] = useState({
    categories: true,
    oilType: true,
    viscosity: true,
    apiStandard: true,
    technology: true,
    packaging: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleFilter = (filterType: string, value: string) => {
    switch (filterType) {
      case 'category':
        setSelectedCategories(prev =>
          prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
        );
        break;
      case 'oilType':
        setSelectedOilTypes(prev =>
          prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
        );
        break;
      case 'viscosity':
        setSelectedViscosities(prev =>
          prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
        );
        break;
      case 'apiStandard':
        setSelectedApiStandards(prev =>
          prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
        );
        break;
      case 'technology':
        setSelectedTechnologies(prev =>
          prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
        );
        break;
      case 'packaging':
        setSelectedPackaging(prev =>
          prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
        );
        break;
    }
    setCurrentPage(1);
  };

  const removeFilter = (filterType: string, value: string) => {
    toggleFilter(filterType, value);
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedOilTypes([]);
    setSelectedViscosities([]);
    setSelectedApiStandards([]);
    setSelectedTechnologies([]);
    setSelectedPackaging([]);
    setSearchTerm('');
    setCurrentPage(1);
  };

  const activeFilters = [
    ...selectedCategories.map(c => ({ type: 'category', label: c })),
    ...selectedOilTypes.map(c => ({ type: 'oilType', label: c })),
    ...selectedViscosities.map(c => ({ type: 'viscosity', label: c })),
    ...selectedApiStandards.map(c => ({ type: 'apiStandard', label: c })),
    ...selectedTechnologies.map(c => ({ type: 'technology', label: c })),
    ...selectedPackaging.map(c => ({ type: 'packaging', label: c })),
  ];

  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesOilType = selectedOilTypes.length === 0 || (product.oilType && selectedOilTypes.includes(product.oilType));
    const matchesViscosity = selectedViscosities.length === 0 || (product.viscosity && selectedViscosities.includes(product.viscosity));
    const matchesApiStandard = selectedApiStandards.length === 0 || (product.apiStandard && selectedApiStandards.includes(product.apiStandard));
    const matchesTechnology = selectedTechnologies.length === 0 || (product.technology && selectedTechnologies.includes(product.technology));
    const matchesPackaging = selectedPackaging.length === 0 || (product.packaging && selectedPackaging.includes(product.packaging));
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesOilType && matchesViscosity && matchesApiStandard && matchesTechnology && matchesPackaging && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
    return 0;
  });

  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  const handleProductClick = (product: UnifiedProduct, e: React.MouseEvent) => {
    // Si on clique sur la checkbox, ne pas ouvrir le modal
    if ((e.target as HTMLElement).closest('.compare-checkbox')) {
      return;
    }
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const toggleProductCompare = (product: UnifiedProduct) => {
    const isSelected = productsToCompare.some(p => p._id === product._id);
    if (isSelected) {
      setProductsToCompare(productsToCompare.filter(p => p._id !== product._id));
    } else {
      if (productsToCompare.length < 2) {
        setProductsToCompare([...productsToCompare, product]);
      }
    }
  };

  const handleCompare = () => {
    if (productsToCompare.length === 2) {
      setIsCompareModalOpen(true);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const productsSection = document.getElementById('produits');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="produits" className="py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">{t('products.title')}</h2>
          <p className="text-xl text-gray-600">{t('products.subtitle')}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar - Filters */}
          <aside className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-lg p-3 sticky top-4">
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
                <h3 className="text-base font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded w-full text-center">
                  {t('products.filterByCategory').toUpperCase()}
                </h3>
              </div>

              {activeFilters.length > 0 && (
                <div className="mb-3 pb-3 border-b border-gray-200">
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    X {t('common.reset').toUpperCase()}
                  </button>
                </div>
              )}

              <div className="space-y-0">
                <FilterSection
                  title={t('products.filterByCategory')}
                  isOpen={openSections.categories}
                  onToggle={() => toggleSection('categories')}
                >
                  {filterCounts.categories.map((filter) => (
                    <label key={filter.name} className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-1.5 rounded">
                      <span className="text-sm text-gray-700">{filter.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">{filter.count}</span>
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(filter.name)}
                          onChange={() => toggleFilter('category', filter.name)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </div>
                    </label>
                  ))}
                </FilterSection>

                <FilterSection
                  title={t('products.filterByType')}
                  isOpen={openSections.oilType}
                  onToggle={() => toggleSection('oilType')}
                >
                  {filterCounts.oilTypes.map((filter) => (
                    <label key={filter.name} className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-1.5 rounded">
                      <span className="text-sm text-gray-700">{filter.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">{filter.count}</span>
                        <input
                          type="checkbox"
                          checked={selectedOilTypes.includes(filter.name)}
                          onChange={() => toggleFilter('oilType', filter.name)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </div>
                    </label>
                  ))}
                </FilterSection>

                <FilterSection
                  title={t('products.filterByViscosity')}
                  isOpen={openSections.viscosity}
                  onToggle={() => toggleSection('viscosity')}
                >
                  {filterCounts.viscosities.map((filter) => (
                    <label key={filter.name} className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-1.5 rounded">
                      <span className="text-sm text-gray-700">{filter.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">{filter.count}</span>
                        <input
                          type="checkbox"
                          checked={selectedViscosities.includes(filter.name)}
                          onChange={() => toggleFilter('viscosity', filter.name)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </div>
                    </label>
                  ))}
                </FilterSection>

                <FilterSection
                  title={t('products.filterByStandard')}
                  isOpen={openSections.apiStandard}
                  onToggle={() => toggleSection('apiStandard')}
                >
                  {filterCounts.apiStandards.map((filter) => (
                    <label key={filter.name} className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-1.5 rounded">
                      <span className="text-sm text-gray-700">{filter.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">{filter.count}</span>
                        <input
                          type="checkbox"
                          checked={selectedApiStandards.includes(filter.name)}
                          onChange={() => toggleFilter('apiStandard', filter.name)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </div>
                    </label>
                  ))}
                </FilterSection>

                <FilterSection
                  title="Technologie"
                  isOpen={openSections.technology}
                  onToggle={() => toggleSection('technology')}
                >
                  {filterCounts.technologies.map((filter) => (
                    <label key={filter.name} className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-1.5 rounded">
                      <span className="text-sm text-gray-700">{filter.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">{filter.count}</span>
                        <input
                          type="checkbox"
                          checked={selectedTechnologies.includes(filter.name)}
                          onChange={() => toggleFilter('technology', filter.name)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </div>
                    </label>
                  ))}
                </FilterSection>

                <FilterSection
                  title="Emballage"
                  isOpen={openSections.packaging}
                  onToggle={() => toggleSection('packaging')}
                >
                  {filterCounts.packaging.map((filter) => (
                    <label key={filter.name} className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-1.5 rounded">
                      <span className="text-sm text-gray-700">{filter.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">{filter.count}</span>
                        <input
                          type="checkbox"
                          checked={selectedPackaging.includes(filter.name)}
                          onChange={() => toggleFilter('packaging', filter.name)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </div>
                    </label>
                  ))}
                </FilterSection>
              </div>
            </div>
          </aside>

          {/* Right Side - Products */}
          <div className="lg:w-3/4">
            {/* Search Bar */}
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder={t('products.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-12 pr-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all shadow-sm"
              />
            </div>

            {/* Active Filters */}
            {activeFilters.length > 0 && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center flex-wrap gap-2">
                  <span className="text-sm font-semibold text-gray-700">FILTRES ACTIFS:</span>
                  {activeFilters.map((filter) => (
                    <span
                      key={`${filter.type}-${filter.label}`}
                      className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                      {filter.label === 'Huiles Moteur' ? 'Catégories: Huiles Moteur' : filter.label}
                      <button
                        onClick={() => removeFilter(filter.type, filter.label)}
                        className="ml-2 hover:text-blue-900"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Products Header */}
            {!loading && !error && (
              <div className="mb-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-600">
                  Affichage {startIndex + 1}-{Math.min(endIndex, sortedProducts.length)} de {sortedProducts.length} article(s)
                </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    <Grid3x3 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    <List className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-700">TRIER PAR:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="default">Par défaut</option>
                    <option value="name">Nom (A-Z)</option>
                    <option value="name-desc">Nom (Z-A)</option>
                  </select>
                </div>
                <button
                  onClick={handleCompare}
                  disabled={productsToCompare.length !== 2}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    productsToCompare.length === 2
                      ? 'bg-gradient-to-r from-blue-600 to-red-600 text-white hover:from-blue-700 hover:to-red-700 cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  COMPARER {productsToCompare.length > 0 && `(${productsToCompare.length}/2)`}
                </button>
              </div>
            </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-gray-600">Chargement des produits...</p>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="text-center py-12">
                <div className="text-6xl mb-3">⚠️</div>
                <p className="text-2xl font-bold text-gray-700 mb-2">Erreur de chargement</p>
                <p className="text-gray-500 mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-gradient-to-r from-blue-600 to-red-600 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300 font-medium"
                >
                  Réessayer
                </button>
              </div>
            )}

            {/* Products Grid */}
            {!loading && !error && currentProducts.length > 0 ? (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8'
                : 'space-y-4 mb-8'
              }>
                {currentProducts.map((product) => {
                  const isSelected = productsToCompare.some(p => p._id === product._id);
                  const canSelect = productsToCompare.length < 2 || isSelected;
                  return (
                  <div
                    key={product._id}
                    className={`bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl cursor-pointer group relative flex flex-col ${
                      viewMode === 'list' ? 'flex-row' : ''
                    } ${isSelected ? 'ring-2 ring-blue-600' : ''}`}
                    onClick={(e) => handleProductClick(product, e as React.MouseEvent)}
                  >
                    {/* Compare Checkbox */}
                    <div className="absolute top-2 right-2 z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (canSelect) {
                            toggleProductCompare(product);
                          }
                        }}
                        disabled={!canSelect}
                        className={`compare-checkbox p-2 rounded-full transition-all ${
                          isSelected
                            ? 'bg-blue-600 text-white'
                            : canSelect
                            ? 'bg-white/80 hover:bg-blue-100 text-gray-600'
                            : 'bg-gray-300 text-gray-400 cursor-not-allowed'
                        }`}
                        title={isSelected ? 'Désélectionner pour comparaison' : canSelect ? 'Sélectionner pour comparaison' : 'Maximum 2 produits'}
                      >
                        {isSelected ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <span className="text-xs font-bold">+</span>
                        )}
                      </button>
                    </div>
                    <div className={`bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden ${
                      viewMode === 'list' ? 'w-48 h-48 flex-shrink-0 p-4' : 'h-48 p-4'
                    }`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className={`w-auto object-contain transform group-hover:scale-110 transition-transform duration-500 ${
                          viewMode === 'list' ? 'h-full' : 'h-full'
                        }`}
                      />
                    </div>
                    <div className={`p-4 flex flex-col flex-1 ${viewMode === 'list' ? '' : ''}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                          {product.category}
                        </span>
                        {product.packaging && (
                          <span className="inline-block px-2 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                            {product.packaging.replace('Bidon ', '')}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 mb-1.5 group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 mb-3 line-clamp-2 text-sm flex-1">{product.description}</p>
                      <button className="w-full bg-gradient-to-r from-blue-600 to-red-600 text-white py-2.5 rounded-lg hover:shadow-lg transition-all duration-300 font-medium group-hover:from-blue-700 group-hover:to-red-700 mt-auto">
                        Voir plus
                      </button>
                    </div>
                  </div>
                  );
                })}
              </div>
            ) : !loading && !error ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-3">🔍</div>
                <p className="text-2xl font-bold text-gray-700 mb-2">Aucun produit trouvé</p>
                <p className="text-gray-500 mb-4">Essayez de modifier vos critères de recherche</p>
                <button
                  onClick={clearAllFilters}
                  className="bg-gradient-to-r from-blue-600 to-red-600 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300 font-medium"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            ) : null}

            {/* Pagination */}
            {!loading && !error && totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-3 rounded-lg transition-all duration-300 ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-blue-600 hover:bg-blue-50 shadow-md hover:shadow-lg'
                  }`}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <div className="flex space-x-2">
                  {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
                          currentPage === page
                            ? 'bg-gradient-to-r from-blue-600 to-red-600 text-white shadow-lg scale-110'
                            : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-3 rounded-lg transition-all duration-300 ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-blue-600 hover:bg-blue-50 shadow-md hover:shadow-lg'
                  }`}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <CompareModal
        products={productsToCompare}
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
      />
    </section>
  );
}