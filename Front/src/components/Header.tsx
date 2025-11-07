import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/po.png';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

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
              Accueil
            </button>
            <button onClick={() => scrollToSection('produits')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Produits
            </button>
           
            <button onClick={() => scrollToSection('mission')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Mission & Vision
            </button>
            <button onClick={() => scrollToSection('blog')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Blog
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Contact
            </button>
          
          </nav>

          <button
            onClick={() => scrollToSection('contact')}
            className="hidden lg:block bg-gradient-to-r from-blue-600 to-red-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 font-medium"
          >
            Demander un devis
          </button>

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
              Accueil
            </button>
            <button onClick={() => scrollToSection('produits')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-left">
              Produits
            </button>
           
            <button onClick={() => scrollToSection('mission')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-left">
              Mission & Vision
            </button>
            <button onClick={() => scrollToSection('blog')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-left">
              Blog
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-left">
              Contact
            </button>
            <button onClick={goToAdmin} className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-left">
              Espace Admin
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-to-r from-blue-600 to-red-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 font-medium"
            >
              Demander un devis
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
