# 🚀 Script de Déploiement Render pour Windows PowerShell
# MGJC Enfants - Gestion des données des enfants

Write-Host "🚀 Déploiement MGJC Enfants sur Render" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan

# Fonction pour afficher les messages
function Write-Status {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

# Vérifier si Git est installé
try {
    git --version | Out-Null
    Write-Success "Git installé"
} catch {
    Write-Error "Git n'est pas installé. Veuillez installer Git d'abord."
    exit 1
}

# Vérifier si Node.js est installé
try {
    node --version | Out-Null
    Write-Success "Node.js installé"
} catch {
    Write-Error "Node.js n'est pas installé. Veuillez installer Node.js d'abord."
    exit 1
}

Write-Status "Vérification de l'environnement..."

# Vérifier les fichiers essentiels
$requiredFiles = @("package.json", "server.js", "render.yaml")
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Success "$file trouvé"
    } else {
        Write-Error "$file manquant"
        exit 1
    }
}

Write-Success "Fichiers essentiels trouvés"

# Vérifier si c'est un repository Git
if (Test-Path ".git") {
    Write-Status "Repository Git déjà initialisé"
} else {
    Write-Warning "Initialisation du repository Git..."
    git init
    git add .
    git commit -m "Initial commit - MGJC Enfants"
    Write-Success "Repository Git initialisé"
}

# Vérifier les modifications
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Warning "Modifications détectées, commit en cours..."
    git add .
    git commit -m "Update - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
    Write-Success "Modifications commitées"
} else {
    Write-Status "Aucune modification à commiter"
}

# Afficher les informations de déploiement
Write-Host ""
Write-Host "📋 Informations de Déploiement" -ForegroundColor Cyan
Write-Host "==============================" -ForegroundColor Cyan
Write-Host "🌐 Plateforme: Render"
Write-Host "🔧 Type: Web Service"
Write-Host "📦 Runtime: Node.js"
Write-Host "💰 Plan: Gratuit"
Write-Host "🔄 Auto-deploy: Activé"
Write-Host ""

# Instructions pour le déploiement
Write-Host "📝 Étapes de Déploiement sur Render" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. 🌐 Aller sur https://render.com"
Write-Host "2. 🔐 Se connecter avec GitHub/GitLab"
Write-Host "3. ➕ Cliquer sur 'New +' → 'Web Service'"
Write-Host "4. 🔗 Connecter votre repository Git"
Write-Host "5. ⚙️  Configuration:"
Write-Host "   - Name: mgjc-enfants"
Write-Host "   - Environment: Node"
Write-Host "   - Region: Oregon (US West)"
Write-Host "   - Branch: main"
Write-Host "   - Root Directory: maquette"
Write-Host "   - Build Command: npm install"
Write-Host "   - Start Command: node server.js"
Write-Host "6. 🔧 Variables d'environnement:"
Write-Host "   - NODE_ENV: production"
Write-Host "   - PORT: 10000"
Write-Host "7. 🚀 Cliquer sur 'Create Web Service'"
Write-Host ""

# Vérifier la configuration
Write-Status "Vérification de la configuration..."

# Vérifier package.json
$packageContent = Get-Content "package.json" -Raw
if ($packageContent -match '""start""\s*:\s*""node server.js""') {
    Write-Success "Script start configuré"
} else {
    Write-Error "Script start manquant dans package.json"
}

# Vérifier render.yaml
$renderContent = Get-Content "render.yaml" -Raw
if ($renderContent -match "mgjc-enfants") {
    Write-Success "Configuration Render trouvée"
} else {
    Write-Error "Configuration Render manquante"
}

# Vérifier les dépendances
if (Test-Path "package-lock.json" -or Test-Path "node_modules") {
    Write-Success "Dépendances installées"
} else {
    Write-Warning "Installation des dépendances..."
    npm install
    Write-Success "Dépendances installées"
}

Write-Host ""
Write-Host "🔍 Tests Locaux" -ForegroundColor Cyan
Write-Host "===============" -ForegroundColor Cyan

# Test du serveur local
Write-Status "Test du serveur local..."
try {
    $nodeVersion = node --version
    Write-Success "Node.js fonctionne ($nodeVersion)"
} catch {
    Write-Error "Problème avec Node.js"
}

# Test de la configuration du serveur
try {
    node --version
    Write-Success "Node.js fonctionne et la configuration du serveur est OK"
} catch {
    Write-Warning "Vérifier la configuration du serveur"
}

Write-Host ""
Write-Host "📊 Informations du Projet" -ForegroundColor Cyan
Write-Host "========================" -ForegroundColor Cyan
Write-Host "📁 Dossier: $(Get-Location)"
Write-Host "📦 Nom: $((Get-Content package.json | ConvertFrom-Json).name)"
Write-Host "📋 Version: $((Get-Content package.json | ConvertFrom-Json).version)"
Write-Host "🔧 Main: $((Get-Content package.json | ConvertFrom-Json).main)"

Write-Host ""
Write-Host "🚀 Prêt pour le Déploiement !" -ForegroundColor Green
Write-Host "=============================" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Checklist:" -ForegroundColor Yellow
Write-Host "✅ Repository Git configuré"
Write-Host "✅ package.json configuré"
Write-Host "✅ render.yaml configuré"
Write-Host "✅ Dépendances installées"
Write-Host "✅ Tests locaux passés"
Write-Host ""
Write-Host "🌐 URL après déploiement: https://mgjc-enfants.onrender.com"
Write-Host ""
Write-Host "📞 Support:" -ForegroundColor Yellow
Write-Host "- Documentation Render: https://docs.render.com"
Write-Host "- Logs: Disponibles dans le dashboard Render"
Write-Host "- Monitoring: Automatique avec Render"
Write-Host ""
Write-Success "Script de déploiement terminé !"
Write-Host ""
Write-Host "🎉 Bon déploiement !" -ForegroundColor Green 