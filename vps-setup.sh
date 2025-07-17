#!/bin/bash

echo "🌐 Configuration VPS pour MGJC Enfants"
echo "========================================"
echo ""

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages colorés
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}[SETUP]${NC} $1"
}

# Vérifier si on est root
if [[ $EUID -ne 0 ]]; then
   print_error "Ce script doit être exécuté en tant que root"
   exit 1
fi

# Variables de configuration
NODE_VERSION="18"
DOMAIN=""
EMAIL=""
APP_NAME="mgjc-enfants"
APP_PATH="/var/www/$APP_NAME"

print_header "Début de la configuration du VPS..."

# Mise à jour du système
print_status "Mise à jour du système..."
apt update && apt upgrade -y

# Installation des paquets de base
print_status "Installation des paquets de base..."
apt install -y curl wget git unzip software-properties-common apt-transport-https ca-certificates gnupg lsb-release

# Installation de Node.js
print_header "Installation de Node.js $NODE_VERSION..."
curl -fsSL https://deb.nodesource.com/setup_$NODE_VERSION.x | bash -
apt install -y nodejs

# Vérifier l'installation de Node.js
if command -v node &> /dev/null; then
    print_status "Node.js installé: $(node --version)"
    print_status "npm installé: $(npm --version)"
else
    print_error "Échec de l'installation de Node.js"
    exit 1
fi

# Installation de PM2
print_header "Installation de PM2..."
npm install -g pm2

# Installation de Nginx
print_header "Installation de Nginx..."
apt install -y nginx

# Configuration de Nginx
print_status "Configuration de Nginx..."
cat > /etc/nginx/sites-available/$APP_NAME << 'EOF'
server {
    listen 80;
    server_name _;
    
    # Redirection vers HTTPS (optionnel)
    # return 301 https://$server_name$request_uri;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
    }
    
    # Configuration pour les uploads
    location /uploads/ {
        alias /var/www/mgjc-enfants/uploads/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
    
    # Configuration pour les fichiers statiques
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

# Activer le site
ln -sf /etc/nginx/sites-available/$APP_NAME /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Tester la configuration Nginx
if nginx -t; then
    print_status "Configuration Nginx valide"
    systemctl restart nginx
    systemctl enable nginx
else
    print_error "Erreur dans la configuration Nginx"
    exit 1
fi

# Créer le répertoire de l'application
print_status "Création du répertoire de l'application..."
mkdir -p $APP_PATH
mkdir -p $APP_PATH/logs
mkdir -p $APP_PATH/data
mkdir -p $APP_PATH/uploads
mkdir -p $APP_PATH/backups

# Configuration des permissions
print_status "Configuration des permissions..."
chown -R www-data:www-data $APP_PATH
chmod -R 755 $APP_PATH

# Créer un utilisateur pour l'application (optionnel)
print_status "Création de l'utilisateur mgjc..."
useradd -r -s /bin/false mgjc || true
usermod -a -G www-data mgjc

# Script de sauvegarde automatique
print_header "Configuration des sauvegardes automatiques..."
cat > /root/backup-mgjc.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/www/mgjc-enfants/backups"
DATA_FILE="/var/www/mgjc-enfants/data/enfants.json"

if [ -f "$DATA_FILE" ]; then
    cp "$DATA_FILE" "$BACKUP_DIR/enfants_$DATE.json"
    echo "Sauvegarde créée: enfants_$DATE.json"
    
    # Supprimer les sauvegardes de plus de 30 jours
    find "$BACKUP_DIR" -name "enfants_*.json" -mtime +30 -delete
else
    echo "Fichier de données non trouvé"
fi
EOF

chmod +x /root/backup-mgjc.sh

# Configuration du cron pour les sauvegardes
print_status "Configuration des sauvegardes automatiques..."
(crontab -l 2>/dev/null; echo "0 2 * * * /root/backup-mgjc.sh") | crontab -

# Installation de Certbot pour SSL (optionnel)
print_header "Installation de Certbot pour SSL..."
apt install -y certbot python3-certbot-nginx

# Script de déploiement
print_header "Création du script de déploiement..."
cat > /root/deploy-mgjc.sh << 'EOF'
#!/bin/bash
cd /var/www/mgjc-enfants

echo "🔄 Mise à jour de l'application..."

# Sauvegarder avant mise à jour
/root/backup-mgjc.sh

# Mettre à jour depuis Git
git pull origin main

# Installer les dépendances
npm install --production

# Redémarrer l'application
pm2 restart mgjc-enfants

echo "✅ Déploiement terminé"
EOF

chmod +x /root/deploy-mgjc.sh

# Configuration du firewall
print_header "Configuration du firewall..."
ufw allow ssh
ufw allow 'Nginx Full'
ufw allow 3000
ufw --force enable

# Configuration de PM2
print_status "Configuration de PM2..."
pm2 startup
env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u root --hp /root

# Script de monitoring
print_header "Création du script de monitoring..."
cat > /root/monitor-mgjc.sh << 'EOF'
#!/bin/bash
echo "=== Monitoring MGJC Enfants ==="
echo "Date: $(date)"
echo ""

echo "=== Statut PM2 ==="
pm2 status

echo ""
echo "=== Utilisation mémoire ==="
free -h

echo ""
echo "=== Utilisation disque ==="
df -h

echo ""
echo "=== Logs récents ==="
tail -n 20 /var/www/mgjc-enfants/logs/combined.log 2>/dev/null || echo "Aucun log trouvé"

echo ""
echo "=== Statut Nginx ==="
systemctl status nginx --no-pager -l
EOF

chmod +x /root/monitor-mgjc.sh

# Configuration des logs
print_status "Configuration des logs..."
cat > /etc/logrotate.d/mgjc-enfants << 'EOF'
/var/www/mgjc-enfants/logs/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 644 www-data www-data
    postrotate
        pm2 reloadLogs
    endscript
}
EOF

print_header "Configuration terminée !"
echo ""
echo "📋 Prochaines étapes :"
echo "1. Cloner votre repository :"
echo "   cd /var/www/mgjc-enfants"
echo "   git clone https://github.com/votre-repo/mgjc-enfants.git ."
echo ""
echo "2. Installer les dépendances :"
echo "   npm install"
echo ""
echo "3. Démarrer l'application :"
echo "   pm2 start ecosystem.config.js --env production"
echo "   pm2 save"
echo ""
echo "4. Configurer SSL (optionnel) :"
echo "   certbot --nginx -d votre-domaine.com"
echo ""
echo "5. Vérifier le statut :"
echo "   pm2 status"
echo "   systemctl status nginx"
echo ""
echo "🔧 Scripts disponibles :"
echo "   /root/deploy-mgjc.sh    - Déploiement"
echo "   /root/backup-mgjc.sh    - Sauvegarde"
echo "   /root/monitor-mgjc.sh   - Monitoring"
echo ""
echo "📊 Monitoring :"
echo "   pm2 monit"
echo "   pm2 logs mgjc-enfants"
echo ""
echo "🌐 Votre application sera accessible sur :"
echo "   http://$(curl -s ifconfig.me)"
echo "   ou"
echo "   http://votre-domaine.com"
echo ""
print_status "Configuration VPS terminée avec succès !" 