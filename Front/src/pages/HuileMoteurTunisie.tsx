import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

export default function HuileMoteurTunisiePage() {
  const siteUrl = 'https://polyoil-tunis.com';
  const pageUrl = `${siteUrl}/huile-moteur-tunisie`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Huile Moteur Tunisie - Polyoil Tunis',
    description: 'Découvrez notre gamme complète d\'huiles moteur en Tunisie. Huiles synthétiques, semi-synthétiques et minérales pour tous véhicules à Tunis.',
    url: pageUrl,
    publisher: {
      '@type': 'LocalBusiness',
      name: 'Polyoil Tunis',
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
        title="Huile Moteur Tunisie - Polyoil Tunis"
        description="Achetez des huiles moteur de qualité en Tunisie. Large gamme d'huiles synthétiques, semi-synthétiques et minérales pour voitures, motos et véhicules utilitaires à Tunis. Livraison disponible."
        keywords="huile moteur Tunisie, huile moteur Tunis, huile moteur voiture Tunisie, huile moteur synthétique Tunis, huile moteur prix Tunisie, Polyoil Tunis"
        canonicalUrl={pageUrl}
        schema={schema}
      />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-red-700 text-white py-20 pt-32">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
              Huile Moteur Tunisie - Votre Spécialiste à Tunis
            </h1>
            <p className="text-xl text-blue-100 text-center max-w-3xl mx-auto">
              Découvrez notre sélection d'huiles moteur de qualité pour tous types de véhicules en Tunisie. 
              Performance optimale et protection maximale de votre moteur.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <article className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Guide Complet des Huiles Moteur en Tunisie
              </h2>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                Chez Polyoil Tunis, nous sommes spécialisés dans la distribution d'huiles moteur de haute qualité 
                pour tous types de véhicules à Tunis et en Tunisie. Que vous recherchiez une huile moteur pour 
                votre voiture particulière, votre moto ou votre véhicule utilitaire, notre gamme complète répond 
                à tous vos besoins.
              </p>

              <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                Pourquoi Choisir nos Huiles Moteur en Tunisie ?
              </h3>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                L'huile moteur est essentielle au bon fonctionnement de votre véhicule. Elle assure la lubrification 
                des pièces mécaniques, réduit la friction, évacue la chaleur et protège votre moteur contre l'usure 
                prématurée. À Tunis, où les températures peuvent être élevées, choisir une huile moteur adaptée est 
                crucial pour garantir les performances optimales de votre véhicule.
              </p>

              <p className="text-gray-700 mb-6 leading-relaxed">
                Nos huiles moteur sont sélectionnées selon les normes internationales les plus strictes (API, ACEA) 
                et respectent les spécifications des principaux constructeurs automobiles. Que vous conduisiez une 
                voiture essence ou diesel, une moto ou un véhicule de transport, nous avons l'huile moteur adaptée 
                à votre moteur.
              </p>

              <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                Types d'Huiles Moteur Disponibles à Tunis
              </h3>

              <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
                Huiles Moteur Synthétiques
              </h4>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Les huiles moteur 100% synthétiques offrent les meilleures performances et la protection la plus 
                élevée pour votre moteur. Idéales pour les véhicules récents et les moteurs haute performance, 
                elles résistent mieux aux températures extrêmes et offrent une meilleure fluidité à froid. À Tunis, 
                où les conditions climatiques peuvent varier, ces huiles assurent une protection optimale toute 
                l'année.
              </p>

              <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
                Huiles Moteur Semi-Synthétiques
              </h4>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Offrant un excellent rapport qualité-prix, les huiles moteur semi-synthétiques combinent les avantages 
                des huiles minérales et synthétiques. Parfaites pour la plupart des véhicules modernes en Tunisie, 
                elles offrent une bonne protection et des performances satisfaisantes pour un usage quotidien.
              </p>

              <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
                Huiles Moteur Minérales
              </h4>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Les huiles moteur minérales restent une option économique pour les véhicules anciens ou les moteurs 
                moins exigeants. Bien qu'elles offrent une protection de base, elles nécessitent des vidanges plus 
                fréquentes, particulièrement dans les conditions de conduite tunisiennes.
              </p>

              <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                Comment Choisir la Bonne Huile Moteur en Tunisie ?
              </h3>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                Pour choisir la bonne huile moteur à Tunis, plusieurs critères doivent être pris en compte : le type 
                de moteur (essence ou diesel), la viscosité recommandée par le constructeur (par exemple, 5W-30, 10W-40), 
                les normes API et ACEA, et les spécifications constructeur (VW, BMW, Mercedes, etc.).
              </p>

              <p className="text-gray-700 mb-6 leading-relaxed">
                Notre équipe à Tunis est à votre disposition pour vous conseiller et vous aider à sélectionner l'huile 
                moteur la plus adaptée à votre véhicule. Nous proposons également différents formats d'emballage (1L, 4L, 20L) 
                selon vos besoins.
              </p>

              <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                Où Acheter de l'Huile Moteur à Tunis ?
              </h3>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                Polyoil Tunis est votre partenaire de confiance pour l'achat d'huiles moteur en Tunisie. Située à 
                Manouba, près de Tunis, notre entreprise livre dans toute la région de Tunis et propose des tarifs 
                compétitifs pour les particuliers et les professionnels. Contactez-nous pour obtenir un devis personnalisé 
                et découvrir notre gamme complète d'huiles moteur adaptées au marché tunisien.
              </p>

              <p className="text-gray-700 mb-6 leading-relaxed">
                Que vous soyez un particulier cherchant la meilleure huile moteur pour votre voiture, ou un professionnel 
                nécessitant des volumes importants, nous avons la solution adaptée à vos besoins en Tunisie.
              </p>
            </article>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Besoin de Conseils pour Choisir votre Huile Moteur ?
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Contactez notre équipe à Tunis pour un conseil personnalisé
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

