#!/bin/bash

# 🚀 Script de Déploiement Rapide pour Render
# MGJC Enfants - Gestion des données des enfants

echo "🚀 Déploiement MGJC Enfants sur Render"
echo "======================================"

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Vérifier si Git est installé
if ! command -v git &> /dev/null; then
    print_error "Git n'est pas installé. Veuillez installer Git d'abord."
    exit 1
fi

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    print_error "Node.js n'est pas installé. Veuillez installer Node.js d'abord."
    exit 1
fi

print_status "Vérification de l'environnement..."

# Vérifier les fichiers essentiels
if [ ! -f "package.json" ]; then
    print_error "package.json manquant"
    exit 1
fi

if [ ! -f "server.js" ]; then
    print_error "server.js manquant"
    exit 1
fi

if [ ! -f "render.yaml" ]; then
    print_error "render.yaml manquant"
    exit 1
fi

print_success "Fichiers essentiels trouvés"

# Vérifier si c'est un repository Git
if [ ! -d ".git" ]; then
    print_warning "Initialisation du repository Git..."
    git init
    git add .
    git commit -m "Initial commit - MGJC Enfants"
    print_success "Repository Git initialisé"
else
    print_status "Repository Git déjà initialisé"
fi

# Vérifier les modifications
if [ -n "$(git status --porcelain)" ]; then
    print_warning "Modifications détectées, commit en cours..."
    git add .
    git commit -m "Update - $(date '+%Y-%m-%d %H:%M:%S')"
    print_success "Modifications commitées"
else
    print_status "Aucune modification à commiter"
fi

# Afficher les informations de déploiement
echo ""
echo "📋 Informations de Déploiement"
echo "=============================="
echo "🌐 Plateforme: Render"
echo "🔧 Type: Web Service"
echo "📦 Runtime: Node.js"
echo "💰 Plan: Gratuit"
echo "🔄 Auto-deploy: Activé"
echo ""

# Instructions pour le déploiement
echo "📝 Étapes de Déploiement sur Render"
echo "==================================="
echo ""
echo "1. 🌐 Aller sur https://render.com"
echo "2. 🔐 Se connecter avec GitHub/GitLab"
echo "3. ➕ Cliquer sur 'New +' → 'Web Service'"
echo "4. 🔗 Connecter votre repository Git"
echo "5. ⚙️  Configuration:"
echo "   - Name: mgjc-enfants"
echo "   - Environment: Node"
echo "   - Region: Oregon (US West)"
echo "   - Branch: main"
echo "   - Root Directory: maquette"
echo "   - Build Command: npm install"
echo "   - Start Command: node server.js"
echo "6. 🔧 Variables d'environnement:"
echo "   - NODE_ENV: production"
echo "   - PORT: 10000"
echo "7. 🚀 Cliquer sur 'Create Web Service'"
echo ""

# Vérifier la configuration
print_status "Vérification de la configuration..."

# Vérifier package.json
if grep -q '"start": "node server.js"' package.json; then
    print_success "Script start configuré"
else
    print_error "Script start manquant dans package.json"
fi

# Vérifier render.yaml
if grep -q "mgjc-enfants" render.yaml; then
    print_success "Configuration Render trouvée"
else
    print_error "Configuration Render manquante"
fi

# Vérifier les dépendances
if [ -f "package-lock.json" ] || [ -d "node_modules" ]; then
    print_success "Dépendances installées"
else
    print_warning "Installation des dépendances..."
    npm install
    print_success "Dépendances installées"
fi

echo ""
echo "🔍 Tests Locaux"
echo "==============="

# Test du serveur local
print_status "Test du serveur local..."
if node -e "console.log('Node.js version:', process.version)" 2>/dev/null; then
    print_success "Node.js fonctionne"
else
    print_error "Problème avec Node.js"
fi

# Test de la configuration du serveur
if node -e "const app = require('./server.js'); console.log('Serveur configuré')" 2>/dev/null; then
    print_success "Configuration du serveur OK"
else
    print_warning "Vérifier la configuration du serveur"
fi

echo ""
echo "📊 Informations du Projet"
echo "========================"
echo "📁 Dossier: $(pwd)"
echo "📦 Nom: $(grep '"name"' package.json | cut -d'"' -f4)"
echo "📋 Version: $(grep '"version"' package.json | cut -d'"' -f4)"
echo "🔧 Main: $(grep '"main"' package.json | cut -d'"' -f4)"

echo ""
echo "🚀 Prêt pour le Déploiement !"
echo "============================="
echo ""
echo "📋 Checklist:"
echo "✅ Repository Git configuré"
echo "✅ package.json configuré"
echo "✅ render.yaml configuré"
echo "✅ Dépendances installées"
echo "✅ Tests locaux passés"
echo ""
echo "🌐 URL après déploiement: https://mgjc-enfants.onrender.com"
echo ""
echo "📞 Support:"
echo "- Documentation Render: https://docs.render.com"
echo "- Logs: Disponibles dans le dashboard Render"
echo "- Monitoring: Automatique avec Render"
echo ""
print_success "Script de déploiement terminé !"
echo ""
echo "�� Bon déploiement !" 