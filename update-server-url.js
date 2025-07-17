#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const HTML_FILE = 'maquette.html';
const BACKUP_SUFFIX = '.backup';

// Fonction pour mettre à jour l'URL du serveur
function updateServerUrl(newUrl) {
    try {
        // Lire le fichier HTML
        const htmlPath = path.join(__dirname, HTML_FILE);
        let content = fs.readFileSync(htmlPath, 'utf8');
        
        // Créer une sauvegarde
        const backupPath = htmlPath + BACKUP_SUFFIX;
        fs.writeFileSync(backupPath, content);
        console.log(`✅ Sauvegarde créée: ${backupPath}`);
        
        // Remplacer l'URL du serveur
        const oldUrlPattern = /const SERVER_URL = ['"`][^'"`]*['"`];/;
        const newUrlLine = `const SERVER_URL = '${newUrl}';`;
        
        if (oldUrlPattern.test(content)) {
            content = content.replace(oldUrlPattern, newUrlLine);
            fs.writeFileSync(htmlPath, content);
            console.log(`✅ URL du serveur mise à jour: ${newUrl}`);
            return true;
        } else {
            console.log('❌ URL du serveur non trouvée dans le fichier');
            return false;
        }
    } catch (error) {
        console.error('❌ Erreur lors de la mise à jour:', error.message);
        return false;
    }
}

// Fonction pour restaurer la sauvegarde
function restoreBackup() {
    try {
        const htmlPath = path.join(__dirname, HTML_FILE);
        const backupPath = htmlPath + BACKUP_SUFFIX;
        
        if (fs.existsSync(backupPath)) {
            const backupContent = fs.readFileSync(backupPath, 'utf8');
            fs.writeFileSync(htmlPath, backupContent);
            console.log('✅ Sauvegarde restaurée');
            return true;
        } else {
            console.log('❌ Aucune sauvegarde trouvée');
            return false;
        }
    } catch (error) {
        console.error('❌ Erreur lors de la restauration:', error.message);
        return false;
    }
}

// Fonction pour afficher l'aide
function showHelp() {
    console.log(`
🚀 Script de mise à jour de l'URL du serveur MGJC

Usage:
  node update-server-url.js <nouvelle-url>
  node update-server-url.js --restore
  node update-server-url.js --help

Exemples:
  node update-server-url.js https://mgjc-enfants.herokuapp.com/api
  node update-server-url.js https://mgjc-enfants.railway.app/api
  node update-server-url.js https://mgjc-enfants.onrender.com/api

Options:
  --restore    Restaurer la sauvegarde précédente
  --help       Afficher cette aide

Notes:
  - Une sauvegarde automatique est créée avant modification
  - L'URL doit inclure /api à la fin
  - Utilisez HTTPS pour la production
`);
}

// Fonction principale
function main() {
    const args = process.argv.slice(2);
    
    if (args.length === 0 || args.includes('--help')) {
        showHelp();
        return;
    }
    
    if (args.includes('--restore')) {
        restoreBackup();
        return;
    }
    
    const newUrl = args[0];
    
    // Validation de l'URL
    if (!newUrl.startsWith('http')) {
        console.log('❌ L\'URL doit commencer par http:// ou https://');
        return;
    }
    
    if (!newUrl.endsWith('/api')) {
        console.log('⚠️  Attention: L\'URL devrait se terminer par /api');
        console.log('   Continuer quand même? (y/N)');
        
        // En mode non-interactif, on continue
        console.log('   Continuation automatique...');
    }
    
    // Mettre à jour l'URL
    const success = updateServerUrl(newUrl);
    
    if (success) {
        console.log(`
🎉 URL mise à jour avec succès !

📋 Prochaines étapes:
1. Tester le site: ${newUrl.replace('/api', '')}
2. Vérifier la connexion administrateur
3. Tester l'ajout d'un enfant
4. Tester l'upload de photo

🔧 En cas de problème:
  node update-server-url.js --restore
`);
    }
}

// Exécuter le script
if (require.main === module) {
    main();
}

module.exports = { updateServerUrl, restoreBackup }; 