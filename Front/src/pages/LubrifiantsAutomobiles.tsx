import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

export default function LubrifiantsAutomobilesPage() {
  const siteUrl = 'https://polyoil.com';
  const pageUrl = `${siteUrl}/lubrifiants-automobiles`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Lubrifiants Automobiles Tunis - Polyoil Tunis',
    description: 'Découvrez notre gamme complète de lubrifiants automobiles à Tunis. Huiles moteur, huiles de boîte, liquides de frein et graisses pour tous véhicules en Tunisie.',
    url: pageUrl,
    publisher: {
      '@type': 'LocalBusiness',
      name: 'Poly Oil',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'GP5 km 24 Borj EL Amri',
        addressLocality: 'Manouba',
        addressRegion: 'Tunis',
        addressCountry: 'TN'
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Lubrifiants Automobiles Tunis - Polyoil Tunis"
        description="Vente de lubrifiants automobiles à Tunis. Huiles moteur, huiles de boîte, liquides de frein et graisses industrielles pour tous véhicules en Tunisie. Expertise et qualité garanties."
        keywords="lubrifiants automobiles Tunis, lubrifiants Tunisie, huiles de boîte Tunis, liquide de frein Tunis, graisses automobiles Tunisie, Polyoil Tunis"
        canonicalUrl={pageUrl}
        schema={schema}
      />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-red-700 text-white py-20 pt-32">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
              Lubrifiants Automobiles à Tunis - Polyoil Tunis
            </h1>
            <p className="text-xl text-blue-100 text-center max-w-3xl mx-auto">
              Votre spécialiste en lubrifiants automobiles à Tunis. Une gamme complète pour l'entretien optimal 
              de tous vos véhicules en Tunisie.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <article className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Lubrifiants Automobiles de Qualité à Tunis
              </h2>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                Polyoil Tunis est votre référence pour les lubrifiants automobiles en Tunisie. Depuis plus de 10 ans, 
                nous distribuons une gamme complète de produits de haute qualité pour l'entretien et la maintenance 
                de tous types de véhicules à Tunis et dans toute la Tunisie. Que vous possédiez une voiture, une moto, 
                un camion ou un véhicule industriel, nos lubrifiants garantissent des performances optimales.
              </p>

              <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                Qu'est-ce qu'un Lubrifiant Automobile ?
              </h3>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                Les lubrifiants automobiles sont des produits essentiels au bon fonctionnement de votre véhicule. Ils 
                réduisent la friction entre les pièces mécaniques, évacuent la chaleur, protègent contre la corrosion 
                et l'usure, et maintiennent la propreté des composants internes. À Tunis, où les conditions de conduite 
                peuvent être variées (trafic urbain, routes de campagne, températures élevées), choisir les bons 
                lubrifiants est crucial pour la longévité de votre véhicule.
              </p>

              <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                Notre Gamme de Lubrifiants Automobiles à Tunis
              </h3>

              <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
                Huiles Moteur
              </h4>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Nous proposons une large sélection d'huiles moteur pour tous types de véhicules : huiles synthétiques, 
                semi-synthétiques et minérales. Nos huiles respectent les normes internationales (API, ACEA) et les 
                spécifications des principaux constructeurs automobiles. Que vous conduisiez une voiture essence ou diesel 
                à Tunis, nous avons l'huile moteur adaptée à votre moteur.
              </p>

              <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
                Huiles de Boîte de Vitesses
              </h4>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Les huiles de boîte de vitesses sont spécialement formulées pour protéger et lubrifier les composants 
                de votre transmission. Que votre véhicule soit équipé d'une boîte manuelle ou automatique, nous proposons 
                les huiles adaptées pour garantir un passage de vitesse fluide et une protection optimale à long terme.
              </p>

              <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
                Liquides de Frein
              </h4>
              <p className="text-gray-700 mb-4 leading-relaxed">
                La sécurité de votre véhicule dépend en grande partie de la qualité de votre liquide de frein. Nous 
                distribuons des liquides de frein de haute qualité (normes DOT 3, DOT 4, DOT 5.1) qui garantissent une 
                transmission efficace de la force de freinage et résistent aux températures élevées, particulièrement 
                importantes dans le contexte tunisien.
              </p>

              <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
                Graisses et Lubrifiants Spécialisés
              </h4>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Pour l'entretien complet de votre véhicule à Tunis, nous proposons également des graisses pour roulements, 
                des lubrifiants pour chaînes, et d'autres produits spécialisés. Ces lubrifiants prolongent la durée de vie 
                des composants mécaniques et assurent un fonctionnement silencieux et fluide.
              </p>

              <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                Pourquoi Choisir Polyoil Tunis pour vos Lubrifiants ?
              </h3>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                En tant que spécialiste des lubrifiants automobiles en Tunisie, nous nous engageons à offrir des produits 
                de la plus haute qualité, conformes aux normes internationales. Notre équipe à Tunis possède une expertise 
                approfondie pour vous conseiller sur le choix des lubrifiants les plus adaptés à votre véhicule et à vos 
                conditions d'utilisation.
              </p>

              <p className="text-gray-700 mb-6 leading-relaxed">
                Nous proposons des tarifs compétitifs pour les particuliers et les professionnels, avec la possibilité de 
                livrer dans toute la région de Tunis. Que vous ayez besoin de petites quantités pour votre véhicule personnel 
                ou de volumes importants pour votre flotte, nous adaptons nos offres à vos besoins.
              </p>

              <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                Conseils pour l'Entretien avec les Lubrifiants
              </h3>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                Un entretien régulier avec des lubrifiants de qualité est essentiel pour maintenir votre véhicule en bon 
                état. Respectez les intervalles de vidange recommandés par le constructeur, vérifiez régulièrement les niveaux 
                d'huile, et utilisez toujours des lubrifiants conformes aux spécifications de votre véhicule. Notre équipe 
                à Tunis peut vous fournir tous les conseils nécessaires pour un entretien optimal.
              </p>

              <p className="text-gray-700 mb-6 leading-relaxed">
                N'hésitez pas à nous contacter pour obtenir des informations sur nos lubrifiants automobiles ou pour demander 
                un devis personnalisé. Nous sommes à votre service à Tunis pour répondre à tous vos besoins en matière de 
                lubrifiants automobiles en Tunisie.
              </p>
            </article>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Besoin de Lubrifiants Automobiles à Tunis ?
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Contactez-nous pour un conseil personnalisé et des tarifs compétitifs
            </p>
            <a
              href="/contact"
              className="inline-block bg-gradient-to-r from-blue-600 to-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-lg transition-all duration-300"
            >
              Nous Contacter
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

