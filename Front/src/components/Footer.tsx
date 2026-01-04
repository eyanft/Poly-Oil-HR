import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import logo from '../assets/po.png';

export default function Footer() {
  const { t, i18n } = useTranslation();
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <img src={logo} alt="Poly Oil Logo" className="h-16 w-auto mb-4" />
            <p className="text-gray-300 text-sm">
              {t('footer.description')}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => scrollToSection('accueil')} className="text-gray-300 hover:text-white transition-colors">
                  {t('header.home')}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('produits')} className="text-gray-300 hover:text-white transition-colors">
                  {t('header.products')}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('blog')} className="text-gray-300 hover:text-white transition-colors">
                  {t('header.blog')}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-white transition-colors">
                  {t('header.contact')}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer.categories')}</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>{t('footer.engineOil')}</li>
              <li>{t('footer.brakeFluid')}</li>
              <li>{t('footer.washerFluid')}</li>
              <li>{t('footer.industrialGrease')}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer.followUs')}</h3>
            <div className={`flex ${i18n.language === 'ar' ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
              <a
                href="#"
                className="bg-white/10 hover:bg-blue-600 p-3 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-white/10 hover:bg-pink-600 p-3 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-white/10 hover:bg-blue-500 p-3 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Poly Oil Plus. {t('footer.copyright')} | {t('footer.legal')}
          </p>
        </div>
      </div>
    </footer>
  );
}
