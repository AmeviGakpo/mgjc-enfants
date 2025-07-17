# 🚀 Déploiement MGJC Enfants sur Netlify

## 📋 Pourquoi Netlify ?

✅ **Gratuit** - Plan gratuit généreux  
✅ **Simple** - Déploiement en 2 clics  
✅ **Rapide** - CDN global  
✅ **Fiable** - Infrastructure robuste  
✅ **HTTPS** - Certificat SSL automatique  

## 🛠️ Préparation

### 1. Créer un compte Netlify
- Aller sur [netlify.com](https://netlify.com)
- Se connecter avec GitHub/GitLab

### 2. Préparer le repository Git
```bash
git add .
git commit -m "Configuration Netlify"
git push origin main
```

## 🚀 Déploiement Rapide

### Option 1 : Via Interface Web (Recommandé)

1. **Aller sur [netlify.com](https://netlify.com)**
2. **Cliquer sur "New site from Git"**
3. **Connecter le repository GitHub/GitLab**
4. **Configuration :**
   - Build command : `npm install`
   - Publish directory : `.`
   - Base directory : `maquette` (si dans un sous-dossier)

### Option 2 : Via Netlify CLI

```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Se connecter
netlify login

# Déployer
netlify deploy

# Déployer en production
netlify deploy --prod
```

## ⚙️ Configuration

### Fichiers de Configuration

**netlify.toml** (déjà créé) :
```toml
[build]
  command = "npm install"
  publish = "."

[build.environment]
  NODE_ENV = "production"

[[redirects]]
  from = "/*"
  to = "/server.js"
  status = 200

[functions]
  directory = "."
  node_bundler = "esbuild"
```

**package.json** (déjà configuré) :
```json
{
  "name": "mgjc-enfants-server",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "build": "npm install"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "multer": "^1.4.5-lts.1"
  }
}
```

## 🔧 Variables d'Environnement

Dans le dashboard Netlify → Site settings → Environment variables :

```
NODE_ENV = production
PORT = 8888
```

## 📊 Avantages de Netlify

### ✅ Fonctionnalités Gratuites
- **100 GB** de bande passante/mois
- **300 minutes** de build/mois
- **Déploiements illimités**
- **HTTPS automatique**
- **CDN global**
- **Form handling**

### ✅ Déploiement Automatique
- Déploiement à chaque push Git
- Prévisualisation des branches
- Rollback facile

### ✅ Performance
- Edge Functions
- Cache intelligent
- Optimisation automatique

## 🔍 Test du Déploiement

### 1. Test de l'API
```bash
# Test de santé
curl https://mgjc-enfants.netlify.app/api/health

# Test de récupération des enfants
curl https://mgjc-enfants.netlify.app/api/enfants
```

### 2. Test de l'Interface
- Ouvrir : `https://mgjc-enfants.netlify.app`
- Vérifier le chargement
- Tester l'ajout d'un enfant

## 🔄 Mise à Jour

### Déploiement Automatique
1. Pousser les modifications vers Git
2. Netlify déploie automatiquement
3. URL mise à jour instantanément

### Déploiement Manuel
```bash
netlify deploy --prod
```

## 🛠️ Dépannage

### Problèmes Courants

1. **Erreur de Build**
   - Vérifier `package.json`
   - Vérifier les dépendances
   - Consulter les logs Netlify

2. **Erreur de Port**
   - Netlify gère automatiquement le port
   - Utiliser `process.env.PORT`

3. **Erreur CORS**
   - Vérifier la configuration CORS
   - Ajouter le domaine Netlify

### Logs de Debug
```bash
# Voir les logs en temps réel
netlify logs

# Voir les logs d'un déploiement spécifique
netlify logs --site mgjc-enfants
```

## 📊 Monitoring

### Analytics Netlify
- Visiteurs en temps réel
- Performance des pages
- Erreurs automatiques

### Logs
- Logs de build
- Logs de runtime
- Logs d'erreurs

## 🔗 Domaines Personnalisés

### Ajouter un Domaine
1. Dashboard Netlify → Site settings → Domain management
2. Ajouter votre domaine
3. Configurer les DNS

### Sous-domaines
- `mgjc-enfants.netlify.app` (automatique)
- `mgjc-enfants.votre-domaine.com` (personnalisé)

## 📞 Support

- **Documentation Netlify** : [docs.netlify.com](https://docs.netlify.com)
- **Support Netlify** : Via le dashboard
- **Community** : Discord Netlify

## ✅ Checklist de Déploiement Netlify

- [ ] Compte Netlify créé
- [ ] Repository Git configuré
- [ ] `netlify.toml` configuré
- [ ] `package.json` configuré
- [ ] Variables d'environnement définies
- [ ] Déploiement réussi
- [ ] Tests de l'API passés
- [ ] Tests de l'interface passés
- [ ] Monitoring configuré

## 🎉 URL de Déploiement

Après le déploiement réussi, votre application sera accessible à :
**https://mgjc-enfants.netlify.app**

## 🚀 Commandes Utiles

```bash
# Déployer
netlify deploy

# Déployer en production
netlify deploy --prod

# Voir les logs
netlify logs

# Lister les sites
netlify sites:list

# Supprimer un site
netlify sites:delete mgjc-enfants
```

## 🎯 Prochaines Étapes

1. **Déployer sur Netlify**
2. **Tester l'application**
3. **Configurer un domaine personnalisé** (optionnel)
4. **Mettre en place le monitoring**

Netlify est une excellente alternative pour déployer rapidement votre application MGJC Enfants ! 