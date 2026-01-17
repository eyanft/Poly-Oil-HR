import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import logo from '../assets/po.png';
import LanguageSelector from './LanguageSelector';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const goToAdmin = () => {
    setIsMenuOpen(false);
    navigate('/admin');
  };

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Poly Oil Logo" className="h-12 w-auto" width="48" height="48" />
          </div>

          <nav className={`hidden lg:flex items-center ${i18n.language === 'ar' ? 'space-x-reverse space-x-8' : 'space-x-8'}`} aria-label={t('header.navigation')}>
            <button onClick={() => scrollToSection('accueil')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium" aria-label={t('header.home')}>
              {t('header.home')}
            </button>
            <button onClick={() => scrollToSection('produits')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium" aria-label={t('header.products')}>
              {t('header.products')}
            </button>
           
            <button onClick={() => scrollToSection('mission')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium" aria-label={t('header.mission')}>
              {t('header.mission')}
            </button>
            <button onClick={() => scrollToSection('blog')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium" aria-label={t('header.blog')}>
              {t('header.blog')}
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium" aria-label={t('header.contact')}>
              {t('header.contact')}
            </button>
          
          </nav>

          <div className={`hidden lg:flex items-center ${i18n.language === 'ar' ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
            <LanguageSelector />
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-to-r from-blue-600 to-red-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 font-medium"
              aria-label={t('header.requestQuote')}
            >
              {t('header.requestQuote')}
            </button>
          </div>

          <button
            className="lg:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? t('common.close') : t('header.menu')}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 flex flex-col space-y-3" aria-label={t('header.mobileNavigation')}>
            <button onClick={() => scrollToSection('accueil')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-left" aria-label={t('header.home')}>
              {t('header.home')}
            </button>
            <button onClick={() => scrollToSection('produits')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-left" aria-label={t('header.products')}>
              {t('header.products')}
            </button>
           
            <button onClick={() => scrollToSection('mission')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-left" aria-label={t('header.mission')}>
              {t('header.mission')}
            </button>
            <button onClick={() => scrollToSection('blog')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-left" aria-label={t('header.blog')}>
              {t('header.blog')}
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-left" aria-label={t('header.contact')}>
              {t('header.contact')}
            </button>
            <button onClick={goToAdmin} className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-left" aria-label={t('header.admin')}>
              {t('header.admin')}
            </button>
            <div className="flex items-center space-x-3">
              <LanguageSelector />
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-gradient-to-r from-blue-600 to-red-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 font-medium"
              >
                {t('header.requestQuote')}
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
