# 🚀 Quick Start - Déploiement Rapide

## Option 1 : Déploiement avec Netlify + Render (5-15 minutes)

### Étape 1: Préparer le code
```bash
# À la racine du projet
git add .
git commit -m "Préparation déploiement"
git push origin main
```

### Étape 2: Déployer Frontend (Netlify)
1. https://app.netlify.com/signup
2. "Import an existing project" → Sélectionner votre GitHub repo
3. Build command: `npm run build`
4. Publish directory: `Front/dist`
5. Base directory: `Front`
6. Deploy !

### Étape 3: Déployer Backend (Render)
1. https://render.com/signup
2. "New Web Service" → Sélectionner votre repo
3. Configuration :
   - Runtime: Node
   - Build command: `npm install`
   - Start command: `node server.js`
   - Base directory: `Back`
4. Ajouter les variables d'environnement (.env.production)
5. Deploy !

### Étape 4: Connecter Frontend ↔ Backend
1. Copier l'URL du backend Render (ex: https://poly-oil-api.onrender.com)
2. Netlify → Environment → Ajouter variable `VITE_API_URL`
3. Redéployer (ou `git push`)

### Étape 5: Soumettre à Google
1. https://search.google.com/search-console
2. Add property → Votre domaine Netlify
3. Vérifier (DNS ou HTML)
4. Sitemaps → Ajouter `/sitemap.xml`
5. URL Inspection → Soumettre vos pages
6. Attendre 2-4 semaines pour indexation

---

## 📋 Checklist Déploiement

- [ ] Code commité et pusé sur GitHub
- [ ] `.env` local contient les bonnes variables
- [ ] `npm run build` fonctionne sans erreur
- [ ] `npm run generate:sitemap` généré
- [ ] Compte Netlify créé
- [ ] Compte Render créé
- [ ] Frontend déployé sur Netlify
- [ ] Backend déployé sur Render
- [ ] VITE_API_URL pointée vers backend Render
- [ ] Google Search Console setup
- [ ] Sitemap soumis à Google

---

## 🔗 URLs Importantes

- **Netlify Dashboard**: https://app.netlify.com
- **Render Dashboard**: https://dashboard.render.com
- **Google Search Console**: https://search.google.com/search-console
- **Google PageSpeed**: https://pagespeed.web.dev

---

## 🆘 Aide Rapide

### Erreur CORS
```
→ Vérifier CLIENT_ORIGIN dans .env du backend
→ Redéployer backend
```

### Sitemap non visible
```
→ Vérifier npm run generate:sitemap
→ Vérifier dans GSC que le sitemap est valide
```

### Backend timeout
```
→ Créer un endpoint /api/health
→ Vérifier les logs dans Render
```

### MongoDB connection error
```
→ Vérifier MONGODB_URI dans .env.production
→ Vérifier IP whitelist sur MongoDB Atlas
```

---

## 📊 URLs de Production

**Frontend** (après déploiement Netlify):
- https://votre-site.netlify.app

**Backend** (après déploiement Render):
- https://poly-oil-api.onrender.com

**Domaine personnalisé** (optionnel):
- https://www.votre-domaine.com

---

## 📱 Contact & Support

- **Netlify Docs**: https://docs.netlify.com
- **Render Docs**: https://render.com/docs
- **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas

Besoin d'aide ? Consultez [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) pour plus de détails !
