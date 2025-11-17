import { X } from 'lucide-react';

// Product type compatible with both static and API products
type Product = {
  _id: string;
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
  [key: string]: any; // Allow additional properties
};

interface CompareModalProps {
  products: Product[];
  isOpen: boolean;
  onClose: () => void;
}

export default function CompareModal({ products, isOpen, onClose }: CompareModalProps) {
  if (!isOpen || products.length !== 2) return null;

  const comparisonFields = [
    { label: 'Catégories', getValue: (p: Product) => p.category },
    { label: 'Type d\'huile', getValue: (p: Product) => p.oilType || '-' },
    { label: 'Viscosité', getValue: (p: Product) => p.viscosity || '-' },
    { label: 'Norme API', getValue: (p: Product) => p.apiStandard || '-' },
    { label: 'Norme ACEA', getValue: (p: Product) => p.aceaStandard || '-' },
    { label: 'Normes constructeurs', getValue: (p: Product) => p.manufacturerStandards || '-' },
    { label: 'Applications', getValue: (p: Product) => p.applications || '-' },
    { label: 'Technologie', getValue: (p: Product) => p.technology || '-' },
    { label: 'Emballage', getValue: (p: Product) => p.packaging || '-' },
    { label: 'Volume', getValue: (p: Product) => p.volume },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between rounded-t-2xl z-10">
          <h2 className="text-2xl font-bold text-gray-800">Comparaison de produits</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          {/* Product Headers */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="font-semibold text-gray-700">Caractéristiques</div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 mb-3">
                <img
                  src={products[0].image}
                  alt={products[0].name}
                  className="h-32 w-auto mx-auto object-contain"
                />
              </div>
              <h3 className="font-bold text-gray-800 text-sm">{products[0].name}</h3>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 mb-3">
                <img
                  src={products[1].image}
                  alt={products[1].name}
                  className="h-32 w-auto mx-auto object-contain"
                />
              </div>
              <h3 className="font-bold text-gray-800 text-sm">{products[1].name}</h3>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-blue-50 to-red-50">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Caractéristiques</th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">{products[0].name}</th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">{products[1].name}</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFields.map((field, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">
                      {field.label}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-gray-600">
                      {field.getValue(products[0])}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-gray-600">
                      {field.getValue(products[1])}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Additional Info */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-bold text-gray-800 mb-2">{products[0].name}</h4>
              <p className="text-sm text-gray-600">{products[0].description}</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <h4 className="font-bold text-gray-800 mb-2">{products[1].name}</h4>
              <p className="text-sm text-gray-600">{products[1].description}</p>
            </div>
          </div>

          {/* Close Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-blue-600 to-red-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
