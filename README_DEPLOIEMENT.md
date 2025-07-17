# 🚀 Déploiement MGJC Enfants sur Render

## 📋 Vue d'ensemble

Ce projet est une application web pour la gestion des données des enfants de l'église MGJC. Il est configuré pour être déployé sur Render, une plateforme d'hébergement cloud gratuite.

## 🎯 Fonctionnalités

- ✅ Gestion des informations d'identité des enfants
- ✅ Suivi des résultats scolaires par trimestre
- ✅ Calcul des moyennes et rangs
- ✅ Upload et gestion des photos
- ✅ Interface responsive (desktop et mobile)
- ✅ Sauvegarde automatique des données
- ✅ API REST complète

## 🛠️ Technologies Utilisées

- **Backend** : Node.js + Express
- **Frontend** : HTML5 + CSS3 + JavaScript
- **Base de données** : Fichiers JSON
- **Upload** : Multer
- **CORS** : Configuration pour le déploiement

## 📁 Structure du Projet

```
maquette/
├── server.js              # Serveur Express principal
├── package.json           # Dépendances Node.js
├── render.yaml            # Configuration Render
├── maquette.html          # Interface utilisateur
├── maquette.css           # Styles CSS
├── uploads/               # Dossier pour les photos
├── data/                  # Dossier pour les données JSON
├── backups/               # Dossier pour les sauvegardes
└── image/                 # Images statiques
```

## 🚀 Déploiement Rapide

### Option 1 : Script Automatique (Windows)

```powershell
# Exécuter le script PowerShell
.\deploy-render.ps1
```

### Option 2 : Script Automatique (Linux/Mac)

```bash
# Rendre le script exécutable
chmod +x deploy-render-quick.sh

# Exécuter le script
./deploy-render-quick.sh
```

### Option 3 : Déploiement Manuel

1. **Préparer le repository Git**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/votre-username/mgjc-enfants.git
   git push -u origin main
   ```

2. **Créer un compte Render**
   - Aller sur [render.com](https://render.com)
   - Se connecter avec GitHub/GitLab

3. **Créer un nouveau service**
   - Cliquer sur "New +" → "Web Service"
   - Connecter le repository Git

4. **Configuration du service**
   ```
   Name: mgjc-enfants
   Environment: Node
   Region: Oregon (US West)
   Branch: main
   Root Directory: maquette
   Build Command: npm install
   Start Command: node server.js
   ```

5. **Variables d'environnement**
   ```
   NODE_ENV: production
   PORT: 10000
   ```

6. **Créer le service**
   - Cliquer sur "Create Web Service"
   - Attendre le déploiement (5-10 minutes)

## 🔧 Configuration

### Fichiers de Configuration

**render.yaml** :
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

**package.json** :
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

## 🔍 Tests et Vérification

### Test de l'API
```bash
# Test de santé
curl https://mgjc-enfants.onrender.com/api/health

# Test de récupération des enfants
curl https://mgjc-enfants.onrender.com/api/enfants
```

### Test de l'Interface
- Ouvrir : `https://mgjc-enfants.onrender.com`
- Vérifier le chargement de l'interface
- Tester l'ajout d'un enfant
- Vérifier la responsivité sur mobile

## 📊 Monitoring

### Logs
- Accessibles dans le dashboard Render
- Surveillance automatique des erreurs
- Redémarrage automatique en cas de crash

### Performance
- Monitoring gratuit inclus
- Métriques de performance
- Alertes automatiques

## 🔄 Mise à Jour

### Déploiement Automatique
1. Pousser les modifications vers Git
2. Render déploie automatiquement
3. Vérifier les logs de déploiement

### Déploiement Manuel
1. Dans Render Dashboard → Manual Deploy
2. Sélectionner la branche
3. Cliquer sur "Deploy"

## 🛠️ Dépannage

### Problèmes Courants

1. **Erreur de Build**
   - Vérifier `package.json`
   - Vérifier les dépendances
   - Consulter les logs de build

2. **Erreur de Port**
   - Vérifier `process.env.PORT`
   - Vérifier la variable d'environnement

3. **Erreur CORS**
   - Vérifier la configuration CORS
   - Ajouter le domaine Render

4. **Erreur de Fichiers**
   - Vérifier les permissions
   - Vérifier l'existence des dossiers

### Logs de Debug
```bash
# Dans Render Dashboard → Logs
# Chercher les erreurs en rouge
# Vérifier les messages de démarrage
```

## 📞 Support

- **Documentation Render** : [docs.render.com](https://docs.render.com)
- **Support Render** : Via le dashboard
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

## 🎉 URL de Déploiement

Après le déploiement réussi, votre application sera accessible à :
**https://mgjc-enfants.onrender.com**

## 📚 Documentation Complète

Pour plus de détails, consultez :
- `GUIDE_DEPLOIEMENT_RENDER.md` - Guide détaillé
- `GUIDE_UTILISATION.md` - Guide d'utilisation
- `GUIDE_PHOTOS.md` - Gestion des photos 