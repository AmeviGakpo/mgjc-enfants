const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const multer = require('multer');
const app = express();

// Configuration du port pour Render
const PORT = process.env.PORT || 10000;

// Configuration CORS optimisée pour Render
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://mgjc-enfants.onrender.com', 'https://*.onrender.com']
        : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true
}));

// Middleware pour parser le JSON avec limite augmentée
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Servir les fichiers statiques (important pour Render)
app.use(express.static(path.join(__dirname)));

// Route racine pour servir le fichier HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'maquette.html'));
});

// Route pour servir les images uploadées
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware de sécurité pour les uploads
const uploadDir = path.join(__dirname, 'uploads');
const dataDir = path.join(__dirname, 'data');
const backupDir = path.join(__dirname, 'backups');

// Créer les dossiers nécessaires au démarrage
async function createDirectories() {
    try {
        await fs.mkdir(uploadDir, { recursive: true });
        await fs.mkdir(dataDir, { recursive: true });
        await fs.mkdir(backupDir, { recursive: true });
        console.log('✅ Dossiers créés avec succès');
    } catch (error) {
        console.error('❌ Erreur lors de la création des dossiers:', error);
    }
}

// Configuration de multer améliorée pour la sécurité
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Nettoyer le nom de fichier pour la sécurité
        const cleanName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'photo-' + uniqueSuffix + path.extname(cleanName));
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB max (réduit pour les hébergeurs gratuits)
        files: 1
    },
    fileFilter: function (req, file, cb) {
        // Vérification stricte des types de fichiers
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error(`Type de fichier non autorisé. Types acceptés: ${allowedTypes.join(', ')}`), false);
        }
    }
});

// Chemin vers le fichier de données
const DATA_FILE = path.join(dataDir, 'enfants.json');

// Fonction pour lire les données des enfants avec gestion d'erreur améliorée
async function readEnfantsData() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            // Le fichier n'existe pas, créer un tableau vide
            await fs.writeFile(DATA_FILE, JSON.stringify([]));
            return [];
        }
        console.error('Erreur lors de la lecture des données:', error);
        throw error;
    }
}

// Fonction pour écrire les données des enfants avec validation
async function writeEnfantsData(data) {
    try {
        if (!Array.isArray(data)) {
            throw new Error('Les données doivent être un tableau');
        }
        await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Erreur lors de l\'écriture des données:', error);
        throw error;
    }
}

// Route pour récupérer tous les enfants
app.get('/api/enfants', async (req, res) => {
    try {
        const enfants = await readEnfantsData();
        res.json({
            success: true,
            data: enfants,
            message: 'Enfants récupérés avec succès',
            count: enfants.length
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des enfants:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des enfants',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Erreur interne'
        });
    }
});

// Route pour sauvegarder un enfant avec validation améliorée
app.post('/api/enfants', async (req, res) => {
    try {
        const enfantData = req.body;
        
        // Validation stricte des données requises
        if (!enfantData.nom || !enfantData.prenom) {
            return res.status(400).json({
                success: false,
                message: 'Le nom et le prénom sont requis'
            });
        }

        // Nettoyer et valider les données
        const cleanData = {
            nom: enfantData.nom.trim(),
            prenom: enfantData.prenom.trim(),
            age: enfantData.age || '',
            classe: enfantData.classe || '',
            nationalite: enfantData.nationalite || '',
            ethnie: enfantData.ethnie || '',
            orphelinPere: Boolean(enfantData.orphelinPere),
            orphelinMere: Boolean(enfantData.orphelinMere),
            nbFreres: enfantData.nbFreres || '',
            nbSoeurs: enfantData.nbSoeurs || '',
            nomPere: enfantData.nomPere || '',
            nomMere: enfantData.nomMere || '',
            membreFamille: enfantData.membreFamille || '',
            contactMembre: enfantData.contactMembre || '',
            signeParticulier: enfantData.signeParticulier || '',
            // Résultats scolaires
            moyenne1: enfantData.moyenne1 || '',
            rang1: enfantData.rang1 || '',
            effectif1: enfantData.effectif1 || '',
            forteMoyenne1: enfantData.forteMoyenne1 || '',
            faibleMoyenne1: enfantData.faibleMoyenne1 || '',
            appreciation1: enfantData.appreciation1 || '',
            moyenne2: enfantData.moyenne2 || '',
            rang2: enfantData.rang2 || '',
            effectif2: enfantData.effectif2 || '',
            forteMoyenne2: enfantData.forteMoyenne2 || '',
            faibleMoyenne2: enfantData.faibleMoyenne2 || '',
            appreciation2: enfantData.appreciation2 || '',
            moyenne3: enfantData.moyenne3 || '',
            rang3: enfantData.rang3 || '',
            effectif3: enfantData.effectif3 || '',
            forteMoyenne3: enfantData.forteMoyenne3 || '',
            faibleMoyenne3: enfantData.faibleMoyenne3 || '',
            appreciation3: enfantData.appreciation3 || '',
            // Résultat annuel
            moyenneAnnuelle: enfantData.moyenneAnnuelle || '',
            rangAnnuel: enfantData.rangAnnuel || '',
            effectifAnnuel: enfantData.effectifAnnuel || '',
            appreciationAnnuelle: enfantData.appreciationAnnuelle || '',
            decision: enfantData.decision || '',
            classeSuivante: enfantData.classeSuivante || '',
            // Photo
            photoEnfant: enfantData.photoEnfant || '',
            // Dates
            dateSauvegarde: new Date().toLocaleString('fr-FR')
        };

        const enfants = await readEnfantsData();
        
        // Vérifier si l'enfant existe déjà
        const existingIndex = enfants.findIndex(e => 
            e.nom === cleanData.nom && e.prenom === cleanData.prenom
        );

        if (existingIndex !== -1) {
            // Mettre à jour l'enfant existant
            enfants[existingIndex] = {
                ...enfants[existingIndex],
                ...cleanData,
                dateDerniereSauvegarde: new Date().toLocaleString('fr-FR')
            };
        } else {
            // Ajouter un nouvel enfant
            const nouvelEnfant = {
                id: Date.now().toString(),
                ...cleanData,
                dateAjout: new Date().toLocaleString('fr-FR')
            };
            enfants.push(nouvelEnfant);
        }

        await writeEnfantsData(enfants);

        res.json({
            success: true,
            message: existingIndex !== -1 ? 
                `Enfant ${cleanData.prenom} ${cleanData.nom} mis à jour avec succès` :
                `Nouvel enfant ${cleanData.prenom} ${cleanData.nom} ajouté avec succès`,
            data: enfants
        });

    } catch (error) {
        console.error('Erreur lors de la sauvegarde:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la sauvegarde',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Erreur interne'
        });
    }
});

// Route pour mettre à jour un enfant spécifique
app.put('/api/enfants/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const enfantData = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'ID de l\'enfant requis'
            });
        }

        const enfants = await readEnfantsData();
        const enfantIndex = enfants.findIndex(e => e.id === id);

        if (enfantIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Enfant non trouvé'
            });
        }

        enfants[enfantIndex] = {
            ...enfants[enfantIndex],
            ...enfantData,
            dateModification: new Date().toLocaleString('fr-FR')
        };

        await writeEnfantsData(enfants);

        res.json({
            success: true,
            message: `Enfant ${enfants[enfantIndex].prenom} ${enfants[enfantIndex].nom} modifié avec succès`,
            data: enfants[enfantIndex]
        });

    } catch (error) {
        console.error('Erreur lors de la modification:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la modification',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Erreur interne'
        });
    }
});

// Route pour supprimer un enfant
app.delete('/api/enfants/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'ID de l\'enfant requis'
            });
        }

        const enfants = await readEnfantsData();
        const enfantIndex = enfants.findIndex(e => e.id === id);

        if (enfantIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Enfant non trouvé'
            });
        }

        const enfantSupprime = enfants[enfantIndex];
        enfants.splice(enfantIndex, 1);
        await writeEnfantsData(enfants);

        res.json({
            success: true,
            message: `Enfant ${enfantSupprime.prenom} ${enfantSupprime.nom} supprimé avec succès`
        });

    } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la suppression',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Erreur interne'
        });
    }
});

// Route pour uploader une photo avec gestion d'erreur améliorée
app.post('/api/upload-photo', upload.single('photo'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Aucun fichier uploadé'
            });
        }

        // Vérifier la taille du fichier
        if (req.file.size > 5 * 1024 * 1024) {
            // Supprimer le fichier si trop gros
            await fs.unlink(req.file.path);
            return res.status(400).json({
                success: false,
                message: 'Le fichier est trop volumineux (max 5MB)'
            });
        }

        const photoUrl = `/uploads/${req.file.filename}`;
        
        res.json({
            success: true,
            message: 'Photo uploadée avec succès',
            data: {
                filename: req.file.filename,
                url: photoUrl,
                size: req.file.size,
                mimetype: req.file.mimetype
            }
        });

    } catch (error) {
        console.error('Erreur lors de l\'upload:', error);
        
        // Nettoyer le fichier en cas d'erreur
        if (req.file) {
            try {
                await fs.unlink(req.file.path);
            } catch (unlinkError) {
                console.error('Erreur lors de la suppression du fichier:', unlinkError);
            }
        }
        
        res.status(500).json({
            success: false,
            message: 'Erreur lors de l\'upload de la photo',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Erreur interne'
        });
    }
});

// Middleware pour gérer les erreurs d'upload
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                message: 'Le fichier est trop volumineux (max 5MB)'
            });
        }
        return res.status(400).json({
            success: false,
            message: 'Erreur lors de l\'upload du fichier',
            error: error.message
        });
    }
    next(error);
});

// Route pour exporter toutes les données
app.get('/api/export', async (req, res) => {
    try {
        const enfants = await readEnfantsData();
        
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', `attachment; filename="enfants_${new Date().toISOString().split('T')[0]}.json"`);
        
        res.json({
            exportDate: new Date().toISOString(),
            totalEnfants: enfants.length,
            enfants: enfants
        });

    } catch (error) {
        console.error('Erreur lors de l\'export:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur lors de l\'export',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Erreur interne'
        });
    }
});

// Route pour créer une sauvegarde
app.post('/api/backup', async (req, res) => {
    try {
        const enfants = await readEnfantsData();
        
        const backupFileName = `backup_${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
        const backupPath = path.join(backupDir, backupFileName);
        
        const backupData = {
            dateBackup: new Date().toISOString(),
            totalEnfants: enfants.length,
            enfants: enfants
        };
        
        await fs.writeFile(backupPath, JSON.stringify(backupData, null, 2));
        
        res.json({
            success: true,
            message: 'Sauvegarde créée avec succès',
            data: {
                filename: backupFileName,
                totalEnfants: enfants.length
            }
        });

    } catch (error) {
        console.error('Erreur lors de la sauvegarde:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la création de la sauvegarde',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Erreur interne'
        });
    }
});

// Route de santé du serveur
app.get('/api/health', async (req, res) => {
    try {
        // Vérifier l'état des dossiers
        const uploadsExists = await fs.access(uploadDir).then(() => true).catch(() => false);
        const dataExists = await fs.access(dataDir).then(() => true).catch(() => false);
        const backupExists = await fs.access(backupDir).then(() => true).catch(() => false);
        
        // Vérifier l'accès au fichier de données
        let dataAccessible = false;
        try {
            await readEnfantsData();
            dataAccessible = true;
        } catch (error) {
            console.error('Erreur d\'accès aux données:', error);
        }
        
        const healthStatus = {
            success: true,
            message: 'Serveur MGJC Enfants opérationnel',
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV || 'development',
            directories: {
                uploads: uploadsExists,
                data: dataExists,
                backup: backupExists
            },
            dataAccessible: dataAccessible,
            uptime: process.uptime()
        };
        
        res.json(healthStatus);
    } catch (error) {
        console.error('Erreur lors de la vérification de santé:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la vérification de santé',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Erreur interne'
        });
    }
});

// Route pour récupérer les informations du serveur
app.get('/api/info', (req, res) => {
    res.json({
        success: true,
        message: 'Informations du serveur MGJC Enfants',
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        port: PORT,
        timestamp: new Date().toISOString()
    });
});

// Gestion des erreurs globales
app.use((error, req, res, next) => {
    console.error('Erreur serveur:', error);
    res.status(500).json({
        success: false,
        message: 'Erreur interne du serveur',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Erreur interne'
    });
});

// Gestion des routes non trouvées
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route non trouvée',
        path: req.originalUrl
    });
});

// Initialisation et démarrage du serveur
async function startServer() {
    try {
        // Créer les dossiers nécessaires
        await createDirectories();
        
        // Démarrer le serveur
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`🚀 Serveur MGJC Enfants démarré sur le port ${PORT}`);
            console.log(`📊 API disponible sur http://localhost:${PORT}/api`);
            console.log(`🏥 Test de santé: http://localhost:${PORT}/api/health`);
            console.log(`🌐 Application: http://localhost:${PORT}`);
            console.log(`🔧 Environnement: ${process.env.NODE_ENV || 'development'}`);
        });
    } catch (error) {
        console.error('❌ Erreur lors du démarrage du serveur:', error);
        process.exit(1);
    }
}

// Démarrer le serveur
startServer();

module.exports = app; 