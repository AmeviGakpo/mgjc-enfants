module.exports = {
    // Configuration du serveur
    server: {
        port: process.env.PORT || 3000,
        host: process.env.HOST || 'localhost'
    },
    
    // Configuration de la base de données
    database: {
        file: './data/enfants.json',
        backupDir: './backups',
        uploadDir: './uploads'
    },
    
    // Configuration des uploads
    upload: {
        maxFileSize: 10 * 1024 * 1024, // 10MB
        allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
        destination: './uploads'
    },
    
    // Configuration CORS
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    },
    
    // Configuration de sécurité
    security: {
        rateLimit: {
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100 // limite chaque IP à 100 requêtes par fenêtre
        }
    },
    
    // Configuration des logs
    logging: {
        level: process.env.LOG_LEVEL || 'info',
        format: 'combined'
    },
    
    // Configuration de l'environnement
    environment: process.env.NODE_ENV || 'development',
    
    // URLs de l'API
    api: {
        baseUrl: '/api',
        endpoints: {
            health: '/health',
            enfants: '/enfants',
            upload: '/upload-photo',
            export: '/export',
            backup: '/backup'
        }
    }
}; 