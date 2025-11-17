const translations = {
  fr: {
    errors: {
      generic: 'Une erreur s\'est produite',
      network: 'Erreur de connexion',
      notFound: 'Ressource non trouvée',
      unauthorized: 'Non autorisé',
      forbidden: 'Accès interdit',
      validation: 'Erreur de validation',
      server: 'Erreur serveur',
    },
    auth: {
      emailRequired: 'L\'email et le mot de passe sont requis',
      invalidCredentials: 'Identifiants invalides',
      adminExists: 'L\'administrateur existe déjà',
      registrationFailed: 'Échec de l\'inscription',
      loginFailed: 'Échec de la connexion',
      noRefreshToken: 'Aucun token de rafraîchissement',
      invalidRefreshToken: 'Token de rafraîchissement invalide',
    },
    products: {
      fetchFailed: 'Impossible de récupérer les produits',
      notFound: 'Produit non trouvé',
      createFailed: 'Impossible de créer le produit',
      updateFailed: 'Impossible de mettre à jour le produit',
      deleteFailed: 'Impossible de supprimer le produit',
      validationError: 'Erreur de validation',
    },
  },
  en: {
    errors: {
      generic: 'An error occurred',
      network: 'Connection error',
      notFound: 'Resource not found',
      unauthorized: 'Unauthorized',
      forbidden: 'Access forbidden',
      validation: 'Validation error',
      server: 'Server error',
    },
    auth: {
      emailRequired: 'Email and password are required',
      invalidCredentials: 'Invalid credentials',
      adminExists: 'Admin already exists',
      registrationFailed: 'Registration failed',
      loginFailed: 'Login failed',
      noRefreshToken: 'No refresh token',
      invalidRefreshToken: 'Invalid refresh token',
    },
    products: {
      fetchFailed: 'Failed to fetch products',
      notFound: 'Product not found',
      createFailed: 'Failed to create product',
      updateFailed: 'Failed to update product',
      deleteFailed: 'Failed to delete product',
      validationError: 'Validation error',
    },
  },
  ar: {
    errors: {
      generic: 'حدث خطأ',
      network: 'خطأ في الاتصال',
      notFound: 'المورد غير موجود',
      unauthorized: 'غير مصرح',
      forbidden: 'الوصول محظور',
      validation: 'خطأ في التحقق',
      server: 'خطأ في الخادم',
    },
    auth: {
      emailRequired: 'البريد الإلكتروني وكلمة المرور مطلوبان',
      invalidCredentials: 'بيانات اعتماد غير صحيحة',
      adminExists: 'المسؤول موجود بالفعل',
      registrationFailed: 'فشل التسجيل',
      loginFailed: 'فشل تسجيل الدخول',
      noRefreshToken: 'لا يوجد رمز تحديث',
      invalidRefreshToken: 'رمز تحديث غير صالح',
    },
    products: {
      fetchFailed: 'فشل جلب المنتجات',
      notFound: 'المنتج غير موجود',
      createFailed: 'فشل إنشاء المنتج',
      updateFailed: 'فشل تحديث المنتج',
      deleteFailed: 'فشل حذف المنتج',
      validationError: 'خطأ في التحقق',
    },
  },
};

function getLanguage(req) {
  // Check Accept-Language header
  const acceptLanguage = req.headers['accept-language'];
  if (acceptLanguage) {
    if (acceptLanguage.includes('ar')) return 'ar';
    if (acceptLanguage.includes('en')) return 'en';
    if (acceptLanguage.includes('fr')) return 'fr';
  }
  
  // Check query parameter
  if (req.query?.lang) {
    const lang = req.query.lang.toLowerCase();
    if (['fr', 'en', 'ar'].includes(lang)) return lang;
  }
  
  // Default to French
  return 'fr';
}

function translate(req, key, defaultValue = '') {
  const lang = getLanguage(req);
  const keys = key.split('.');
  let value = translations[lang];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return defaultValue || key;
    }
  }
  
  return value || defaultValue || key;
}

export { translate, getLanguage, translations };

