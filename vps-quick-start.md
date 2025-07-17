# 🚀 Démarrage Rapide VPS - MGJC Enfants

## ⚡ Déploiement en 5 Minutes

### 1. Préparer votre VPS

```bash
# Connexion SSH
ssh root@votre-ip-vps

# Mise à jour du système
apt update && apt upgrade -y
```

### 2. Configuration Automatique

```bash
# Télécharger et exécuter le script de configuration
wget -O vps-setup.sh https://raw.githubusercontent.com/votre-repo/mgjc-enfants/main/vps-setup.sh
chmod +x vps-setup.sh
./vps-setup.sh
```

### 3. Déploiement de l'Application

```bash
# Aller dans le répertoire de l'application
cd /var/www/mgjc-enfants

# Copier vos fichiers (depuis votre machine locale)
scp -r * root@votre-ip-vps:/var/www/mgjc-enfants/

# Ou cloner depuis Git
git clone https://github.com/votre-repo/mgjc-enfants.git .

# Installer les dépendances
npm install --production

# Démarrer l'application
pm2 start ecosystem.config.js --env production
pm2 save
```

### 4. Test de Fonctionnement

```bash
# Vérifier le statut
pm2 status

# Tester l'API
curl http://localhost:3000/api/health

# Vérifier Nginx
systemctl status nginx
```

### 5. Accès à l'Application

Votre application est maintenant accessible sur :
- **HTTP** : `http://votre-ip-vps`
- **HTTPS** : `https://votre-domaine.com` (si SSL configuré)

## 🔧 Commandes Essentielles

### Gestion de l'Application

```bash
# Statut
pm2 status

# Logs
pm2 logs mgjc-enfants

# Redémarrer
pm2 restart mgjc-enfants

# Monitoring
pm2 monit
```

### Sauvegardes

```bash
# Sauvegarde manuelle
/root/backup-mgjc.sh

# Vérifier les sauvegardes
ls -la /var/www/mgjc-enfants/backups/
```

### Mise à Jour

```bash
# Mise à jour automatique
/root/update-mgjc.sh

# Ou manuelle
cd /var/www/mgjc-enfants
git pull origin main
npm install --production
pm2 restart mgjc-enfants
```

## 📊 Monitoring Rapide

```bash
# Utilisation des ressources
htop

# Logs en temps réel
pm2 logs mgjc-enfants --lines 50

# Statut des services
systemctl status nginx
systemctl status pm2-root
```

## 🚨 Dépannage Rapide

### Application ne répond pas

```bash
# Vérifier les logs
pm2 logs mgjc-enfants

# Redémarrer
pm2 restart mgjc-enfants

# Vérifier le port
netstat -tulpn | grep :3000
```

### Nginx ne fonctionne pas

```bash
# Tester la configuration
nginx -t

# Redémarrer
systemctl restart nginx

# Vérifier les logs
tail -f /var/log/nginx/error.log
```

### Problème de permissions

```bash
# Corriger les permissions
chown -R www-data:www-data /var/www/mgjc-enfants
chmod -R 755 /var/www/mgjc-enfants
```

## 🔒 Sécurité Rapide

```bash
# Vérifier le firewall
ufw status

# Autoriser SSH et HTTP
ufw allow ssh
ufw allow 'Nginx Full'
ufw enable
```

## 📱 Test Mobile

Testez votre application sur mobile :
1. Ouvrez `http://votre-ip-vps` sur votre téléphone
2. Testez l'ajout d'un enfant
3. Testez l'upload de photo
4. Testez la connexion admin

## ✅ Checklist Rapide

- [ ] VPS configuré
- [ ] Script de configuration exécuté
- [ ] Application déployée
- [ ] PM2 démarré
- [ ] Nginx configuré
- [ ] Test de fonctionnement OK
- [ ] Sauvegardes configurées
- [ ] SSL configuré (optionnel)

## 🆘 Support Rapide

### Logs Importants

```bash
# Application
pm2 logs mgjc-enfants

# Nginx
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# Système
journalctl -u nginx
journalctl -u pm2-root
```

### Informations Système

```bash
# Version Node.js
node --version

# Version PM2
pm2 --version

# Statut des services
systemctl status nginx
pm2 status
```

### Test de Connectivité

```bash
# Test local
curl http://localhost:3000/api/health

# Test externe
curl http://votre-ip-vps/api/health
```

---

**🎉 Votre application MGJC Enfants est maintenant en ligne !**

Pour toute question, consultez le guide complet : `GUIDE_VPS.md` 