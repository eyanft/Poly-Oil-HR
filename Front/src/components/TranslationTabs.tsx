
type TranslationTabsProps = {
  currentLanguage: 'fr' | 'en' | 'ar';
  onLanguageChange: (lang: 'fr' | 'en' | 'ar') => void;
  translations?: {
    en?: {
      description: string;
      specifications: string[];
      features: string[];
    };
    ar?: {
      description: string;
      specifications: string[];
      features: string[];
    };
  };
};

export function TranslationTabs({ currentLanguage, onLanguageChange, translations }: TranslationTabsProps) {
  const languages = [
    { code: 'fr', label: 'Français', },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  ];

  return (
    <div className="flex gap-2 border-b border-gray-300 mb-4">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onLanguageChange(lang.code as 'fr' | 'en' | 'ar')}
          className={`px-4 py-2 font-semibold transition-colors ${
            currentLanguage === lang.code
              ? 'border-b-2 border-orange-500 text-orange-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {lang.flag} {lang.label}
        </button>
      ))}
    </div>
  );
}

type ProductFormFieldsProps = {
  language: 'fr' | 'en' | 'ar';
  formData: {
    name: string;
    category: string;
    description: string;
    specifications: string;
    features: string;
  };
  isTranslated?: boolean;
  onFieldChange: (field: string, value: string) => void;
  onRegenerateTranslations?: (lang: 'en' | 'ar') => void;
};

export function ProductFormFields({
  language,
  formData,
  isTranslated,
  onFieldChange,
  onRegenerateTranslations,
}: ProductFormFieldsProps) {
  const isFrench = language === 'fr';
  const isArabic = language === 'ar';

  return (
    <div className={isArabic ? 'rtl' : 'ltr'}>
      {!isFrench && (
        <button
          type="button"
          onClick={() => onRegenerateTranslations?.(language as 'en' | 'ar')}
          className="mb-4 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm flex items-center gap-2"
        >
          🔄 Régénérer la traduction
        </button>
      )}

      {isFrench && (
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nom du produit
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => onFieldChange('name', e.target.value)}
            placeholder="ex: PO-5000 20W-50"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>
      )}

      {isFrench && (
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Catégorie
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={(e) => onFieldChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          >
            <option value="">-- Sélectionner une catégorie --</option>
            <option value="Huile Moteur">Huile Moteur</option>
            <option value="Liquide de Refroidissement">Liquide de Refroidissement</option>
            <option value="Lave glace">Lave glace</option>
            <option value="Divers">Divers</option>
          </select>
        </div>
      )}

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Description
          {!isFrench && isTranslated && (
            <span className="text-xs text-green-600 ml-2">(Traduit automatiquement)</span>
          )}
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={(e) => onFieldChange('description', e.target.value)}
          placeholder="Description détaillée du produit"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 h-24"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Spécifications (une par ligne)
          {!isFrench && isTranslated && (
            <span className="text-xs text-green-600 ml-2">(Traduit automatiquement)</span>
          )}
        </label>
        <textarea
          name="specifications"
          value={formData.specifications}
          onChange={(e) => onFieldChange('specifications', e.target.value)}
          placeholder="Spec 1&#10;Spec 2&#10;Spec 3"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 h-20"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Caractéristiques (une par ligne)
          {!isFrench && isTranslated && (
            <span className="text-xs text-green-600 ml-2">(Traduit automatiquement)</span>
          )}
        </label>
        <textarea
          name="features"
          value={formData.features}
          onChange={(e) => onFieldChange('features', e.target.value)}
          placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 h-20"
        />
      </div>
    </div>
  );
}
