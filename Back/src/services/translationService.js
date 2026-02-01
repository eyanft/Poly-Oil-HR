import axios from 'axios';

const MYMEMORY_API = 'https://api.mymemory.translated.net/get';
const DEEPL_API = 'https://api-free.deepl.com/v1/translate';
const TRANSLATION_API = process.env.TRANSLATION_API || 'mymemory';

/**
 * Traduit un texte avec MyMemory API (gratuit, 1000 req/jour)
 */
const translateWithMyMemory = async (text, targetLanguage) => {
  const langMap = { en: 'en-US', ar: 'ar-SA', fr: 'fr-FR' };
  const targetLang = langMap[targetLanguage] || targetLanguage;
  const sourceLang = 'fr-FR';

  try {
    const response = await axios.get(MYMEMORY_API, {
      params: {
        q: text,
        langpair: `${sourceLang}|${targetLang}`,
      },
      timeout: 5000,
    });

    if (response.data?.responseStatus === 200) {
      const translatedText = response.data.responseData.translatedText;
      if (translatedText && translatedText.length > 0) {
        return translatedText;
      }
    }

    console.warn(`MyMemory API réponse inattendue pour ${targetLanguage}`);
    return text;
  } catch (error) {
    console.error(`MyMemory API erreur (${targetLanguage}):`, error.message);
    return text;
  }
};

/**
 * Traduit un texte avec DeepL API Free (plus précis, 500k caractères/mois)
 */
const translateWithDeepL = async (text, targetLanguage) => {
  const langMap = {
    en: 'EN-US',
    ar: 'AR', // DeepL n'a pas d'arabe - fallback à MyMemory
    fr: 'FR',
  };

  // DeepL ne supporte pas l'arabe
  if (targetLanguage === 'ar') {
    console.log("DeepL ne supporte pas l'arabe, utilisation de MyMemory");
    return await translateWithMyMemory(text, targetLanguage);
  }

  if (!langMap[targetLanguage]) {
    return text;
  }

  try {
    const response = await axios.post(
      DEEPL_API,
      {
        text: [text],
        target_lang: langMap[targetLanguage],
        source_lang: 'FR',
      },
      {
        headers: {
          Authorization: `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
        },
        timeout: 5000,
      },
    );

    if (response.data?.translations?.[0]?.text) {
      return response.data.translations[0].text;
    }

    console.warn(`DeepL réponse inattendue pour ${targetLanguage}`);
    return text;
  } catch (error) {
    console.error(`DeepL API erreur (${targetLanguage}):`, error.message);
    // Fallback à MyMemory
    return await translateWithMyMemory(text, targetLanguage);
  }
};

/**
 * Traduit un texte vers une langue cible
 * Utilise MyMemory API par défaut (gratuit et sans clé)
 * Peut utiliser DeepL si configuré (plus précis)
 */
export const translateText = async (text, targetLanguage) => {
  if (!text || text.trim().length === 0) {
    return text;
  }

  try {
    if (TRANSLATION_API === 'deepl' && process.env.DEEPL_API_KEY) {
      return await translateWithDeepL(text, targetLanguage);
    }
    // MyMemory est le défaut (gratuit et sans clé API)
    return await translateWithMyMemory(text, targetLanguage);
  } catch (error) {
    console.error(`Erreur lors de la traduction vers ${targetLanguage}:`, error.message);
    return text;
  }
};

/**
 * Traduit un array de textes
 */
export const translateArray = async (texts, targetLanguage) => {
  if (!Array.isArray(texts) || texts.length === 0) {
    return [];
  }

  try {
    const translations = await Promise.all(texts.map(text => translateText(text, targetLanguage)));
    return translations;
  } catch (error) {
    console.error(`Erreur lors de la traduction du tableau vers ${targetLanguage}:`, error.message);
    return texts;
  }
};

/**
 * Traduit les données de produit (description, spécifications, features)
 */
export const translateProductData = async (description, specifications, features, targetLanguage) => {
  try {
    const [translatedDescription, translatedSpecs, translatedFeatures] = await Promise.all([
      translateText(description, targetLanguage),
      translateArray(specifications || [], targetLanguage),
      translateArray(features || [], targetLanguage),
    ]);

    return {
      description: translatedDescription,
      specifications: translatedSpecs,
      features: translatedFeatures,
    };
  } catch (error) {
    console.error(`Erreur lors de la traduction des données produit (${targetLanguage}):`, error.message);
    return {
      description,
      specifications,
      features,
    };
  }
};
