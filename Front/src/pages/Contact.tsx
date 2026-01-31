import Header from '../components/Header';
import Footer from '../components/Footer';
import Contact from '../components/Contact';
import SEO from '../components/SEO';

export default function ContactPage() {
  const siteUrl = 'https://polyoil-tunis.com';
  const pageUrl = `${siteUrl}/contact`;

  // Schema LocalBusiness JSON-LD pour SEO local
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}/#organization`,
    name: 'Polyoil Tunis',
    image: `${siteUrl}/logo.png`,
    url: siteUrl,
    telephone: '+21697864022',
    email: 'polyoilhr@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'GP5 km 24 Borj EL Amri',
      addressLocality: 'Manouba',
      addressRegion: 'Tunis',
      postalCode: '2010',
      addressCountry: 'TN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 36.7224,
      longitude: 9.9126
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday'
        ],
        opens: '08:00',
        closes: '18:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '13:00'
      }
    ],
    priceRange: '$$',
    description: 'Vente d\'huiles moteur, lubrifiants automobiles et eau lave-glace en Tunisie. Polyoil Tunis est votre spécialiste à Tunis pour tous vos besoins en produits d\'entretien automobile.',
    sameAs: [
      // Ajouter vos réseaux sociaux ici si disponibles
    ],
    areaServed: {
      '@type': 'Country',
      name: 'Tunisia'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Produits Automobiles',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Huile Moteur Tunisie'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Lubrifiants Automobiles'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Eau Lave-Glace'
          }
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Contact - Polyoil Tunis"
        description="Contactez Polyoil Tunis pour vos besoins en huiles moteur, lubrifiants automobiles et eau lave-glace en Tunisie. Adresse: GP5 km 24 Borj EL Amri, Manouba, Tunis. Tél: +216 97 864 022"
        keywords="contact Polyoil Tunis, huile moteur Tunisie contact, lubrifiants automobiles Tunis, adresse Polyoil Tunis"
        canonicalUrl={pageUrl}
        schema={localBusinessSchema}
      />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-red-700 text-white py-20 pt-32">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
              Contactez Polyoil Tunis
            </h1>
            <p className="text-xl text-blue-100 text-center max-w-3xl mx-auto">
              Nous sommes à votre écoute pour répondre à tous vos besoins en huiles moteur, 
              lubrifiants automobiles et eau lave-glace en Tunisie.
            </p>
          </div>
        </section>

        {/* Contact Information Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Adresse</h3>
                <p className="text-gray-700">
                  GP5 km 24 Borj EL Amri<br />
                  Manouba, Tunis<br />
                  Tunisie
                </p>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Téléphone</h3>
                <p className="text-gray-700">
                  <a href="tel:+21697864022" className="hover:text-blue-600 transition-colors">
                    +216 97 864 022
                  </a>
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Email</h3>
                <p className="text-gray-700">
                  <a href="mailto:polyoilhr@gmail.com" className="hover:text-blue-600 transition-colors">
                    polyoilhr@gmail.com
                  </a>
                </p>
              </div>
            </div>

            {/* Horaires d'ouverture */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Horaires d'Ouverture
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-gray-800">Lundi - Vendredi</span>
                  <span className="text-gray-700">08:00 - 18:00</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-gray-800">Samedi</span>
                  <span className="text-gray-700">08:00 - 13:00</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg md:col-span-2">
                  <span className="font-semibold text-gray-800">Dimanche</span>
                  <span className="text-gray-700">Fermé</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

