# 🔒 Guide de Sécurité - Gestion des Secrets

## ✅ Ce qui a été fait

1. ✅ `.gitignore` mis à jour pour ignorer les fichiers `.env`
2. ✅ Fichiers `.env` et `.env.production` supprimés du cache git
3. ✅ Historique git nettoyé (32 commits filtrés)
4. ✅ Modifications pushées sur GitHub

---

## 🚨 IMPORTANT : Régénérer les Secrets

**Tous les secrets dans vos fichiers `.env` publiés sont maintenant COMPROMIS !**

Vous DEVEZ régénérer :

### **Backend - Back/.env.production**

```bash
# 1. Générer une nouvelle JWT_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Copier le résultat et l'utiliser pour JWT_SECRET
```

Changements obligatoires :
- [ ] `JWT_SECRET` - nouvelle clé générée
- [ ] `SMTP_PASS` - changer le mot de passe Gmail  
- [ ] `RESEND_API_KEY` - régénérer une nouvelle clé
- [ ] `DEEPL_API_KEY` - si utilisé, obtenir une nouvelle clé

### **Frontend - Front/.env.local** (pour le développement)

```bash
VITE_API_URL=http://localhost:4000
VITE_SITE_URL=https://votre-site.netlify.app
```

Aucune clé secrète ne doit être dans le frontend.

---

## 📋 Organisation des fichiers

```
Poly-Oil-HR/
├── .gitignore                    ← Ignore .env*
├── .gitattributes               ← (optionnel) Sécurité supplémentaire
│
├── Back/
│   ├── .env                      ← 🚫 LOCAL ONLY (pas commité)
│   ├── .env.production           ← 🚫 LOCAL ONLY (pas commité)
│   ├── .env.example              ← ✅ COMMITER (template sans secrets)
│   ├── server.js
│   └── src/
│
├── Front/
│   ├── .env.local                ← 🚫 LOCAL ONLY (pas commité)
│   ├── .env.example              ← ✅ COMMITER (template)
│   ├── package.json
│   └── src/
```

---

## 🔐 Workflow de Développement

### **1️⃣ Quand vous clonez le repo**

```bash
git clone https://github.com/eyanft/Poly-Oil-HR.git
cd Poly-Oil-HR

# Frontend
cp Front/.env.example Front/.env.local
# Éditer Front/.env.local (ajouter API_URL)

# Backend  
cp Back/.env.example Back/.env
# Éditer Back/.env (ajouter clés de production)
```

### **2️⃣ Jamais commiter ces fichiers**

```bash
# ✅ BON
git add src/ package.json
git commit -m "Add new feature"

# ❌ MAUVAIS - Ne jamais faire ça !
git add .env .env.production .env.local
```

### **3️⃣ Pour partager les secrets avec l'équipe**

❌ **NE PAS** : Les passer sur Slack, Discord, ou GitHub

✅ **OUI** :
1. Utiliser un gestionnaire de secrets (1Password, Vault, etc.)
2. Les passer en personne/appel vocal
3. Les ajouter directement sur Netlify/Render (dashboard)

---

## 🛡️ Configuration Supplémentaire de Sécurité

### Créer un `.gitattributes` pour la double protection :

```bash
# Back/.env.production filter=git-crypt diff=git-crypt
# Back/.env filter=git-crypt diff=git-crypt
# Front/.env.local filter=git-crypt diff=git-crypt
```

(Nécessite `git-crypt` installé)

---

## 📝 Checklist à faire maintenant

- [ ] Vérifier que GitHub n'affiche plus `.env` ou `.env.production`
  - Aller sur https://github.com/eyanft/Poly-Oil-HR/
  - Vérifier tous les fichiers/branches
  
- [ ] Créer les fichiers `.env` en local :
  ```bash
  cp Back/.env.example Back/.env
  cp Back/.env.example Back/.env.production
  cp Front/.env.example Front/.env.local
  ```

- [ ] Remplir avec les secrets :
  ```bash
  Back/.env              ← Pour développement local
  Back/.env.production   ← Pour production (Render)
  Front/.env.local       ← Pour développement local
  ```

- [ ] Régénérer JWT_SECRET, API keys, etc.

- [ ] Mettre à jour Render/Netlify :
  - Render Dashboard → Environment → Ajouter nouvelles clés
  - Netlify Dashboard → Build & deploy → Environment

- [ ] Redéployer :
  ```bash
  git push origin main  # Render redéploiera automatiquement
  # Netlify → Redeploy → Force publish
  ```

---

## 🔄 Workflow Production (Netlify + Render)

```
┌─────────────────┐
│  Local Machine  │
│  .env (secret)  │
└────────┬────────┘
         │ git push
         ↓
    ┌─────────────────┐
    │  GitHub (public)│
    │ .env.example    │ ← Pas de secrets
    └─────────────────┘
         │
    ┌────┴────┐
    ↓         ↓
┌────────────────┐  ┌──────────────┐
│ Netlify        │  │ Render       │
│ Frontend       │  │ Backend      │
│ Vars →env vars │  │ Vars →env    │
└────────────────┘  └──────────────┘
```

**Secrets** = Uniquement sur Netlify/Render, JAMAIS sur GitHub

---

## 🚨 Si cela se reproduit

```bash
# 1. Identifier le fichier exposé
git log --all --full-history -- "path/to/secret.env"

# 2. Nettoyer l'historique
git filter-branch --tree-filter 'rm -f path/to/secret.env' -- --all

# 3. Forcer le push
git push origin main --force

# 4. Régénérer les secrets
# Générer de nouvelles clés API, JWT, etc.

# 5. Mettre à jour Netlify/Render
```

---

## 📚 Ressources

- [GitHub - Removing sensitive data](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)
- [Gitignore - Secrets](https://github.com/github/gitignore/blob/main/Global/JetBrains.gitignore)
- [OWASP - Secrets Management](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)

---

**✅ Status**: Historique git nettoyé et sécurisé
**⏰ Urgence**: Régénérer les secrets dans les 24h
**📌 À retenir**: Jamais `.env` ou `.env.production` dans GitHub
