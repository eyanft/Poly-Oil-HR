import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { FR, GB, TN } from 'country-flag-icons/react/3x2';

const languages = [
  { code: 'fr', name: 'Français', Flag: FR },
  { code: 'en', name: 'English', Flag: GB },
  { code: 'ar', name: 'العربية', Flag: TN },
];

// Helper to get opposite direction class
function getDirectionClass(lang: string) {
  return lang === 'ar' ? 'rtl' : 'ltr';
}

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
    // Update HTML dir attribute for RTL languages
    if (langCode === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', langCode);
    }
  };

  // Set initial direction
  useEffect(() => {
    if (i18n.language === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', i18n.language);
    }
  }, [i18n.language]);

  const CurrentFlag = currentLanguage.Flag;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors ${i18n.language === 'ar' ? 'space-x-reverse space-x-2 flex-row-reverse' : 'space-x-2'}`}
        aria-label="Change language"
      >
        <CurrentFlag className="w-6 h-4 rounded-sm object-cover" />
        <span className="hidden sm:inline text-sm font-medium text-gray-700">
          {currentLanguage.name}
        </span>
        <Globe className="h-4 w-4 text-gray-600" />
      </button>

      {isOpen && (
        <div className={`absolute mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 ${i18n.language === 'ar' ? 'left-0' : 'right-0'}`}>
          <div className="py-1">
            {languages.map((lang) => {
              const LangFlag = lang.Flag;
              return (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full flex items-center px-4 py-2 hover:bg-gray-100 transition-colors ${
                    i18n.language === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                  } ${i18n.language === 'ar' ? 'space-x-reverse space-x-3 flex-row-reverse text-right' : 'space-x-3 text-left'}`}
                >
                  <LangFlag className="w-6 h-4 rounded-sm object-cover" />
                  <span className="font-medium">{lang.name}</span>
                  {i18n.language === lang.code && (
                    <span className={i18n.language === 'ar' ? 'mr-auto text-blue-600' : 'ml-auto text-blue-600'}>✓</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

