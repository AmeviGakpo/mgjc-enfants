#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

console.log('🔍 Diagnostic des Photos - MGJC Enfants');
console.log('=========================================');
console.log('');

// Fonction pour analyser les données des enfants
async function analyserDonneesEnfants() {
    try {
        console.log('📊 Analyse des données des enfants...');
        
        // Lire le fichier de données
        const dataFile = path.join(__dirname, 'data', 'enfants.json');
        const data = await fs.readFile(dataFile, 'utf8');
        const enfants = JSON.parse(data);
        
        console.log(`📈 Total d'enfants: ${enfants.length}`);
        console.log('');
        
        // Analyser chaque enfant
        enfants.forEach((enfant, index) => {
            console.log(`${index + 1}. ${enfant.prenom} ${enfant.nom}`);
            console.log(`   📷 Photo: ${enfant.photoEnfant || 'Aucune photo'}`);
            
            if (enfant.photoEnfant) {
                // Analyser l'URL de la photo
                if (enfant.photoEnfant.startsWith('http')) {
                    console.log(`   ✅ URL complète`);
                } else if (enfant.photoEnfant.startsWith('/uploads/')) {
                    console.log(`   ⚠️ URL relative`);
                } else if (enfant.photoEnfant.startsWith('data:')) {
                    console.log(`   ✅ Image base64`);
                } else {
                    console.log(`   ❓ Format inconnu`);
                }
            }
            console.log('');
        });
        
        // Statistiques
        const avecPhotos = enfants.filter(e => e.photoEnfant && e.photoEnfant !== 'https://via.placeholder.com/35x45.png?text=Photo').length;
        const sansPhotos = enfants.length - avecPhotos;
        
        console.log('📊 Statistiques:');
        console.log(`   ✅ Avec photos: ${avecPhotos}`);
        console.log(`   ❌ Sans photos: ${sansPhotos}`);
        console.log(`   📈 Pourcentage: ${Math.round((avecPhotos / enfants.length) * 100)}%`);
        
    } catch (error) {
        console.error('❌ Erreur lors de l\'analyse:', error.message);
    }
}

// Fonction pour vérifier les fichiers uploadés
async function verifierFichiersUploads() {
    try {
        console.log('\n📁 Vérification des fichiers uploadés...');
        
        const uploadsDir = path.join(__dirname, 'uploads');
        
        try {
            const files = await fs.readdir(uploadsDir);
            console.log(`📂 Dossier uploads: ${files.length} fichiers`);
            
            files.forEach(file => {
                const filePath = path.join(uploadsDir, file);
                console.log(`   📄 ${file}`);
            });
            
        } catch (error) {
            console.log('❌ Dossier uploads non trouvé ou vide');
        }
        
    } catch (error) {
        console.error('❌ Erreur lors de la vérification des uploads:', error.message);
    }
}

// Fonction pour nettoyer les URLs de photos
async function nettoyerUrlsPhotos() {
    try {
        console.log('\n🧹 Nettoyage des URLs de photos...');
        
        const dataFile = path.join(__dirname, 'data', 'enfants.json');
        const data = await fs.readFile(dataFile, 'utf8');
        const enfants = JSON.parse(data);
        
        let nettoyages = 0;
        
        const enfantsNettoyes = enfants.map(enfant => {
            if (enfant.photoEnfant) {
                const ancienneUrl = enfant.photoEnfant;
                
                // Nettoyer l'URL
                let nouvelleUrl = ancienneUrl;
                
                // Supprimer les paramètres de cache
                nouvelleUrl = nouvelleUrl.split('?')[0];
                
                // S'assurer que c'est une URL relative pour les uploads
                if (nouvelleUrl.includes('/uploads/') && !nouvelleUrl.startsWith('http')) {
                    nouvelleUrl = nouvelleUrl;
                } else if (nouvelleUrl.includes('uploads/') && nouvelleUrl.startsWith('http')) {
                    // Extraire le chemin relatif
                    const match = nouvelleUrl.match(/\/uploads\/[^?]+/);
                    if (match) {
                        nouvelleUrl = match[0];
                        nettoyages++;
                    }
                }
                
                if (ancienneUrl !== nouvelleUrl) {
                    console.log(`   🔄 ${enfant.prenom} ${enfant.nom}:`);
                    console.log(`      Avant: ${ancienneUrl}`);
                    console.log(`      Après: ${nouvelleUrl}`);
                    console.log('');
                }
                
                enfant.photoEnfant = nouvelleUrl;
            }
            return enfant;
        });
        
        // Sauvegarder les données nettoyées
        await fs.writeFile(dataFile, JSON.stringify(enfantsNettoyes, null, 2));
        
        console.log(`✅ ${nettoyages} URLs nettoyées`);
        
    } catch (error) {
        console.error('❌ Erreur lors du nettoyage:', error.message);
    }
}

// Fonction principale
async function diagnosticComplet() {
    console.log('🚀 Démarrage du diagnostic...\n');
    
    // Analyser les données
    await analyserDonneesEnfants();
    
    // Vérifier les fichiers
    await verifierFichiersUploads();
    
    // Nettoyer les URLs
    await nettoyerUrlsPhotos();
    
    console.log('\n✅ Diagnostic terminé !');
    console.log('\n💡 Recommandations:');
    console.log('   1. Vérifiez que toutes les photos sont bien uploadées');
    console.log('   2. Assurez-vous que les URLs sont cohérentes');
    console.log('   3. Testez le chargement des photos pour chaque enfant');
    console.log('   4. Videz le cache du navigateur si nécessaire');
}

// Démarrer le diagnostic
diagnosticComplet().catch(console.error); 