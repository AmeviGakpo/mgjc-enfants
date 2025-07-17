# Serveur MGJC Enfants

Ce serveur permet de sauvegarder et gérer les données des enfants de l'église MGJC.

## 🚀 Installation

1. **Installer Node.js** (version 14 ou supérieure)
   - Télécharger depuis [nodejs.org](https://nodejs.org/)

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Démarrer le serveur**
   ```bash
   # Mode production
   npm start
   
   # Mode développement (avec rechargement automatique)
   npm run dev
   ```

## 📊 API Endpoints

### Test de santé
- **GET** `/api/health` - Vérifier que le serveur fonctionne

### Gestion des enfants
- **GET** `/api/enfants` - Récupérer tous les enfants
- **POST** `/api/enfants` - Sauvegarder un enfant
- **PUT** `/api/enfants/:id` - Modifier un enfant
- **DELETE** `/api/enfants/:id` - Supprimer un enfant

### Photos
- **POST** `/api/upload-photo` - Uploader une photo d'enfant

### Export et sauvegarde
- **GET** `/api/export` - Exporter toutes les données
- **POST** `/api/backup` - Créer une sauvegarde

## 📁 Structure des fichiers

```
maquette/
├── server.js          # Serveur principal
├── package.json       # Dépendances
├── README.md         # Documentation
├── data/             # Données des enfants
│   └── enfants.json
├── uploads/          # Photos uploadées
└── backups/          # Sauvegardes
```

## 🔧 Configuration

### Variables d'environnement
- `PORT` - Port du serveur (défaut: 3000)
- `NODE_ENV` - Environnement (development/production)

### Exemple de configuration
```bash
export PORT=3000
export NODE_ENV=development
```

## 📝 Utilisation

### Sauvegarder un enfant
```javascript
const response = await fetch('http://localhost:3000/api/enfants', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        nom: 'Dupont',
        prenom: 'Jean',
        age: 12,
        classe: '6ème',
        // ... autres données
    })
});
```

### Récupérer tous les enfants
```javascript
const response = await fetch('http://localhost:3000/api/enfants');
const data = await response.json();
console.log(data.data); // Liste des enfants
```

### Uploader une photo
```javascript
const formData = new FormData();
formData.append('photo', fileInput.files[0]);

const response = await fetch('http://localhost:3000/api/upload-photo', {
    method: 'POST',
    body: formData
});
```

## 🛡️ Sécurité

- CORS configuré pour permettre les requêtes depuis le frontend
- Validation des données d'entrée
- Limitation de la taille des fichiers (10MB max)
- Filtrage des types de fichiers (images uniquement)

## 🔍 Monitoring

Le serveur inclut :
- Logs détaillés des erreurs
- Validation des données
- Gestion des erreurs globales
- Endpoint de santé pour monitoring

## 📦 Déploiement

### Sur un serveur local
```bash
npm install
npm start
```

### Sur un serveur de production
```bash
# Installer PM2 pour la gestion des processus
npm install -g pm2

# Démarrer avec PM2
pm2 start server.js --name "mgjc-enfants"

# Vérifier le statut
pm2 status

# Voir les logs
pm2 logs mgjc-enfants
```

## 🐛 Dépannage

### Le serveur ne démarre pas
1. Vérifier que Node.js est installé : `node --version`
2. Vérifier que le port 3000 est libre
3. Vérifier les logs d'erreur

### Erreur de CORS
- Le serveur est configuré pour accepter toutes les origines
- Vérifier que l'URL du frontend est correcte

### Erreur d'upload de photo
- Vérifier que le fichier est une image
- Vérifier que la taille est inférieure à 10MB
- Vérifier les permissions du dossier uploads

## 📞 Support

Pour toute question ou problème :
- Créer une issue sur GitHub
- Contacter l'équipe de développement MGJC

## 📄 Licence

MIT License - Voir le fichier LICENSE pour plus de détails. 