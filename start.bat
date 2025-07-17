@echo off
echo 🚀 Démarrage du serveur MGJC Enfants avec ouverture automatique du navigateur
echo ====================================
echo.

REM Vérifier si Node.js est installé
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js n'est pas installé
    echo Veuillez installer Node.js depuis https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js détecté
echo.

REM Vérifier si les dépendances sont installées
if not exist "node_modules" (
    echo 📦 Installation des dépendances...
    npm install
    if %errorlevel% neq 0 (
        echo ❌ Erreur lors de l'installation des dépendances
        pause
        exit /b 1
    )
    echo ✅ Dépendances installées
) else (
    echo ✅ Dépendances déjà installées
)

echo.

REM Démarrer le serveur en arrière-plan
echo 🚀 Démarrage du serveur...
start /B node server.js

echo ⏳ Attente du démarrage du serveur...
timeout /t 3 /nobreak >nul

echo 🌐 Ouverture du navigateur...
start http://localhost:3000

echo.
echo ✅ Serveur démarré et navigateur ouvert !
echo 📊 API: http://localhost:3000/api
echo 🌐 Application: http://localhost:3000
echo 🏥 Test de santé: http://localhost:3000/api/health
echo.
echo Le serveur continue de fonctionner en arrière-plan
echo Pour l'arrêter, fermez cette fenêtre ou utilisez Ctrl+C
echo.

pause 