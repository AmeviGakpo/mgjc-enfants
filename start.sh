#!/bin/bash

echo "🚀 Démarrage du serveur MGJC Enfants"
echo "====================================="
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

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    print_error "Node.js n'est pas installé"
    echo "Veuillez installer Node.js depuis https://nodejs.org/"
    exit 1
fi

print_status "Node.js détecté: $(node --version)"
echo ""

# Vérifier si les dépendances sont installées
if [ ! -d "node_modules" ]; then
    print_status "Installation des dépendances..."
    npm install
    if [ $? -ne 0 ]; then
        print_error "Erreur lors de l'installation des dépendances"
        exit 1
    fi
    print_status "Dépendances installées"
else
    print_status "Dépendances déjà installées"
fi

echo ""

# Tester le serveur
print_status "Test du serveur..."
node test-server.js
if [ $? -ne 0 ]; then
    print_warning "Certains tests ont échoué, mais le serveur peut quand même fonctionner"
fi

echo ""

# Démarrer le serveur
print_status "Démarrage du serveur..."
echo "📊 API: http://localhost:3000/api"
echo "🌐 Application: http://localhost:3000"
echo "🏥 Test de santé: http://localhost:3000/api/health"
echo ""
echo "Appuyez sur Ctrl+C pour arrêter le serveur"
echo ""

npm start 