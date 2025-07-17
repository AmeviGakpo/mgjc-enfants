// Script de test complet pour le système MGJC
const fs = require('fs');
const path = require('path');

console.log('🧪 Démarrage des tests complets du système MGJC...\n');

// Configuration
const SERVER_URL = 'http://localhost:3000/api';
const TEST_DATA = {
    nom: 'TEST',
    prenom: 'Enfant',
    age: '10',
    classe: '6ème',
    nationalite: 'Togolaise',
    ethnie: 'Ewe',
    orphelinPere: false,
    orphelinMere: false,
    nbFreres: '2',
    nbSoeurs: '1',
    nomPere: 'Père TEST',
    nomMere: 'Mère TEST',
    membreFamille: 'Oncle TEST',
    contactMembre: '22890123456',
    signeParticulier: 'Lunettes',
    moyenne1: '12.5',
    rang1: '15ème',
    effectif1: '35',
    forteMoyenne1: '16.8',
    faibleMoyenne1: '4.2',
    appreciation1: 'B',
    moyenne2: '13.2',
    rang2: '12ème',
    effectif2: '35',
    forteMoyenne2: '17.1',
    faibleMoyenne2: '3.8',
    appreciation2: 'A',
    moyenne3: '14.1',
    rang3: '8ème',
    effectif3: '35',
    forteMoyenne3: '17.5',
    faibleMoyenne3: '3.5',
    appreciation3: 'A',
    moyenneAnnuelle: '13.3',
    rangAnnuel: '10ème',
    effectifAnnuel: '35',
    appreciationAnnuelle: 'A',
    decision: 'Admis avec mention',
    classeSuivante: '5ème',
    photoEnfant: 'https://via.placeholder.com/35x45.png?text=Photo'
};

// Fonctions de test
async function testServerHealth() {
    console.log('🔗 Test de la santé du serveur...');
    try {
        const response = await fetch(`${SERVER_URL}/health`);
        const data = await response.json();
        
        if (data.success) {
            console.log('✅ Serveur en bonne santé:', data.message);
            return true;
        } else {
            console.log('❌ Serveur en erreur:', data.message);
            return false;
        }
    } catch (error) {
        console.log('❌ Impossible de se connecter au serveur:', error.message);
        return false;
    }
}

async function testEnfantsAPI() {
    console.log('\n📊 Test de l\'API des enfants...');
    
    try {
        // Test GET /api/enfants
        console.log('  - Test récupération des enfants...');
        const getResponse = await fetch(`${SERVER_URL}/enfants`);
        const getData = await getResponse.json();
        
        if (getData.success) {
            console.log(`  ✅ ${getData.count} enfants récupérés`);
        } else {
            console.log('  ❌ Erreur lors de la récupération des enfants');
            return false;
        }
        
        // Test POST /api/enfants
        console.log('  - Test ajout d\'un enfant...');
        const postResponse = await fetch(`${SERVER_URL}/enfants`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(TEST_DATA)
        });
        const postData = await postResponse.json();
        
        if (postData.success) {
            console.log('  ✅ Enfant ajouté avec succès');
        } else {
            console.log('  ❌ Erreur lors de l\'ajout de l\'enfant:', postData.message);
            return false;
        }
        
        return true;
    } catch (error) {
        console.log('  ❌ Erreur API enfants:', error.message);
        return false;
    }
}

async function testPhotoUpload() {
    console.log('\n📷 Test de l\'upload de photos...');
    
    try {
        // Créer un fichier de test
        const testImagePath = path.join(__dirname, 'test-image.jpg');
        const testImageData = Buffer.from('fake-image-data');
        fs.writeFileSync(testImagePath, testImageData);
        
        // Simuler l'upload
        const formData = new FormData();
        const file = new File([testImageData], 'test-image.jpg', { type: 'image/jpeg' });
        formData.append('photo', file);
        
        const response = await fetch(`${SERVER_URL}/upload-photo`, {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            console.log('  ✅ Upload de photo réussi');
            // Nettoyer le fichier de test
            fs.unlinkSync(testImagePath);
            return true;
        } else {
            console.log('  ❌ Erreur upload photo:', data.message);
            return false;
        }
    } catch (error) {
        console.log('  ❌ Erreur upload photo:', error.message);
        return false;
    }
}

async function testBackupExport() {
    console.log('\n💾 Test des fonctionnalités de sauvegarde...');
    
    try {
        // Test export
        const exportResponse = await fetch(`${SERVER_URL}/export`);
        const exportData = await exportResponse.json();
        
        if (exportData.success) {
            console.log('  ✅ Export des données réussi');
        } else {
            console.log('  ❌ Erreur export:', exportData.message);
            return false;
        }
        
        // Test backup
        const backupResponse = await fetch(`${SERVER_URL}/backup`, {
            method: 'POST'
        });
        const backupData = await backupResponse.json();
        
        if (backupData.success) {
            console.log('  ✅ Sauvegarde créée avec succès');
        } else {
            console.log('  ❌ Erreur backup:', backupData.message);
            return false;
        }
        
        return true;
    } catch (error) {
        console.log('  ❌ Erreur sauvegarde:', error.message);
        return false;
    }
}

function testFileStructure() {
    console.log('\n📁 Test de la structure des fichiers...');
    
    const requiredFiles = [
        'maquette.html',
        'maquette.css',
        'server.js',
        'package.json',
        'uploads/',
        'data/',
        'backups/'
    ];
    
    let allFilesExist = true;
    
    for (const file of requiredFiles) {
        const filePath = path.join(__dirname, file);
        if (fs.existsSync(filePath)) {
            console.log(`  ✅ ${file} existe`);
        } else {
            console.log(`  ❌ ${file} manquant`);
            allFilesExist = false;
        }
    }
    
    return allFilesExist;
}

function testDependencies() {
    console.log('\n📦 Test des dépendances...');
    
    try {
        const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
        const requiredDeps = ['express', 'cors', 'multer'];
        
        let allDepsInstalled = true;
        
        for (const dep of requiredDeps) {
            if (packageJson.dependencies && packageJson.dependencies[dep]) {
                console.log(`  ✅ ${dep} installé (v${packageJson.dependencies[dep]})`);
            } else {
                console.log(`  ❌ ${dep} manquant`);
                allDepsInstalled = false;
            }
        }
        
        return allDepsInstalled;
    } catch (error) {
        console.log('  ❌ Erreur lecture package.json:', error.message);
        return false;
    }
}

// Fonction principale de test
async function runAllTests() {
    console.log('🚀 Démarrage des tests complets...\n');
    
    const tests = [
        { name: 'Structure des fichiers', fn: testFileStructure },
        { name: 'Dépendances', fn: testDependencies },
        { name: 'Santé du serveur', fn: testServerHealth },
        { name: 'API des enfants', fn: testEnfantsAPI },
        { name: 'Upload de photos', fn: testPhotoUpload },
        { name: 'Sauvegarde/Export', fn: testBackupExport }
    ];
    
    const results = [];
    
    for (const test of tests) {
        try {
            const result = await test.fn();
            results.push({ name: test.name, success: result });
        } catch (error) {
            console.log(`❌ Erreur lors du test "${test.name}":`, error.message);
            results.push({ name: test.name, success: false });
        }
    }
    
    // Résumé des tests
    console.log('\n📊 Résumé des tests:');
    console.log('='.repeat(50));
    
    const passed = results.filter(r => r.success).length;
    const total = results.length;
    
    results.forEach(result => {
        const status = result.success ? '✅' : '❌';
        console.log(`${status} ${result.name}`);
    });
    
    console.log('='.repeat(50));
    console.log(`Tests réussis: ${passed}/${total}`);
    
    if (passed === total) {
        console.log('🎉 Tous les tests sont passés avec succès !');
    } else {
        console.log('⚠️ Certains tests ont échoué. Vérifiez les erreurs ci-dessus.');
    }
    
    return passed === total;
}

// Exécuter les tests si le script est appelé directement
if (require.main === module) {
    runAllTests().then(success => {
        process.exit(success ? 0 : 1);
    });
}

module.exports = {
    runAllTests,
    testServerHealth,
    testEnfantsAPI,
    testPhotoUpload,
    testBackupExport,
    testFileStructure,
    testDependencies
}; 