import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import logo from '../assets/po.png';
import LanguageSelector from './LanguageSelector';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

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
            <img src={logo} alt="Poly Oil Logo" className="h-12 w-auto" />
          </div>

          <nav className="hidden lg:flex items-center space-x-8">
            <button onClick={() => scrollToSection('accueil')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              {t('header.home')}
            </button>
            <button onClick={() => scrollToSection('produits')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              {t('header.products')}
            </button>
           
            <button onClick={() => scrollToSection('mission')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              {t('header.mission')}
            </button>
            <button onClick={() => scrollToSection('blog')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              {t('header.blog')}
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              {t('header.contact')}
            </button>
          
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <LanguageSelector />
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-to-r from-blue-600 to-red-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 font-medium"
            >
              {t('header.requestQuote')}
            </button>
          </div>

          <button
            className="lg:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 flex flex-col space-y-3">
            <button onClick={() => scrollToSection('accueil')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-left">
              {t('header.home')}
            </button>
            <button onClick={() => scrollToSection('produits')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-left">
              {t('header.products')}
            </button>
           
            <button onClick={() => scrollToSection('mission')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-left">
              {t('header.mission')}
            </button>
            <button onClick={() => scrollToSection('blog')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-left">
              {t('header.blog')}
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-left">
              {t('header.contact')}
            </button>
            <button onClick={goToAdmin} className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-left">
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
