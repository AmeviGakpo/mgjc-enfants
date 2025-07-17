#!/usr/bin/env node

const http = require('http');
const fs = require('fs').promises;
const path = require('path');

console.log('🧪 Test du serveur MGJC Enfants');
console.log('================================');

const BASE_URL = 'http://localhost:3000';

// Tests à effectuer
const tests = [
    {
        name: 'Test de santé du serveur',
        url: '/api/health',
        method: 'GET'
    },
    {
        name: 'Test des informations du serveur',
        url: '/api/info',
        method: 'GET'
    },
    {
        name: 'Test de récupération des enfants',
        url: '/api/enfants',
        method: 'GET'
    },
    {
        name: 'Test de la page principale',
        url: '/',
        method: 'GET'
    }
];

// Fonction pour effectuer un test HTTP
function makeRequest(test) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: test.url,
            method: test.method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const req = http.request(options, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                try {
                    const jsonData = test.url === '/' ? null : JSON.parse(data);
                    resolve({
                        status: res.statusCode,
                        data: jsonData,
                        success: res.statusCode >= 200 && res.statusCode < 300
                    });
                } catch (error) {
                    resolve({
                        status: res.statusCode,
                        data: data,
                        success: res.statusCode >= 200 && res.statusCode < 300
                    });
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.end();
    });
}

// Fonction pour tester les fichiers
async function testFiles() {
    console.log('\n📁 Test des fichiers...');
    
    const requiredFiles = [
        'server.js',
        'package.json',
        'maquette.html',
        'maquette.css'
    ];

    for (const file of requiredFiles) {
        try {
            await fs.access(file);
            console.log(`✅ ${file} - Présent`);
        } catch (error) {
            console.log(`❌ ${file} - Manquant`);
        }
    }
}

// Fonction pour tester les dossiers
async function testDirectories() {
    console.log('\n📂 Test des dossiers...');
    
    const requiredDirs = [
        'uploads',
        'data',
        'backups'
    ];

    for (const dir of requiredDirs) {
        try {
            await fs.access(dir);
            console.log(`✅ ${dir}/ - Présent`);
        } catch (error) {
            console.log(`❌ ${dir}/ - Manquant (sera créé au démarrage)`);
        }
    }
}

// Fonction pour tester les dépendances
async function testDependencies() {
    console.log('\n📦 Test des dépendances...');
    
    try {
        const packageJson = JSON.parse(await fs.readFile('package.json', 'utf8'));
        const requiredDeps = ['express', 'cors', 'multer'];
        
        for (const dep of requiredDeps) {
            if (packageJson.dependencies && packageJson.dependencies[dep]) {
                console.log(`✅ ${dep} - Installé`);
            } else {
                console.log(`❌ ${dep} - Manquant`);
            }
        }
    } catch (error) {
        console.log('❌ Erreur lors de la lecture de package.json');
    }
}

// Fonction principale de test
async function runTests() {
    console.log('🚀 Démarrage des tests...\n');
    
    // Test des fichiers et dossiers
    await testFiles();
    await testDirectories();
    await testDependencies();
    
    // Test du serveur
    console.log('\n🌐 Test du serveur...');
    
    for (const test of tests) {
        try {
            console.log(`\n🔍 ${test.name}...`);
            const result = await makeRequest(test);
            
            if (result.success) {
                console.log(`✅ ${test.name} - Succès (${result.status})`);
                if (result.data && result.data.message) {
                    console.log(`   Message: ${result.data.message}`);
                }
            } else {
                console.log(`❌ ${test.name} - Échec (${result.status})`);
                if (result.data && result.data.error) {
                    console.log(`   Erreur: ${result.data.error}`);
                }
            }
        } catch (error) {
            console.log(`❌ ${test.name} - Erreur: ${error.message}`);
        }
    }
    
    console.log('\n📊 Résumé des tests...');
    console.log('✅ Tests terminés');
    console.log('\n💡 Si tous les tests sont verts, le serveur est prêt pour le déploiement !');
}

// Démarrer les tests
runTests().catch(console.error); 