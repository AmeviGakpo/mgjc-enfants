# 🚀 Guide de Déploiement - MGJC Enfants

## 📋 Prérequis

### 1. Préparation du Projet
```bash
# Vérifier que tous les fichiers sont présents
ls -la
# Vous devriez voir :
# - server.js
# - package.json
# - maquette.html
# - maquette.css
# - deploy-*.json (fichiers de configuration)
```

### 2. Test Local
```bash
# Installer les dépendances
npm install

# Tester le serveur
npm start

# Vérifier que ça fonctionne
curl http://localhost:3000/api/health
```

## 🌐 Options de Déploiement

### Option 1: 🚀 Heroku (Recommandé - Gratuit)

#### Étape 1: Créer un compte
1. Aller sur [heroku.com](https://heroku.com)
2. Créer un compte gratuit
3. Installer Heroku CLI

#### Étape 2: Installer Heroku CLI
```bash
# Windows
# Télécharger depuis: https://devcenter.heroku.com/articles/heroku-cli

# Mac
brew tap heroku/brew && brew install heroku

# Linux
curl https://cli-assets.heroku.com/install.sh | sh
```

#### Étape 3: Déployer
```bash
# Se connecter à Heroku
heroku login

# Créer une nouvelle application
heroku create mgjc-enfants

# Ajouter les fichiers au git
git init
git add .
git commit -m "Initial commit"

# Déployer
git push heroku main

# Ouvrir l'application
heroku open
```

#### Étape 4: Configurer les variables d'environnement
```bash
heroku config:set NODE_ENV=production
heroku config:set PORT=3000
```

### Option 2: 🚂 Railway (Très Simple - Gratuit)

#### Étape 1: Créer un compte
1. Aller sur [railway.app](https://railway.app)
2. Se connecter avec GitHub

#### Étape 2: Déployer
1. Cliquer sur "New Project"
2. Sélectionner "Deploy from GitHub repo"
3. Choisir votre repository
4. Railway détecte automatiquement que c'est un projet Node.js
5. Le déploiement se fait automatiquement

#### Étape 3: Configurer
1. Aller dans l'onglet "Variables"
2. Ajouter `NODE_ENV=production`
3. Ajouter `PORT=3000`

### Option 3: ⚡ Render (Rapide - Gratuit)

#### Étape 1: Créer un compte
1. Aller sur [render.com](https://render.com)
2. Se connecter avec GitHub

#### Étape 2: Déployer
1. "New +" → "Web Service"
2. Connecter votre repository GitHub
3. Configuration automatique

#### Étape 3: Variables d'environnement
```
NODE_ENV = production
PORT = 10000
```

### Option 4: 🎨 Render (Simple - Gratuit)

#### Étape 1: Créer un compte
1. Aller sur [render.com](https://render.com)
2. Se connecter avec GitHub

#### Étape 2: Déployer
1. Cliquer sur "New" > "Web Service"
2. Connecter votre repository GitHub
3. Configurer :
   - **Name**: mgjc-enfants
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Cliquer sur "Create Web Service"

### Option 5: 🌐 Serveur VPS (Payant - Plus de contrôle)

#### Étape 1: Acheter un VPS
- **DigitalOcean**: $5/mois
- **AWS EC2**: $3-10/mois
- **Linode**: $5/mois

#### Étape 2: Configurer le serveur
```bash
# Se connecter au serveur
ssh root@votre-ip

# Installer Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Installer PM2
npm install -g pm2

# Cloner le projet
git clone https://github.com/votre-repo/mgjc-enfants.git
cd mgjc-enfants

# Installer les dépendances
npm install

# Démarrer avec PM2
pm2 start server.js --name mgjc-enfants
pm2 startup
pm2 save
```

#### Étape 3: Configurer Nginx (optionnel)
```bash
# Installer Nginx
sudo apt-get install nginx

# Configurer le proxy
sudo nano /etc/nginx/sites-available/mgjc-enfants

# Ajouter cette configuration :
server {
    listen 80;
    server_name votre-domaine.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Activer le site
sudo ln -s /etc/nginx/sites-available/mgjc-enfants /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 🔧 Configuration Post-Déploiement

### 1. Mettre à jour l'URL du serveur
Après déploiement, vous devez mettre à jour l'URL du serveur dans `maquette.html` :

```javascript
// Remplacer cette ligne :
const SERVER_URL = 'http://localhost:3000/api';

// Par votre URL de production :
const SERVER_URL = 'https://votre-app.herokuapp.com/api';
// ou
const SERVER_URL = 'https://votre-app.railway.app/api';
// etc.
```

### 2. Configurer un domaine personnalisé
#### Heroku
```bash
heroku domains:add www.votre-domaine.com
```

#### Railway
1. Aller dans les paramètres du projet
2. Section "Custom Domains"
3. Ajouter votre domaine

#### Render
1. Aller dans les paramètres du projet
2. Section "Custom Domains"
3. Ajouter votre domaine

### 3. Activer HTTPS
La plupart des plateformes activent HTTPS automatiquement. Pour un VPS :
```bash
# Installer Certbot
sudo apt-get install certbot python3-certbot-nginx

# Obtenir un certificat SSL
sudo certbot --nginx -d votre-domaine.com
```

### 4. Configurer les sauvegardes automatiques
#### Heroku
```bash
# Ajouter PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Configurer les sauvegardes
heroku pg:backups schedule DATABASE_URL --at '02:00 UTC'
```

#### VPS avec cron
```bash
# Créer un script de sauvegarde
nano /root/backup.sh

# Ajouter ce contenu :
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
cp /path/to/data/enfants.json /backups/enfants_$DATE.json
find /backups -name "*.json" -mtime +7 -delete

# Rendre exécutable
chmod +x /root/backup.sh

# Ajouter au cron
crontab -e
# Ajouter cette ligne :
0 2 * * * /root/backup.sh
```

## 🧪 Tests Post-Déploiement

### 1. Test de santé
```bash
curl https://votre-app.herokuapp.com/api/health
```

### 2. Test de l'API
```bash
# Tester la récupération des enfants
curl https://votre-app.herokuapp.com/api/enfants

# Tester l'upload de photo
curl -X POST -F "photo=@test.jpg" https://votre-app.herokuapp.com/api/upload-photo
```

### 3. Test de l'interface
1. Ouvrir votre site dans le navigateur
2. Tester la connexion administrateur
3. Tester l'ajout d'un enfant
4. Tester l'upload de photo
5. Tester l'export des données

## 🔍 Monitoring et Maintenance

### 1. Logs
#### Heroku
```bash
heroku logs --tail
```

#### Railway
- Aller dans l'onglet "Deployments" > "View Logs"

#### VPS
```bash
pm2 logs mgjc-enfants
```

### 2. Performance
#### Heroku
```bash
heroku ps
heroku ps:scale web=1
```

#### VPS
```bash
pm2 monit
htop
```

### 3. Sauvegardes
#### Vérifier les sauvegardes
```bash
# Heroku
heroku pg:backups

# VPS
ls -la /backups/
```

## 🚨 Dépannage

### Problème: Le site ne se charge pas
1. Vérifier les logs : `heroku logs --tail`
2. Vérifier que le serveur démarre : `heroku ps`
3. Vérifier les variables d'environnement : `heroku config`

### Problème: Les photos ne s'uploadent pas
1. Vérifier les permissions du dossier uploads
2. Vérifier la taille des fichiers (max 10MB)
3. Vérifier les types de fichiers autorisés

### Problème: Les données ne se sauvegardent pas
1. Vérifier la connexion à la base de données
2. Vérifier les logs d'erreur
3. Vérifier les permissions d'écriture

## 📞 Support

### En cas de problème
1. **Vérifier les logs** de votre plateforme
2. **Tester localement** d'abord
3. **Consulter la documentation** de votre plateforme
4. **Contacter le support** de votre plateforme

### Contact
- **Email**: borisakpatcha@gmail.com
- **WhatsApp**: +228 98 17 18 19

## 🎉 Félicitations !

Votre application MGJC Enfants est maintenant en ligne ! 

N'oubliez pas de :
- ✅ Tester toutes les fonctionnalités
- ✅ Configurer un domaine personnalisé
- ✅ Activer HTTPS
- ✅ Configurer les sauvegardes automatiques
- ✅ Surveiller les performances
- ✅ Former les utilisateurs

**Votre site est maintenant accessible partout dans le monde ! 🌍** 