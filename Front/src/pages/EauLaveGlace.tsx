import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

export default function EauLaveGlacePage() {
  const siteUrl = 'https://polyoil-tunis.com';
  const pageUrl = `${siteUrl}/eau-lave-glace`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Eau Lave-Glace Tunisie - Polyoil Tunis',
    description: 'Achetez de l\'eau lave-glace de qualité en Tunisie. Produits concentrés et prêts à l\'emploi pour un nettoyage optimal de votre pare-brise à Tunis.',
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
        title="Eau Lave-Glace Tunisie - Polyoil Tunis"
        description="Eau lave-glace pour pare-brise en Tunisie. Produits concentrés et prêts à l'emploi, efficaces été et hiver à Tunis. Livraison disponible dans toute la région."
        keywords="eau lave-glace Tunisie, eau lave-glace Tunis, liquide lave-glace Tunisie, produit lave-glace Tunis, Polyoil Tunis"
        canonicalUrl={pageUrl}
        schema={schema}
      />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-red-700 text-white py-20 pt-32">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
              Eau Lave-Glace Tunisie - Produits de Qualité à Tunis
            </h1>
            <p className="text-xl text-blue-100 text-center max-w-3xl mx-auto">
              Découvrez notre sélection d'eau lave-glace pour un nettoyage efficace de votre pare-brise. 
              Produits adaptés aux conditions climatiques tunisiennes.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <article className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Eau Lave-Glace de Qualité en Tunisie
              </h2>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                L'eau lave-glace est un produit essentiel pour maintenir une visibilité optimale lors de la conduite. 
                Chez Polyoil Tunis, nous proposons une gamme complète d'eau lave-glace de haute qualité, adaptée aux 
                conditions climatiques tunisiennes. Que vous conduisiez à Tunis en été, sous la poussière, ou en hiver 
                avec les pluies, notre eau lave-glace garantit un nettoyage efficace de votre pare-brise.
              </p>

              <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                Pourquoi Utiliser une Eau Lave-Glace de Qualité ?
              </h3>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                Une eau lave-glace de qualité est essentielle pour votre sécurité et celle des autres usagers de la route. 
                Elle permet de dégraisser efficacement le pare-brise, d'éliminer les salissures, la poussière et les insectes, 
                tout en préservant l'intégrité des balais d'essuie-glace. À Tunis, où les conditions peuvent être poussiéreuses, 
                utiliser un produit adapté est d'autant plus important.
              </p>

              <p className="text-gray-700 mb-6 leading-relaxed">
                Une mauvaise eau lave-glace peut endommager les essuie-glaces, laisser des traces sur le pare-brise, et même 
                boucher les canalisations du système de nettoyage. C'est pourquoi nous proposons uniquement des produits de 
                qualité, testés et conformes aux normes en vigueur en Tunisie.
              </p>

              <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                Types d'Eau Lave-Glace Disponibles à Tunis
              </h3>

              <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
                Eau Lave-Glace Concentrée
              </h4>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Nos produits concentrés offrent un excellent rapport qualité-prix. Il suffit de les diluer avec de l'eau 
                selon les proportions indiquées. Cette option est économique et pratique, particulièrement pour les 
                professionnels qui utilisent de grandes quantités d'eau lave-glace en Tunisie.
              </p>

              <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
                Eau Lave-Glace Prête à l'Emploi
              </h4>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Pour plus de praticité, nous proposons également des produits prêts à l'emploi, directement utilisables sans 
                dilution. Ces produits sont parfaits pour les particuliers qui souhaitent une solution simple et efficace pour 
                l'entretien de leur véhicule à Tunis.
              </p>

              <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
                Eau Lave-Glace Antigel
              </h4>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Bien que les hivers tunisiens soient généralement doux, nous proposons également des formulations antigel pour 
                les régions où les températures peuvent descendre en dessous de zéro. Ces produits évitent le gel du liquide 
                dans le réservoir et sur le pare-brise, garantissant une utilisation sans problème même par temps froid.
              </p>

              <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                Avantages de Notre Eau Lave-Glace en Tunisie
              </h3>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                Notre eau lave-glace est formulée pour répondre aux besoins spécifiques du marché tunisien. Elle est efficace 
                contre la poussière omniprésente dans certaines régions, résiste aux températures élevées de l'été tunisien, 
                et préserve l'intégrité des balais d'essuie-glace. De plus, nos produits respectent l'environnement et sont 
                sans danger pour la peinture de votre véhicule.
              </p>

              <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                Comment Utiliser l'Eau Lave-Glace Correctement ?
              </h3>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                Pour une utilisation optimale de l'eau lave-glace à Tunis, suivez les instructions du fabricant concernant la 
                dilution si vous utilisez un produit concentré. Veillez à maintenir le réservoir rempli, surtout en période 
                sèche où la poussière peut s'accumuler rapidement sur le pare-brise. N'utilisez jamais de détergent ou de 
                savon domestique, car ils peuvent endommager le système de nettoyage et les essuie-glaces.
              </p>

              <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                Où Acheter de l'Eau Lave-Glace à Tunis ?
              </h3>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                Polyoil Tunis est votre partenaire de confiance pour l'achat d'eau lave-glace en Tunisie. Nous proposons des 
                produits de qualité à des tarifs compétitifs, avec la possibilité de livrer dans toute la région de Tunis. 
                Que vous soyez un particulier ou un professionnel, contactez-nous pour découvrir notre gamme complète d'eau 
                lave-glace adaptée au marché tunisien.
              </p>

              <p className="text-gray-700 mb-6 leading-relaxed">
                N'hésitez pas à nous contacter pour obtenir plus d'informations sur nos produits ou pour demander un devis. 
                Nous sommes à votre service à Tunis pour répondre à tous vos besoins en eau lave-glace et autres produits 
                d'entretien automobile en Tunisie.
              </p>
            </article>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Besoin d'Eau Lave-Glace à Tunis ?
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Contactez-nous pour découvrir nos produits et tarifs
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

