# 🚀 Guide de Déploiement sur Render

## 📋 Prérequis

1. **Compte Render** : Créer un compte gratuit sur [render.com](https://render.com)
2. **Repository Git** : Le code doit être dans un repository Git (GitHub, GitLab, etc.)
3. **Node.js** : Le projet utilise Node.js (version 14+)

## 🔧 Configuration du Projet

### 1. Structure du Projet ✅
```
maquette/
├── server.js          # Serveur Express
├── package.json       # Dépendances Node.js
├── render.yaml        # Configuration Render
├── maquette.html      # Interface utilisateur
├── maquette.css       # Styles
├── uploads/           # Dossier pour les photos
├── data/              # Dossier pour les données
└── backups/           # Dossier pour les sauvegardes
```

### 2. Fichiers de Configuration ✅

**render.yaml** (déjà configuré) :
```yaml
services:
  - type: web
    name: mgjc-enfants
    env: node
    plan: free
    buildCommand: npm install
    startCommand: node server.js
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
    healthCheckPath: /api/health
    autoDeploy: true
```

**package.json** (déjà configuré) :
```json
{
  "name": "mgjc-enfants-server",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "multer": "^1.4.5-lts.1"
  }
}
```

## 🚀 Étapes de Déploiement

### Étape 1 : Préparer le Repository

1. **Créer un repository Git** (si pas déjà fait) :
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Pousser vers GitHub/GitLab** :
   ```bash
   git remote add origin https://github.com/votre-username/mgjc-enfants.git
   git push -u origin main
   ```

### Étape 2 : Déployer sur Render

1. **Se connecter à Render** :
   - Aller sur [render.com](https://render.com)
   - Se connecter avec GitHub/GitLab

2. **Créer un nouveau service** :
   - Cliquer sur "New +"
   - Sélectionner "Web Service"
   - Connecter le repository Git

3. **Configuration du service** :
   - **Name** : `mgjc-enfants`
   - **Environment** : `Node`
   - **Region** : `Oregon (US West)` (gratuit)
   - **Branch** : `main`
   - **Root Directory** : `maquette` (si le code est dans un sous-dossier)
   - **Build Command** : `npm install`
   - **Start Command** : `node server.js`

4. **Variables d'environnement** :
   - `NODE_ENV` : `production`
   - `PORT` : `10000`

### Étape 3 : Déploiement

1. **Cliquer sur "Create Web Service"**
2. **Attendre le déploiement** (5-10 minutes)
3. **Vérifier les logs** pour s'assurer qu'il n'y a pas d'erreurs

## 🔍 Vérification du Déploiement

### 1. Test de l'API
```bash
# Test de santé
curl https://mgjc-enfants.onrender.com/api/health

# Test de récupération des enfants
curl https://mgjc-enfants.onrender.com/api/enfants
```

### 2. Test de l'Interface
- Ouvrir l'URL : `https://mgjc-enfants.onrender.com`
- Vérifier que l'interface se charge correctement
- Tester l'ajout d'un enfant

## ⚙️ Configuration Avancée

### 1. Domaine Personnalisé (Optionnel)
- Dans Render Dashboard → Settings → Custom Domains
- Ajouter votre domaine personnalisé

### 2. Variables d'Environnement Supplémentaires
```bash
# Pour le développement
NODE_ENV=development
DEBUG=true

# Pour la sécurité
JWT_SECRET=votre_secret_jwt
```

### 3. Monitoring
- Render fournit des logs automatiques
- Surveiller les performances dans le dashboard

## 🛠️ Dépannage

### Problèmes Courants

1. **Erreur de Build** :
   - Vérifier que `package.json` est correct
   - Vérifier que toutes les dépendances sont listées

2. **Erreur de Port** :
   - S'assurer que le serveur écoute sur `process.env.PORT`
   - Vérifier la variable d'environnement `PORT`

3. **Erreur CORS** :
   - Vérifier la configuration CORS dans `server.js`
   - Ajouter le domaine Render dans les origines autorisées

4. **Erreur de Fichiers** :
   - Vérifier que les dossiers `uploads/`, `data/`, `backups/` existent
   - S'assurer que les permissions sont correctes

### Logs de Debug
```bash
# Dans Render Dashboard → Logs
# Chercher les erreurs en rouge
# Vérifier les messages de démarrage
```

## 📊 Monitoring et Maintenance

### 1. Logs Automatiques
- Render collecte automatiquement les logs
- Accessibles dans le dashboard

### 2. Redémarrage Automatique
- Le service redémarre automatiquement en cas de crash
- Surveillance 24/7

### 3. Sauvegarde des Données
- Les données sont stockées dans le système de fichiers
- Considérer une sauvegarde externe pour les données critiques

## 🔄 Mise à Jour

### Déploiement Automatique
1. Pousser les modifications vers Git
2. Render déploie automatiquement
3. Vérifier les logs de déploiement

### Déploiement Manuel
1. Dans Render Dashboard → Manual Deploy
2. Sélectionner la branche
3. Cliquer sur "Deploy"

## 📞 Support

- **Documentation Render** : [docs.render.com](https://docs.render.com)
- **Support Render** : Via le dashboard ou email
- **Logs** : Toujours vérifier les logs en premier

## ✅ Checklist de Déploiement

- [ ] Repository Git configuré
- [ ] `package.json` avec toutes les dépendances
- [ ] `render.yaml` configuré
- [ ] Variables d'environnement définies
- [ ] Service créé sur Render
- [ ] Déploiement réussi
- [ ] Tests de l'API passés
- [ ] Tests de l'interface passés
- [ ] Monitoring configuré

## 🎉 Félicitations !

Votre application MGJC Enfants est maintenant déployée sur Render !
URL : `https://mgjc-enfants.onrender.com` 