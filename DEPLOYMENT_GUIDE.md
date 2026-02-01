# 📋 Guide Complet de Déploiement - Poly Oil HR

## 🚀 Phase 1 : Préparation Locale

### Frontend (Vite + React)

1. **Installer les dépendances** :
```bash
cd Front
npm install
```

2. **Générer le sitemap.xml** (recommandé avant chaque build) :
```bash
npm run generate:sitemap
```

3. **Tester le build** :
```bash
npm run build
```
Vérifier qu'aucune erreur n'apparaît et que le dossier `dist/` est créé.

4. **Variables d'environnement** (créer un fichier `.env.local`) :
```
VITE_API_URL=http://localhost:4000
VITE_SITE_URL=https://votre-site.netlify.app
VITE_GOOGLE_SITE_VERIFICATION=xxxxx
```

### Backend (Node.js + Express)

1. **Installer les dépendances** :
```bash
cd Back
npm install
```

2. **Vérifier les variables .env** :
- PORT : 4000
- MONGODB_URI : Votre connexion MongoDB
- CLIENT_ORIGIN : URL de votre frontend
- JWT_SECRET : Changé en production
- Email config : SMTP_USER, SMTP_PASS

3. **Tester localement** :
```bash
npm start
# ou
node server.js
```

---

## ☁️ Phase 2 : Déploiement Frontend - Netlify (GRATUIT)

### Étape 1 : Préparer votre projet

```bash
# À la racine du projet
git add .
git commit -m "Préparation pour déploiement"
git push origin main
```

### Étape 2 : Créer un compte Netlify

1. Aller sur https://netlify.com
2. Créer un compte (gratuit) avec GitHub
3. Autoriser Netlify à accéder à vos repos GitHub

### Étape 3 : Créer le site

1. **Dashboard Netlify** → "Add new site" → "Import an existing project"
2. Sélectionner votre repo GitHub
3. **Configuration du build** :
   - Build command: `npm run build`
   - Publish directory: `Front/dist`
   - Base directory: `Front`

4. **Variables d'environnement** (Netlify Dashboard → Site settings → Build & deploy → Environment) :
```
VITE_API_URL=https://votre-api-backend.com
VITE_SITE_URL=https://votre-site.netlify.app
VITE_GOOGLE_SITE_VERIFICATION=xxxxx
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

5. **Redéployer** : Netlify recompile automatiquement à chaque push sur `main`

### Étape 4 : Configurer un domaine personnalisé (optionnel)

1. Netlify → Domain management → Add custom domain
2. Mettre à jour vos DNS (Namecheap, Google Domains, OVH, etc.)
3. Attendre la propagation DNS (quelques heures)

---

## 🔧 Phase 3 : Déploiement Backend - Render ou Railway (GRATUIT)

### Option A : Render (Recommandé)

1. Aller sur https://render.com
2. Créer un compte avec GitHub
3. Dashboard → New → Web Service
4. Sélectionner votre repo GitHub
5. **Configuration** :
   - Name: `poly-oil-api`
   - Runtime: `Node`
   - Build command: `npm install`
   - Start command: `node server.js`
   - Region: Europe (Frankfurt) pour moins de latence

6. **Environment Variables** (ajouter directement dans Render) :
```
PORT=4000
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/poly_oil_hr
CLIENT_ORIGIN=https://votre-site.netlify.app
JWT_SECRET=GenerateUniqueLongStringHere123456789
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
QUOTE_EMAIL=your-email@example.com
RESEND_API_KEY=re_xxxxx
TRANSLATION_API=mymemory
```

7. Créer le service → Attendre le déploiement
8. Copier l'URL de votre API (ex: `https://poly-oil-api.onrender.com`)

### Option B : Railway

1. Aller sur https://railway.app
2. Créer un compte avec GitHub
3. New Project → GitHub repo
4. Sélectionner le dossier `Back`
5. Ajouter les variables d'environnement
6. Déployer automatiquement

---

## 📡 Phase 4 : Mise à jour Backend URL dans Frontend

Après le déploiement du backend, mettre à jour Netlify avec la nouvelle URL :

1. **Netlify Dashboard** → Site settings → Build & deploy → Environment
2. Modifier `VITE_API_URL` → `https://votre-api-backend.onrender.com`
3. Redéployer le frontend (ou le faire redéployer via `git push`)

---

## 🔍 Phase 5 : Configuration SEO pour Google

### 1. Générer/Vérifier le Sitemap

```bash
# Frontend
npm run generate:sitemap
# Sitemap généré: Front/public/sitemap.xml
```

### 2. Google Search Console

1. Aller sur https://search.google.com/search-console
2. Créer un compte / Se connecter
3. **Ajouter votre domaine** (ex: votre-site.netlify.app ou votre-domaine.com)
4. **Vérifier la propriété** :
   - Télécharger le fichier HTML
   - Placer dans `Front/public/`
   - Ou ajouter un enregistrement DNS

5. **Soumettre le sitemap** :
   - Sitemaps → Ajouter un sitemap
   - Entrer: `/sitemap.xml`

6. **Inspecter les pages** :
   - URL Inspection → Entrer votre URL
   - Cliquer "Request indexing"

### 3. Améliorer le SEO

Fichiers essentiels déjà présents ✅ :
- `Front/public/sitemap.xml`
- `Front/public/robots.txt`
- `Front/src/components/SEO.tsx`

À ajouter (optionnel) :
- **robots.txt** - À vérifier :
```
User-agent: *
Allow: /
Disallow: /admin
Sitemap: https://votre-site.netlify.app/sitemap.xml
```

---

## 📊 Phase 6 : Monitoring et Maintenance

### Vérifier les performances :

1. **Google PageSpeed Insights** : https://pagespeed.web.dev
2. **Google Search Console** : Indexation et erreurs
3. **Render/Railway Dashboard** : Statut du backend
4. **Netlify Analytics** : Trafic du site

### Logs et Debugging :

**Backend Render/Railway** :
- Dashboard → Logs (pour les erreurs)

**Frontend Netlify** :
- Netlify → Deploys → Logs (build et deploy)

---

## 🔒 Checklist de Sécurité - Production

- [ ] JWT_SECRET généré aléatoirement (pas le même que dev)
- [ ] CORS correctement configuré (CLIENT_ORIGIN = frontend URL)
- [ ] HTTPS activé (Netlify/Render le font par défaut)
- [ ] Variables sensibles jamais dans `.env` commité (utiliser `.env.example`)
- [ ] MongoDB authentification configurée
- [ ] Rate limiting sur l'API (middleware)
- [ ] Validation des inputs sur le backend

---

## 🆘 Dépannage Courant

### "CORS error" après déploiement
→ Vérifier `CLIENT_ORIGIN` dans `.env` du backend

### Sitemap non indexé par Google
→ Vérifier dans Google Search Console si le sitemap est valide

### Backend timeout sur Render
→ Vérifier les logs, augmenter les ressources (version payante)

### Images ne s'affichent pas en production
→ Vérifier les chemins des images, utiliser des URLs absolues

---

## 📅 Timeline estimée

- **Déploiement Frontend Netlify** : 5-10 min
- **Déploiement Backend Render** : 5-10 min
- **Indexation Google** : 2-4 semaines
- **Première page de résultats** : Selon la concurrence

Bon déploiement! 🎉
