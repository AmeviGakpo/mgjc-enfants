# 🌐 Guide de Déploiement VPS - MGJC Enfants

## 📋 Prérequis

### 1. VPS Ubuntu/Debian
- **RAM minimale** : 1 GB
- **Stockage** : 20 GB minimum
- **CPU** : 1 vCore minimum
- **OS** : Ubuntu 20.04+ ou Debian 11+

### 2. Accès SSH
- Clé SSH ou mot de passe
- Droits root (sudo)

### 3. Nom de domaine (optionnel)
- Pour SSL/HTTPS
- Pour un accès plus professionnel

## 🚀 Étapes de Déploiement

### Étape 1 : Connexion au VPS

```bash
# Connexion SSH
ssh root@votre-ip-vps

# Ou avec un utilisateur non-root
ssh utilisateur@votre-ip-vps
sudo su -
```

### Étape 2 : Configuration Automatique

```bash
# Télécharger le script de configuration
wget https://raw.githubusercontent.com/votre-repo/mgjc-enfants/main/vps-setup.sh

# Rendre le script exécutable
chmod +x vps-setup.sh

# Exécuter la configuration
./vps-setup.sh
```

**Le script va automatiquement :**
- ✅ Mettre à jour le système
- ✅ Installer Node.js 18
- ✅ Installer PM2 (gestionnaire de processus)
- ✅ Installer et configurer Nginx
- ✅ Configurer le firewall
- ✅ Créer les répertoires nécessaires
- ✅ Configurer les sauvegardes automatiques
- ✅ Installer Certbot pour SSL

### Étape 3 : Déploiement de l'Application

```bash
# Aller dans le répertoire de l'application
cd /var/www/mgjc-enfants

# Cloner votre repository
git clone https://github.com/votre-repo/mgjc-enfants.git .

# Installer les dépendances
npm install --production

# Copier les fichiers de configuration
cp ecosystem.config.js ./
cp server.js ./
cp package.json ./
```

### Étape 4 : Configuration de l'Application

```bash
# Créer le fichier de configuration
nano config.js
```

**Contenu de `config.js` :**
```javascript
module.exports = {
    port: process.env.PORT || 3000,
    uploadDir: './uploads',
    dataFile: './data/enfants.json',
    backupDir: './backups',
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedImageTypes: ['image/jpeg', 'image/png', 'image/gif'],
    adminCredentials: {
        username: 'MGJC_Melchi',
        password: 'Melchi171819'
    }
};
```

### Étape 5 : Démarrage de l'Application

```bash
# Démarrer avec PM2
pm2 start ecosystem.config.js --env production

# Sauvegarder la configuration PM2
pm2 save

# Configurer le démarrage automatique
pm2 startup
```

### Étape 6 : Configuration SSL (Recommandé)

```bash
# Installer Certbot (si pas déjà fait)
apt install -y certbot python3-certbot-nginx

# Obtenir un certificat SSL
certbot --nginx -d votre-domaine.com

# Ou pour un certificat auto-signé (test uniquement)
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/ssl/private/nginx-selfsigned.key \
    -out /etc/ssl/certs/nginx-selfsigned.crt
```

## 🔧 Gestion de l'Application

### Commandes Utiles

```bash
# Vérifier le statut
pm2 status
pm2 logs mgjc-enfants

# Redémarrer l'application
pm2 restart mgjc-enfants

# Arrêter l'application
pm2 stop mgjc-enfants

# Monitoring en temps réel
pm2 monit

# Vérifier les logs Nginx
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

### Scripts Disponibles

```bash
# Déploiement automatique
/root/deploy-mgjc.sh

# Sauvegarde manuelle
/root/backup-mgjc.sh

# Monitoring système
/root/monitor-mgjc.sh
```

## 📊 Monitoring et Maintenance

### Surveillance des Ressources

```bash
# Utilisation CPU et mémoire
htop

# Utilisation disque
df -h

# Logs de l'application
pm2 logs mgjc-enfants --lines 100

# Statut des services
systemctl status nginx
systemctl status pm2-root
```

### Sauvegardes

```bash
# Sauvegarde manuelle
/root/backup-mgjc.sh

# Vérifier les sauvegardes
ls -la /var/www/mgjc-enfants/backups/

# Restaurer une sauvegarde
cp /var/www/mgjc-enfants/backups/enfants_20241201_143022.json \
   /var/www/mgjc-enfants/data/enfants.json
```

## 🔒 Sécurité

### Configuration Firewall

```bash
# Vérifier le statut du firewall
ufw status

# Autoriser SSH
ufw allow ssh

# Autoriser HTTP/HTTPS
ufw allow 'Nginx Full'

# Activer le firewall
ufw enable
```

### Mise à Jour de Sécurité

```bash
# Mise à jour automatique
apt update && apt upgrade -y

# Mise à jour Node.js
npm update -g

# Mise à jour PM2
npm install -g pm2@latest
```

## 🚨 Dépannage

### Problèmes Courants

#### 1. Application ne démarre pas
```bash
# Vérifier les logs
pm2 logs mgjc-enfants

# Vérifier la configuration
pm2 show mgjc-enfants

# Redémarrer PM2
pm2 kill
pm2 resurrect
```

#### 2. Nginx ne fonctionne pas
```bash
# Tester la configuration
nginx -t

# Redémarrer Nginx
systemctl restart nginx

# Vérifier les logs
tail -f /var/log/nginx/error.log
```

#### 3. Problème de permissions
```bash
# Corriger les permissions
chown -R www-data:www-data /var/www/mgjc-enfants
chmod -R 755 /var/www/mgjc-enfants
```

#### 4. Port déjà utilisé
```bash
# Vérifier les ports utilisés
netstat -tulpn | grep :3000

# Tuer le processus
kill -9 $(lsof -t -i:3000)
```

## 📈 Optimisation

### Performance

```bash
# Optimiser Nginx
nano /etc/nginx/nginx.conf

# Ajouter dans http {} :
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
```

### Monitoring Avancé

```bash
# Installer htop pour un meilleur monitoring
apt install -y htop

# Installer netdata pour monitoring web
bash <(curl -Ss https://my-netdata.io/kickstart.sh)
```

## 🔄 Mise à Jour

### Déploiement Automatique

```bash
# Créer un webhook GitHub (optionnel)
# Ajouter dans votre repository GitHub Actions

# Ou utiliser le script de déploiement
/root/deploy-mgjc.sh
```

### Mise à Jour Manuelle

```bash
cd /var/www/mgjc-enfants

# Sauvegarder avant mise à jour
/root/backup-mgjc.sh

# Mettre à jour le code
git pull origin main

# Installer les nouvelles dépendances
npm install --production

# Redémarrer l'application
pm2 restart mgjc-enfants
```

## 📞 Support

### Logs Importants

```bash
# Logs de l'application
pm2 logs mgjc-enfants

# Logs Nginx
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# Logs système
journalctl -u nginx
journalctl -u pm2-root
```

### Informations Système

```bash
# Informations du serveur
uname -a
lsb_release -a

# Informations Node.js
node --version
npm --version

# Informations PM2
pm2 --version
pm2 status
```

## ✅ Checklist de Déploiement

- [ ] VPS configuré avec Ubuntu/Debian
- [ ] Accès SSH configuré
- [ ] Script de configuration exécuté
- [ ] Application déployée
- [ ] PM2 configuré et démarré
- [ ] Nginx configuré et démarré
- [ ] Firewall configuré
- [ ] SSL configuré (optionnel)
- [ ] Sauvegardes automatiques configurées
- [ ] Monitoring configuré
- [ ] Tests de fonctionnement effectués

## 🌐 Accès à l'Application

Une fois déployée, votre application sera accessible sur :
- **HTTP** : `http://votre-ip-vps`
- **HTTPS** : `https://votre-domaine.com` (si SSL configuré)

### Test de Fonctionnement

```bash
# Test local
curl http://localhost:3000/api/health

# Test externe
curl http://votre-ip-vps/api/health
```

---

**🎉 Félicitations ! Votre application MGJC Enfants est maintenant déployée sur votre VPS !**

Pour toute question ou problème, consultez les logs et utilisez les scripts de monitoring fournis. 