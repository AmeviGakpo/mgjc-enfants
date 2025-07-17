#!/bin/bash

echo "🚀 Déploiement VPS - MGJC Enfants"
echo "=================================="
echo ""

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

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
    echo -e "${BLUE}[DEPLOY]${NC} $1"
}

# Variables de configuration
APP_NAME="mgjc-enfants"
APP_PATH="/var/www/$APP_NAME"
GIT_REPO=""
DOMAIN=""

# Demander les informations de configuration
echo "Configuration du déploiement :"
echo ""

if [ -z "$GIT_REPO" ]; then
    read -p "URL du repository Git : " GIT_REPO
fi

if [ -z "$DOMAIN" ]; then
    read -p "Nom de domaine (optionnel) : " DOMAIN
fi

print_header "Début du déploiement..."

# Vérifier si on est dans le bon répertoire
if [ ! -f "server.js" ] || [ ! -f "package.json" ]; then
    print_error "Ce script doit être exécuté depuis le répertoire du projet"
    exit 1
fi

# Créer le répertoire de l'application
print_status "Création du répertoire de l'application..."
mkdir -p $APP_PATH
mkdir -p $APP_PATH/logs
mkdir -p $APP_PATH/data
mkdir -p $APP_PATH/uploads
mkdir -p $APP_PATH/backups

# Copier les fichiers du projet
print_status "Copie des fichiers..."
cp -r * $APP_PATH/
cp ecosystem.config.js $APP_PATH/ 2>/dev/null || true

# Aller dans le répertoire de l'application
cd $APP_PATH

# Installer les dépendances
print_status "Installation des dépendances..."
npm install --production

# Créer le fichier de configuration
print_status "Création du fichier de configuration..."
cat > config.js << 'EOF'
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
EOF

# Créer le fichier de données initial
print_status "Création du fichier de données initial..."
echo '[]' > data/enfants.json

# Configurer les permissions
print_status "Configuration des permissions..."
chown -R www-data:www-data $APP_PATH
chmod -R 755 $APP_PATH

# Démarrer l'application avec PM2
print_status "Démarrage de l'application..."
pm2 delete $APP_NAME 2>/dev/null || true
pm2 start ecosystem.config.js --env production
pm2 save

# Configurer le démarrage automatique
print_status "Configuration du démarrage automatique..."
pm2 startup

# Redémarrer Nginx
print_status "Redémarrage de Nginx..."
systemctl restart nginx

# Configuration SSL si un domaine est fourni
if [ ! -z "$DOMAIN" ]; then
    print_status "Configuration SSL pour $DOMAIN..."
    
    # Mettre à jour la configuration Nginx
    cat > /etc/nginx/sites-available/$APP_NAME << EOF
server {
    listen 80;
    server_name $DOMAIN;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 86400;
    }
    
    location /uploads/ {
        alias /var/www/mgjc-enfants/uploads/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
    
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

    # Redémarrer Nginx
    systemctl restart nginx
    
    # Obtenir le certificat SSL
    print_status "Obtention du certificat SSL..."
    certbot --nginx -d $DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN || {
        print_warning "Échec de l'obtention du certificat SSL. Continuer sans SSL..."
    }
fi

# Créer un script de mise à jour
print_status "Création du script de mise à jour..."
cat > /root/update-mgjc.sh << 'EOF'
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

echo "✅ Mise à jour terminée"
EOF

chmod +x /root/update-mgjc.sh

# Test de fonctionnement
print_status "Test de fonctionnement..."
sleep 5

if curl -s http://localhost:3000/api/health > /dev/null; then
    print_status "✅ Application démarrée avec succès"
else
    print_warning "⚠️ L'application pourrait ne pas être encore prête"
fi

# Afficher les informations finales
print_header "Déploiement terminé !"
echo ""
echo "📋 Informations importantes :"
echo ""

if [ ! -z "$DOMAIN" ]; then
    echo "🌐 URL de l'application :"
    echo "   HTTP  : http://$DOMAIN"
    echo "   HTTPS : https://$DOMAIN"
else
    echo "🌐 URL de l'application :"
    echo "   http://$(curl -s ifconfig.me)"
fi

echo ""
echo "🔧 Commandes utiles :"
echo "   pm2 status                    - Statut de l'application"
echo "   pm2 logs mgjc-enfants        - Logs de l'application"
echo "   pm2 monit                     - Monitoring en temps réel"
echo "   /root/update-mgjc.sh         - Mise à jour de l'application"
echo "   /root/backup-mgjc.sh         - Sauvegarde manuelle"
echo "   /root/monitor-mgjc.sh        - Monitoring système"
echo ""
echo "📊 Monitoring :"
echo "   pm2 monit                     - Interface de monitoring PM2"
echo "   htop                          - Utilisation des ressources"
echo "   df -h                         - Utilisation du disque"
echo ""
echo "🔒 Sécurité :"
echo "   ufw status                    - Statut du firewall"
echo "   systemctl status nginx        - Statut de Nginx"
echo ""
echo "📁 Fichiers importants :"
echo "   $APP_PATH/data/enfants.json  - Données des enfants"
echo "   $APP_PATH/uploads/           - Photos uploadées"
echo "   $APP_PATH/logs/              - Logs de l'application"
echo "   $APP_PATH/backups/           - Sauvegardes"
echo ""

# Test final
print_status "Test de connectivité..."
if curl -s http://localhost:3000/api/health > /dev/null; then
    echo "✅ Application accessible localement"
else
    echo "❌ Problème d'accès local"
fi

if [ ! -z "$DOMAIN" ]; then
    if curl -s https://$DOMAIN/api/health > /dev/null; then
        echo "✅ Application accessible via HTTPS"
    else
        echo "❌ Problème d'accès HTTPS"
    fi
fi

echo ""
print_status "🎉 Déploiement VPS terminé avec succès !"
echo ""
echo "💡 Conseil : Testez toutes les fonctionnalités de l'application"
echo "   avant de la mettre en production." 