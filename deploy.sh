#!/bin/bash

echo "🚀 Déploiement MGJC Enfants"
echo "================================"

# Vérifier que Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Vérifier que npm est installé
if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

echo "✅ Node.js et npm sont installés"

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm install

# Vérifier que l'installation s'est bien passée
if [ $? -ne 0 ]; then
    echo "❌ Erreur lors de l'installation des dépendances"
    exit 1
fi

echo "✅ Dépendances installées"

# Tester le serveur localement
echo "🧪 Test du serveur local..."
timeout 10s node server.js &
SERVER_PID=$!

sleep 3

# Vérifier si le serveur répond
if curl -s http://localhost:3000/api/health > /dev/null; then
    echo "✅ Serveur local fonctionne correctement"
    kill $SERVER_PID 2>/dev/null
else
    echo "❌ Le serveur local ne répond pas"
    kill $SERVER_PID 2>/dev/null
    exit 1
fi

echo ""
echo "🎉 Le serveur est prêt pour le déploiement !"
echo ""
echo "📋 Options de déploiement :"
echo ""
echo "1. 🚀 Heroku (Gratuit)"
echo "   - Créer un compte sur heroku.com"
echo "   - Installer Heroku CLI"
echo "   - Commande: heroku create mgjc-enfants"
echo "   - Commande: git push heroku main"
echo ""
echo "2. 🚂 Railway (Gratuit)"
echo "   - Créer un compte sur railway.app"
echo "   - Connecter votre repository GitHub"
echo "   - Le déploiement se fait automatiquement"
echo ""
echo "3. ⚡ Render (Gratuit)"
echo "   - Créer un compte sur render.com"
echo "   - Connecter GitHub"
echo "   - New > Web Service"
echo ""
echo "4. 🎨 Render (Gratuit)"
echo "   - Créer un compte sur render.com"
echo "   - Connecter votre repository GitHub"
echo "   - Créer un nouveau Web Service"
echo ""
echo "5. 🌐 Serveur VPS (Payant)"
echo "   - Acheter un VPS (DigitalOcean, AWS, etc.)"
echo "   - Installer Node.js et PM2"
echo "   - Commande: pm2 start server.js --name mgjc-enfants"
echo ""
echo "📝 Après déploiement, n'oubliez pas de :"
echo "   - Mettre à jour l'URL du serveur dans maquette.html"
echo "   - Configurer un domaine personnalisé"
echo "   - Activer HTTPS"
echo "   - Configurer les sauvegardes automatiques"
echo ""
echo "🔗 Documentation complète : GUIDE_UTILISATION.md" 