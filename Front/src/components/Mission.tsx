import { Target, Eye, Award, Leaf } from 'lucide-react';

export default function Mission() {
  return (
    <section id="mission" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Mission, Vision & Valeurs</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Depuis plus de 10 ans, nous innovons dans le domaine des lubrifiants automobiles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="bg-blue-600 rounded-full p-4 mr-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Notre Mission</h3>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Fournir des produits de haute qualité pour optimiser les performances de votre véhicule.
              Nous nous engageons à offrir des solutions de lubrification innovantes qui protègent et
              prolongent la durée de vie de vos moteurs.
            </p>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="bg-red-600 rounded-full p-4 mr-4">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Notre Vision</h3>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Devenir la marque de référence dans la performance automobile en Tunisie et dans la région.
              Nous visons l'excellence dans chaque produit et aspirons à être le premier choix des
              professionnels et particuliers.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-red-600 rounded-xl p-8 text-white shadow-xl">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">Nos Valeurs</h3>
            <p className="text-xl text-blue-100">
              Qualité, innovation et respect de l'environnement guident chacune de nos actions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <Award className="h-8 w-8 flex-shrink-0 text-yellow-300" />
              <div>
                <h4 className="text-xl font-bold mb-2">Qualité supérieure</h4>
                <p className="text-blue-100">
                  Nous sélectionnons rigoureusement nos matières premières et contrôlons chaque étape
                  de production pour garantir des produits d'excellence.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Leaf className="h-8 w-8 flex-shrink-0 text-green-300" />
              <div>
                <h4 className="text-xl font-bold mb-2">Respect de l'environnement</h4>
                <p className="text-blue-100">
                  Nos formulations sont conçues pour minimiser l'impact environnemental tout en
                  maximisant les performances de vos moteurs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
