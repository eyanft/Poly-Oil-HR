# ✅ Sécurité - Checklist Finale

## 🎯 Status Actuel

```
✅ FAIT:
- Historique git nettoyé (tous les commits filtrés)
- Fichiers .env supprimés du repo
- .gitignore mis à jour
- GitHub push complété avec force update

⚠️ À FAIRE MAINTENANT:
- Régénérer les secrets
- Mettre à jour Netlify/Render
- Redéployer l'application
```

---

## 🔐 Secrets à Régénérer Maintenant

### Option 1 : Générer via Terminal (Node.js)

```bash
# Ouvrir PowerShell dans Back/
cd Back

# Générer JWT_SECRET
node -e "console.log('JWT_SECRET=' + require('crypto').randomBytes(32).toString('hex'))"

# Résultat example:
# JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6r7s8t9u0v1w2x3y4z5...
```

### Option 2 : Utiliser OpenSSL

```bash
openssl rand -hex 32
# Résultat: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6...
```

---

## 📝 Secrets à Changer

### **1. JWT_SECRET** (OBLIGATOIRE)
```bash
# Nouveau secret généré ci-dessus
# Remplacer dans:
# - Back/.env.production
# - Back/.env (développement)
```

### **2. SMTP_PASS** (Gmail)
```
1. Aller sur myaccount.google.com
2. Sécurité → Mots de passe d'application
3. Sélectionner "Courrier" et "Windows"
4. Google génère une clé (16 caractères)
5. Copier et coller dans:
   - Back/.env.production
   - Back/.env (dev)
```

### **3. RESEND_API_KEY** (Service Email)
```
1. Aller sur resend.com
2. Dashboard → API Keys
3. Générer une nouvelle clé (supprimer l'ancienne)
4. Copier et coller dans Back/.env.production
```

### **4. DEEPL_API_KEY** (Traduction - si utilisé)
```
1. Aller sur deepl.com/pro
2. Account → API Keys
3. Générer une nouvelle clé
4. Copier et coller dans Back/.env.production
```

---

## 🌐 Mettre à Jour Netlify (Frontend)

1. Aller sur https://app.netlify.com
2. Sélectionner votre site
3. **Site settings** → **Build & deploy** → **Environment**
4. Éditer ou ajouter :
   ```
   VITE_API_URL=https://votre-api.onrender.com
   VITE_SITE_URL=https://votre-site.netlify.app
   ```
5. Sauvegarder
6. Aller à **Deploys** → **Trigger deploy** → **Deploy site**

---

## 🔧 Mettre à Jour Render (Backend)

1. Aller sur https://dashboard.render.com
2. Sélectionner votre service backend
3. **Environment** → Éditer les variables existantes :
   ```
   JWT_SECRET=<nouvelle clé générée>
   SMTP_PASS=<nouveau mot de passe Google>
   RESEND_API_KEY=<nouvelle clé>
   ```
4. Cliquer **Deploy**
5. Attendre que le déploiement se termine

---

## 📋 Checklist de Validation

- [ ] JWT_SECRET régénérée
- [ ] SMTP_PASS changé dans Gmail
- [ ] RESEND_API_KEY renouvelée
- [ ] DEEPL_API_KEY renouvelée (si applicable)
- [ ] Back/.env mis à jour localement
- [ ] Back/.env.production mis à jour localement
- [ ] Netlify environment variables mises à jour
- [ ] Render environment variables mises à jour
- [ ] Netlify redéployé avec succès
- [ ] Render redéployé avec succès
- [ ] Test : Frontend peut contacter Backend
- [ ] Test : Les emails fonctionnent
- [ ] Test : La traduction fonctionne

---

## 🧪 Tests de Vérification

### **Test 1 : Vérifier GitHub**
```bash
# Aller sur https://github.com/eyanft/Poly-Oil-HR
# Chercher des fichiers .env → Ne doit PAS en avoir
# Vérifier l'historique git → Pas de secrets visibles
```

### **Test 2 : Vérifier l'API locale**
```bash
cd Back
npm start

# Vérifier les logs → Pas d'erreur JWT
```

### **Test 3 : Vérifier l'email**
```bash
# Envoyer une quote de test
# Vérifier que l'email arrive

# Si erreur → Vérifier SMTP_PASS et RESEND_API_KEY
```

### **Test 4 : Vérifier la traduction**
```bash
# Tester la traduction d'un produit
# Doit afficher les 3 langues (AR, EN, FR)
```

---

## 🆘 En Cas de Problème

### **"CORS error" après redéploiement**
```
Cause: CLIENT_ORIGIN ancien
Solution:
1. Render → Copier l'URL du service
2. Back/.env.production → CLIENT_ORIGIN = URL Render
3. Netlify → Ajouter VITE_API_URL = URL Render
4. Redéployer
```

### **"Unauthorized" erreur JWT**
```
Cause: JWT_SECRET mismatch
Solution:
1. Générer nouveau JWT_SECRET
2. Mettre à jour Render
3. Redéployer Render
4. Redéployer Netlify
```

### **Email ne fonctionne pas**
```
Cause: SMTP_PASS ou RESEND_API_KEY invalide
Solution:
1. Vérifier mot de passe Google
2. Créer nouvelle clé Resend
3. Mettre à jour Render
4. Redéployer
```

---

## 📊 Résumé des Actions

| Action | Statut | Deadline |
|--------|--------|----------|
| Nettoyer historique git | ✅ Fait | - |
| Régénérer JWT_SECRET | ⏳ À faire | **Immédiat** |
| Changer SMTP_PASS | ⏳ À faire | **Immédiat** |
| Renouveler RESEND_API_KEY | ⏳ À faire | **Immédiat** |
| Mettre à jour Render | ⏳ À faire | **Immédiat** |
| Mettre à jour Netlify | ⏳ À faire | **Immédiat** |
| Redéployer | ⏳ À faire | **Immédiat** |
| Tests de vérification | ⏳ À faire | **Avant production** |

---

## 🎉 Une fois terminé

Votre application sera **100% sécurisée** avec :
- ✅ Pas de secrets dans GitHub
- ✅ Historique nettoyé
- ✅ Secrets régénérés
- ✅ Production configurée correctement
- ✅ Tests validés

**Besoin d'aide ?** Consultez [SECURITY_GUIDE.md](./SECURITY_GUIDE.md)
