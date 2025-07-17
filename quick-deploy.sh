#!/bin/bash

echo "🚀 Déploiement Rapide MGJC Enfants"
echo "===================================="
echo ""

# Fonction pour afficher l'aide
show_help() {
    echo "Usage: ./quick-deploy.sh [PLATFORM] [OPTIONS]"
    echo ""
    echo "PLATFORMS:"
    echo "  heroku    - Déployer sur Heroku"
    echo "  railway   - Déployer sur Railway"
    echo "  render    - Déployer sur Render"
    echo "  render    - Déployer sur Render"
    echo "  vps       - Déployer sur VPS"
    echo ""
    echo "OPTIONS:"
    echo "  --help    - Afficher cette aide"
    echo "  --update-url <URL> - Mettre à jour l'URL du serveur"
    echo ""
    echo "EXEMPLES:"
    echo "  ./quick-deploy.sh heroku"
    echo "  ./quick-deploy.sh railway --update-url https://mgjc-enfants.railway.app/api"
    echo "  ./quick-deploy.sh vercel"
}

# Fonction pour déployer sur Heroku
deploy_heroku() {
    echo "🚀 Déploiement sur Heroku..."
    
    # Vérifier si Heroku CLI est installé
    if ! command -v heroku &> /dev/null; then
        echo "❌ Heroku CLI n'est pas installé"
        echo "📥 Installez-le depuis: https://devcenter.heroku.com/articles/heroku-cli"
        return 1
    fi
    
    # Vérifier si l'utilisateur est connecté
    if ! heroku auth:whoami &> /dev/null; then
        echo "🔐 Connexion à Heroku..."
        heroku login
    fi
    
    # Créer l'application si elle n'existe pas
    if [ -z "$HEROKU_APP_NAME" ]; then
        HEROKU_APP_NAME="mgjc-enfants-$(date +%s)"
    fi
    
    echo "📦 Création de l'application: $HEROKU_APP_NAME"
    heroku create $HEROKU_APP_NAME
    
    # Configurer les variables d'environnement
    heroku config:set NODE_ENV=production
    heroku config:set PORT=3000
    
    # Déployer
    echo "🚀 Déploiement en cours..."
    git add .
    git commit -m "Deploy to Heroku"
    git push heroku main
    
    # Ouvrir l'application
    heroku open
    
    echo "✅ Déploiement Heroku terminé!"
    echo "🌐 URL: https://$HEROKU_APP_NAME.herokuapp.com"
}

# Fonction pour déployer sur Railway
deploy_railway() {
    echo "🚂 Déploiement sur Railway..."
    
    # Vérifier si Railway CLI est installé
    if ! command -v railway &> /dev/null; then
        echo "❌ Railway CLI n'est pas installé"
        echo "📥 Installez-le avec: npm install -g @railway/cli"
        return 1
    fi
    
    # Se connecter à Railway
    railway login
    
    # Déployer
    echo "🚀 Déploiement en cours..."
    railway up
    
    echo "✅ Déploiement Railway terminé!"
    echo "🌐 Vérifiez votre dashboard Railway pour l'URL"
}

# Fonction pour déployer sur Render
deploy_render() {
    echo "⚡ Déploiement sur Render..."
    
    echo "📋 Instructions pour Render:"
    echo "1. Aller sur https://render.com"
    echo "2. Se connecter avec GitHub"
    echo "3. 'New +' → 'Web Service'"
    echo "4. Connecter votre repository"
    echo "5. Configuration automatique"
    
    echo "✅ Instructions Render affichées!"
}

# Fonction pour déployer sur Render
deploy_render() {
    echo "🎨 Déploiement sur Render..."
    
    echo "📋 Instructions pour Render:"
    echo "1. Allez sur https://render.com"
    echo "2. Créez un compte et connectez votre GitHub"
    echo "3. Cliquez sur 'New' > 'Web Service'"
    echo "4. Sélectionnez votre repository"
    echo "5. Configurez:"
    echo "   - Name: mgjc-enfants"
    echo "   - Environment: Node"
    echo "   - Build Command: npm install"
    echo "   - Start Command: npm start"
    echo "6. Cliquez sur 'Create Web Service'"
    echo ""
    echo "✅ Suivez ces instructions pour déployer sur Render"
}

# Fonction pour déployer sur VPS
deploy_vps() {
    echo "🌐 Déploiement sur VPS..."
    
    echo "📋 Instructions pour VPS:"
    echo "1. Connectez-vous à votre VPS:"
    echo "   ssh root@votre-ip"
    echo ""
    echo "2. Installez Node.js:"
    echo "   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -"
    echo "   sudo apt-get install -y nodejs"
    echo ""
    echo "3. Installez PM2:"
    echo "   npm install -g pm2"
    echo ""
    echo "4. Clonez le projet:"
    echo "   git clone https://github.com/votre-repo/mgjc-enfants.git"
    echo "   cd mgjc-enfants"
    echo ""
    echo "5. Installez les dépendances:"
    echo "   npm install"
    echo ""
    echo "6. Démarrez avec PM2:"
    echo "   pm2 start ecosystem.config.js --env production"
    echo "   pm2 startup"
    echo "   pm2 save"
    echo ""
    echo "✅ Suivez ces instructions pour déployer sur VPS"
}

# Fonction pour mettre à jour l'URL
update_server_url() {
    local url=$1
    echo "🔧 Mise à jour de l'URL du serveur: $url"
    
    if node update-server-url.js "$url"; then
        echo "✅ URL mise à jour avec succès!"
    else
        echo "❌ Erreur lors de la mise à jour de l'URL"
        return 1
    fi
}

# Traitement des arguments
PLATFORM=""
UPDATE_URL=""

while [[ $# -gt 0 ]]; do
    case $1 in
        --help)
            show_help
            exit 0
            ;;
        --update-url)
            UPDATE_URL="$2"
            shift 2
            ;;
        heroku|railway|render|vps)
            PLATFORM="$1"
            shift
            ;;
        *)
            echo "❌ Option inconnue: $1"
            show_help
            exit 1
            ;;
    esac
done

# Vérifier qu'une plateforme est spécifiée
if [ -z "$PLATFORM" ]; then
    echo "❌ Veuillez spécifier une plateforme"
    show_help
    exit 1
fi

# Mettre à jour l'URL si spécifiée
if [ -n "$UPDATE_URL" ]; then
    update_server_url "$UPDATE_URL"
fi

# Déployer selon la plateforme
case $PLATFORM in
    heroku)
        deploy_heroku
        ;;
    railway)
        deploy_railway
        ;;

    render)
        deploy_render
        ;;
    vps)
        deploy_vps
        ;;
    *)
        echo "❌ Plateforme inconnue: $PLATFORM"
        show_help
        exit 1
        ;;
esac

echo ""
echo "🎉 Déploiement terminé!"
echo "📖 Consultez GUIDE_DEPLOIEMENT.md pour plus de détails" 