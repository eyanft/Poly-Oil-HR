import { X, Package, Droplets, Shield, Award } from 'lucide-react';

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

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  if (!isOpen || !product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between rounded-t-2xl z-10">
          <h2 className="text-2xl font-bold text-gray-800">Détails du produit</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto max-h-96 object-contain"
              />
            </div>

            <div className="space-y-6">
              <div>
                <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-sm font-medium rounded-full mb-3">
                  {product.category}
                </span>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-lg text-gray-600">{product.description}</p>
              </div>

              <div className="flex items-center space-x-3 py-4 border-y border-gray-200">
                <Package className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Volume disponible</p>
                  <p className="text-lg font-bold text-gray-800">{product.volume}</p>
                </div>
              </div>

              {product.price && (
                <div className="bg-gradient-to-r from-blue-50 to-red-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Prix indicatif</p>
                  <p className="text-3xl font-bold text-blue-700">{product.price}</p>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Droplets className="h-6 w-6 text-blue-600 mr-3" />
                <h4 className="text-xl font-bold text-gray-800">Spécifications</h4>
              </div>
              <ul className="space-y-2">
                {product.specifications?.map((spec, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span className="text-gray-700">{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-red-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 text-red-600 mr-3" />
                <h4 className="text-xl font-bold text-gray-800">Avantages</h4>
              </div>
              <ul className="space-y-2">
                {product.features?.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-red-600 rounded-xl p-6 text-white">
            <div className="flex items-center mb-3">
              <Award className="h-6 w-6 mr-3" />
              <h4 className="text-xl font-bold">Qualité garantie</h4>
            </div>
            <p className="text-blue-100">
              Tous nos produits sont conformes aux normes internationales et testés rigoureusement
              pour garantir des performances optimales et une protection maximale de votre moteur.
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-gradient-to-r from-blue-600 to-red-600 text-white py-4 rounded-lg hover:shadow-lg transition-all duration-300 font-bold text-lg">
              Demander un devis
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-lg hover:bg-gray-300 transition-all duration-300 font-bold text-lg"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
