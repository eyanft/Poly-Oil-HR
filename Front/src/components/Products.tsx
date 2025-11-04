import { useState } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import ProductModal from './ProductModal';
import product1 from '../assets/20w504lb.png';
import product2 from '../assets/20w504lgold.png';
import product3 from '../assets/40fl20l.png';
import product4 from '../assets/90fl20l.png';
import product5 from '../assets/1040.png';
import product6 from '../assets/2050p2.png';
import product7 from '../assets/7580.png';
import product8 from '../assets/10405l.png';
import product9 from '../assets/atf.png';

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  volume: string;
  specifications?: string[];
  features?: string[];
  price?: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'PO-5000 20W-50',
    category: 'Huiles moteur',
    description: 'Huile moteur à essence multigrade offrant une excellente protection',
    image: product1,
    volume: '4L',
    specifications: ['Norme API SF/CD', 'Multigrade 20W-50', 'Pour moteurs essence'],
    features: ['Protection contre l\'usure', 'Excellente stabilité thermique', 'Réduction de la consommation'],
    price: 'Sur devis',
  },
  {
    id: 2,
    name: 'PO Gold 20W-50',
    category: 'Huiles moteur',
    description: 'Huile moteur super haute qualité offrant une protection supérieure',
    image: product2,
    volume: '4L',
    specifications: ['Norme API SL/CF', 'Qualité supérieure', 'Protection maximale'],
    features: ['Performance optimale', 'Nettoyage du moteur', 'Longévité accrue'],
    price: 'Sur devis',
  },
  {
    id: 3,
    name: 'Flexi Oil HD 40',
    category: 'Huiles diesel',
    description: 'Huile moteur diesel haute performance pour moteurs lourds',
    image: product3,
    volume: '20L',
    specifications: ['SAE 40', 'Pour moteurs diesel', 'Usage industriel'],
    features: ['Résistance aux charges élevées', 'Protection anti-corrosion', 'Durabilité exceptionnelle'],
    price: 'Sur devis',
  },
  {
    id: 4,
    name: 'Flexi Oil SAE 90',
    category: 'Huiles transmission',
    description: 'Huile de transmission API GL1 pour boîtes de vitesses',
    image: product4,
    volume: '20L',
    specifications: ['SAE 90', 'API GL1', 'Pour transmissions'],
    features: ['Changement de vitesse fluide', 'Protection des engrenages', 'Réduction du bruit'],
    price: 'Sur devis',
  },
  {
    id: 5,
    name: 'PO-5000 10W-40',
    category: 'Huiles moteur',
    description: 'Huile moteur semi-synthétique haute performance',
    image: product5,
    volume: '1L',
    specifications: ['API SL/CF', '10W-40', 'Semi-synthétique'],
    features: ['Démarrage à froid facilité', 'Protection toutes saisons', 'Économie de carburant'],
    price: 'Sur devis',
  },
  {
    id: 6,
    name: 'PO Gold P2 20W-50',
    category: 'Huiles moteur',
    description: 'Huile moteur premium pour performances exceptionnelles',
    image: product6,
    volume: '1L',
    specifications: ['Qualité premium', 'API SL/CF', 'Additifs avancés'],
    features: ['Performance supérieure', 'Propreté maximale', 'Protection longue durée'],
    price: 'Sur devis',
  },
  {
    id: 7,
    name: 'Gear Free G2 75W-80',
    category: 'Huiles transmission',
    description: 'Huile pour transmission manuelle et boîtier AT',
    image: product7,
    volume: '1L',
    specifications: ['API GL4', '75W-80', 'Multi-usage'],
    features: ['Changements précis', 'Résistance à l\'oxydation', 'Protection anti-usure'],
    price: 'Sur devis',
  },
  {
    id: 8,
    name: 'PO-5000 10W-40',
    category: 'Huiles moteur',
    description: 'Huile moteur essence et diesel semi-synthétique',
    image: product8,
    volume: '5L',
    specifications: ['API SL/CF', 'Essence et diesel', '10W-40'],
    features: ['Polyvalence maximale', 'Économique', 'Haute protection'],
    price: 'Sur devis',
  },
  {
    id: 9,
    name: 'ATF A2 Dexron II',
    category: 'Huiles transmission',
    description: 'Huile pour transmission automatique',
    image: product9,
    volume: '1L',
    specifications: ['Dexron II', 'Transmission automatique', 'Fluide ATF'],
    features: ['Changement fluide', 'Protection hydraulique', 'Longévité transmission'],
    price: 'Sur devis',
  },
  {
    id: 10,
    name: 'Liquide de frein DOT 4',
    category: 'Liquides de frein',
    description: 'Liquide de frein haute performance pour systèmes de freinage',
    image: product1,
    volume: '500ml',
    specifications: ['Norme DOT 4', 'Point d\'ébullition élevé', 'Compatible tous véhicules'],
    features: ['Freinage sûr', 'Résistance à l\'humidité', 'Performance constante'],
    price: 'Sur devis',
  },
  {
    id: 11,
    name: 'Lave-glace concentré',
    category: 'Lave-glaces',
    description: 'Solution de nettoyage efficace pour pare-brise',
    image: product2,
    volume: '2L',
    specifications: ['Concentré dilutable', 'Toutes saisons', 'Non toxique'],
    features: ['Nettoyage parfait', 'Protection anti-gel', 'Sans traces'],
    price: 'Sur devis',
  },
  {
    id: 12,
    name: 'Graisse lithium EP2',
    category: 'Graisses',
    description: 'Graisse multi-usage pour lubrification industrielle',
    image: product3,
    volume: '500g',
    specifications: ['Lithium EP2', 'Multi-usage', 'Haute adhérence'],
    features: ['Protection extrême', 'Résistance aux charges', 'Usage universel'],
    price: 'Sur devis',
  },
  {
    id: 13,
    name: 'Eau déminéralisée',
    category: 'Eau déminéralisée',
    description: 'Eau purifiée pour batteries et systèmes de refroidissement',
    image: product4,
    volume: '5L',
    specifications: ['100% pure', 'Sans minéraux', 'Usage automobile'],
    features: ['Évite les dépôts', 'Protection batteries', 'Polyvalente'],
    price: 'Sur devis',
  },
];

const categories = ['Tous', 'Huiles moteur', 'Huiles diesel', 'Huiles transmission', 'Liquides de frein', 'Lave-glaces', 'Graisses', 'Eau déminéralisée'];
const volumes = ['Tous', '500ml', '1L', '2L', '4L', '5L', '20L'];

const ITEMS_PER_PAGE = 8;

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [selectedVolume, setSelectedVolume] = useState('Tous');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'Tous' || product.category === selectedCategory;
    const matchesVolume = selectedVolume === 'Tous' || product.volume === selectedVolume;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesVolume && matchesSearch;
  });

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const productsSection = document.getElementById('produits');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const resetFilters = () => {
    setSelectedCategory('Tous');
    setSelectedVolume('Tous');
    setSearchTerm('');
    setCurrentPage(1);
  };

  return (
    <section id="produits" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Nos Produits</h2>
          <p className="text-xl text-gray-600">Découvrez notre gamme complète de lubrifiants et produits automobiles</p>
        </div>

        <div className="mb-8 space-y-6">
          <div className="relative max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Rechercher un produit par nom ou description..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all shadow-sm hover:shadow-md"
            />
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <SlidersHorizontal className="h-5 w-5 text-gray-600" />
                <h3 className="text-lg font-bold text-gray-800">Filtres</h3>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden text-blue-600 hover:text-blue-700 font-medium"
              >
                {showFilters ? 'Masquer' : 'Afficher'}
              </button>
            </div>

            <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-gray-700 flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    Catégorie
                  </label>
                  {(selectedCategory !== 'Tous' || selectedVolume !== 'Tous' || searchTerm) && (
                    <button
                      onClick={resetFilters}
                      className="text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      Réinitialiser
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setCurrentPage(1);
                      }}
                      className={`px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-blue-600 to-red-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 flex items-center mb-3">
                  <Filter className="h-4 w-4 mr-2" />
                  Volume (Litrage)
                </label>
                <div className="flex flex-wrap gap-2">
                  {volumes.map(volume => (
                    <button
                      key={volume}
                      onClick={() => {
                        setSelectedVolume(volume);
                        setCurrentPage(1);
                      }}
                      className={`px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
                        selectedVolume === volume
                          ? 'bg-gradient-to-r from-red-600 to-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {volume}
                    </button>
                  ))}
                </div>
              </div>

              {filteredProducts.length > 0 && (
                <div className="text-sm text-gray-600 pt-2 border-t border-gray-200">
                  <span className="font-semibold">{filteredProducts.length}</span> produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {currentProducts.map((product, index) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl cursor-pointer animate-fade-in-up group"
              style={{ animationDelay: `${0.1 * (index % 4)}s` }}
              onClick={() => handleProductClick(product)}
            >
              <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-auto object-contain transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                    {product.category}
                  </span>
                  <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                    {product.volume}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                <button className="w-full bg-gradient-to-r from-blue-600 to-red-600 text-white py-3 rounded-lg hover:shadow-lg transition-all duration-300 font-medium group-hover:from-blue-700 group-hover:to-red-700">
                  Voir plus
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-2xl font-bold text-gray-700 mb-2">Aucun produit trouvé</p>
            <p className="text-gray-500 mb-4">Essayez de modifier vos critères de recherche</p>
            <button
              onClick={resetFilters}
              className="bg-gradient-to-r from-blue-600 to-red-600 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300 font-medium"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 mt-12 animate-fade-in-up">
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

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
