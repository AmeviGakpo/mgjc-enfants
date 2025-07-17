# 🆓 Déploiement Gratuit sur Render - MGJC Enfants

## 🎯 Pourquoi Render ?

- ✅ **100% Gratuit** : 750h/mois (suffisant pour 24h/24)
- ✅ **SSL automatique** : HTTPS inclus
- ✅ **Déploiement automatique** depuis GitHub
- ✅ **Base de données gratuite** incluse
- ✅ **Interface simple** et intuitive
- ✅ **Support excellent**

## 🚀 Étapes de Déploiement

### Étape 1 : Préparer votre Code

1. **Créer un repository GitHub**
   ```bash
   # Si vous n'avez pas encore de repository
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/votre-username/mgjc-enfants.git
   git push -u origin main
   ```

2. **Vérifier que ces fichiers sont présents :**
   - ✅ `package.json`
   - ✅ `server.js`
   - ✅ `render.yaml`
   - ✅ `maquette.html`
   - ✅ `maquette.css`

### Étape 2 : Créer un Compte Render

1. **Aller sur [render.com](https://render.com)**
2. **Cliquer sur "Get Started"**
3. **Créer un compte** (avec GitHub recommandé)
4. **Vérifier votre email**

### Étape 3 : Déployer l'Application

1. **Dans Render Dashboard :**
   - Cliquer sur "New +"
   - Sélectionner "Web Service"

2. **Connecter GitHub :**
   - Cliquer sur "Connect account"
   - Autoriser Render à accéder à vos repos
   - Sélectionner votre repository `mgjc-enfants`

3. **Configuration :**
   - **Name** : `mgjc-enfants`
   - **Environment** : `Node`
   - **Region** : `Frankfurt` (plus proche de l'Afrique)
   - **Branch** : `main`
   - **Build Command** : `npm install`
   - **Start Command** : `node server.js`

4. **Variables d'environnement :**
   ```
   NODE_ENV=production
   PORT=10000
   ```

5. **Cliquer sur "Create Web Service"**

### Étape 4 : Configuration de la Base de Données

1. **Créer une base de données :**
   - Dans Render Dashboard
   - "New +" → "PostgreSQL"
   - **Name** : `mgjc-enfants-db`
   - **Database** : `mgjc_enfants`
   - **User** : `mgjc_user`

2. **Connecter à l'application :**
   - Dans votre Web Service
   - "Environment" → "Environment Variables"
   - Ajouter les variables de la base de données

## 🔧 Configuration Avancée

### Modifier server.js pour Render

```javascript
// Ajouter au début de server.js
const PORT = process.env.PORT || 3000;

// Modifier la ligne d'écoute
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
```

### Configuration des Uploads

```javascript
// Dans server.js, modifier le chemin des uploads
const uploadDir = process.env.UPLOAD_DIR || './uploads';
```

## 📊 Monitoring et Maintenance

### Logs de l'Application

1. **Dans Render Dashboard :**
   - Aller sur votre Web Service
   - Onglet "Logs"
   - Voir les logs en temps réel

### Métriques

1. **Onglet "Metrics" :**
   - Temps de réponse
   - Utilisation CPU/Mémoire
   - Nombre de requêtes

## 🔒 Sécurité

### Variables d'Environnement

Dans Render Dashboard → Environment Variables :

```
NODE_ENV=production
PORT=10000
ADMIN_USERNAME=MGJC_Melchi
ADMIN_PASSWORD=Melchi171819
UPLOAD_DIR=./uploads
```

### SSL Automatique

- ✅ **HTTPS automatique** inclus
- ✅ **Certificat Let's Encrypt**
- ✅ **Renouvellement automatique**

## 🚨 Dépannage

### Problèmes Courants

#### 1. Application ne démarre pas
```bash
# Vérifier les logs dans Render Dashboard
# Onglet "Logs" → Voir les erreurs
```

#### 2. Erreur de build
```bash
# Vérifier package.json
# S'assurer que toutes les dépendances sont listées
```

#### 3. Erreur de port
```javascript
// Dans server.js, utiliser :
const PORT = process.env.PORT || 3000;
```

#### 4. Problème de base de données
```bash
# Vérifier les variables d'environnement
# S'assurer que la DB est créée et connectée
```

## 📱 Test de l'Application

### Test Local

```bash
# Tester avant déploiement
npm install
npm start
curl http://localhost:3000/api/health
```

### Test en Production

1. **Ouvrir l'URL de Render**
2. **Tester toutes les fonctionnalités :**
   - ✅ Ajout d'enfant
   - ✅ Upload de photo
   - ✅ Connexion admin
   - ✅ Sauvegarde des données

## 🔄 Mise à Jour

### Déploiement Automatique

1. **Modifier votre code local**
2. **Pousser vers GitHub :**
   ```bash
   git add .
   git commit -m "Mise à jour"
   git push origin main
   ```
3. **Render déploie automatiquement**

### Déploiement Manuel

1. **Dans Render Dashboard**
2. **Onglet "Manual Deploy"**
3. **Cliquer sur "Deploy latest commit"**

## 💰 Coûts

### Plan Gratuit Render

- ✅ **750h/mois** (suffisant pour 24h/24)
- ✅ **512MB RAM**
- ✅ **0.1 CPU**
- ✅ **SSL gratuit**
- ✅ **Base de données incluse**
- ✅ **Déploiement automatique**

### Limites

- ⚠️ **Dormance** : L'app se met en veille après 15min d'inactivité
- ⚠️ **Redémarrage** : 30 secondes pour redémarrer
- ⚠️ **Stockage** : 1GB pour les fichiers

## 🎉 Avantages du Plan Gratuit

1. **Aucun coût** : Vraiment gratuit
2. **SSL automatique** : HTTPS inclus
3. **Déploiement automatique** : Depuis GitHub
4. **Base de données** : PostgreSQL incluse
5. **Monitoring** : Logs et métriques
6. **Support** : Documentation excellente

## 📞 Support

### Documentation Render
- [render.com/docs](https://render.com/docs)
- [render.com/docs/web-services](https://render.com/docs/web-services)

### Communauté
- [Render Community](https://community.render.com)
- [GitHub Issues](https://github.com/render-oss/render-starter-expressjs/issues)

---

**🎉 Votre application MGJC Enfants sera en ligne gratuitement sur Render !**

L'URL sera : `https://mgjc-enfants.onrender.com` (ou similaire) 