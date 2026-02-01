import { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Products from '../components/Products';
import Mission from '../components/Mission';
import Blog from '../components/Blog';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import QuoteFormModal from '../components/QuoteFormModal';

export default function HomePage() {
  const siteUrl = 'https://polyoil.com';
  const pageUrl = siteUrl;
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [productForQuote, setProductForQuote] = useState<{ name: string } | null>(null);

  const openQuoteForm = (product: { name: string } | null) => {
    setProductForQuote(product);
    setQuoteModalOpen(true);
  };

  // Schema Organization pour la page d'accueil
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: 'Polyoil Tunis',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+216-97-864-022',
      contactType: 'Customer Service',
      email: 'polyoilhr@gmail.com',
      areaServed: 'TN',
      availableLanguage: ['French', 'Arabic']
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'GP5 km 24 Borj EL Amri',
      addressLocality: 'Manouba',
      addressRegion: 'Tunis',
      postalCode: '2010',
      addressCountry: 'TN'
    },
    sameAs: []
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Polyoil Tunis - Huile Moteur & Lubrifiants Automobiles en Tunisie"
        description="Polyoil Tunis est votre spécialiste en huiles moteur, lubrifiants automobiles et eau lave-glace en Tunisie. Découvrez notre gamme complète de produits de qualité à Tunis. Livraison disponible dans toute la région."
        keywords="huile moteur Tunisie, lubrifiants automobiles Tunis, eau lave-glace Tunisie, huile moteur Tunis, Polyoil Tunis, produits automobiles Tunisie"
        canonicalUrl={pageUrl}
        schema={organizationSchema}
      />
      <Header onRequestQuote={() => openQuoteForm(null)} />
      <main>
        <Hero />
        <Products onRequestQuote={openQuoteForm} />
        <Mission />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <QuoteFormModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        product={productForQuote}
      />
    </div>
  );
}

