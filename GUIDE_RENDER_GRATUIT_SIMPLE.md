# 🚀 Déploiement Gratuit sur Render - MGJC Enfants

## 📋 Pourquoi Render ?

✅ **100% Gratuit** - 750h/mois  
✅ **Pas de carte bancaire**  
✅ **Déploiement simple**  
✅ **HTTPS automatique**  
✅ **Base de données incluse**  

## 🚀 Étapes de Déploiement

### Étape 1 : Créer un Compte
1. **Aller sur [render.com](https://render.com)**
2. **Cliquer sur "Sign Up"**
3. **Se connecter avec GitHub/GitLab**

### Étape 2 : Créer un Repository GitHub
1. **Aller sur [github.com](https://github.com)**
2. **Créer un nouveau repository** : `mgjc-enfants`
3. **Uploader vos fichiers** :
   - Glisser-déposer le dossier `maquette`
   - Ou utiliser l'interface web

### Étape 3 : Déployer sur Render
1. **Dans Render Dashboard**
2. **Cliquer sur "New +"**
3. **Sélectionner "Web Service"**
4. **Connecter votre repository GitHub**

### Étape 4 : Configuration
```
Name: mgjc-enfants
Environment: Node
Region: Oregon (US West) - Gratuit
Branch: main
Root Directory: maquette
Build Command: npm install
Start Command: node server.js
```

### Étape 5 : Variables d'Environnement
```
NODE_ENV = production
PORT = 10000
```

### Étape 6 : Déployer
1. **Cliquer sur "Create Web Service"**
2. **Attendre 5-10 minutes**
3. **Votre site est en ligne !**

## 🌐 Après le Déploiement

### URL de votre site
- **Format** : `https://mgjc-enfants.onrender.com`
- **HTTPS automatique** inclus

### Test de l'Application
1. **Ouvrir l'URL fournie**
2. **Vérifier que l'interface se charge**
3. **Tester l'ajout d'un enfant**

## 📊 Avantages de Render

✅ **750h gratuites/mois** (suffisant pour un site)  
✅ **Pas de carte bancaire**  
✅ **Base de données PostgreSQL incluse**  
✅ **SSL automatique**  
✅ **Déploiement automatique**  
✅ **Interface simple**  

## 🔍 Dépannage

### Problème : Erreur de build
- Vérifier que `package.json` est correct
- Vérifier que toutes les dépendances sont listées

### Problème : Erreur de port
```javascript
// Dans server.js, utiliser :
const PORT = process.env.PORT || 3000;
```

## 🎯 Recommandation

**Render est la meilleure option gratuite** car :
- Pas de carte bancaire
- 750h suffisantes
- Interface simple
- Base de données incluse 