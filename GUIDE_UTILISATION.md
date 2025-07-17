# Guide d'Utilisation - Système MGJC Enfants

## 🚀 Démarrage Rapide

### 1. Installation et Démarrage du Serveur

#### Option A : Utilisation du script automatique (Windows)
```bash
# Double-cliquer sur le fichier
start-server.bat
```

#### Option B : Installation manuelle
```bash
# Installer les dépendances
npm install

# Démarrer le serveur
npm start

# Ou en mode développement
npm run dev
```

### 2. Accès à l'Application
1. Ouvrir le fichier `maquette.html` dans votre navigateur
2. Le système se connectera automatiquement au serveur
3. Vous verrez une notification de synchronisation si le serveur est disponible

## 📊 Fonctionnalités Principales

### Sauvegarde des Données
- **Sauvegarde automatique** : Les données sont sauvegardées automatiquement après 5 secondes d'inactivité
- **Sauvegarde manuelle** : Cliquer sur le bouton "💾 Sauvegarder"
- **Synchronisation serveur** : Les données sont sauvegardées sur le serveur ET en local
- **Mode hors ligne** : Si le serveur n'est pas disponible, les données sont sauvegardées localement

### Gestion des Enfants
- **Ajouter un enfant** : Cliquer sur "+ Ajouter" dans le menu
- **Sélectionner un enfant** : Utiliser le menu déroulant "Liste des enfants"
- **Modifier un enfant** : Sélectionner l'enfant puis cliquer sur "✏️ Modifier"
- **Supprimer un enfant** : Sélectionner l'enfant puis utiliser l'action admin "🗑️ Supprimer"

### Photos des Enfants
- **Upload de photo** : Cliquer sur "📷 Sélectionner une photo"
- **Stockage serveur** : Les photos sont uploadées sur le serveur
- **Fallback local** : Si le serveur n'est pas disponible, les photos sont stockées localement

## 🔐 Administration

### Connexion Administrateur
1. Cliquer sur "Admin ▼" dans la barre de navigation
2. Saisir les identifiants :
   - **Nom d'utilisateur** : `MGJC_Melchi`
   - **Mot de passe** : `Melchi171819`
3. Cliquer sur "Envoyer le code de vérification"
4. Saisir le code de vérification affiché
5. Cliquer sur "Confirmer la connexion"

### Actions Administratives Disponibles
- **➕ Ajouter un enfant** : Accès direct au formulaire d'ajout
- **✏️ Modifier un enfant** : Modifier les informations d'un enfant
- **🗑️ Supprimer un enfant** : Supprimer un enfant (avec confirmation)
- **📊 Exporter les données** : Télécharger toutes les données en JSON
- **💾 Sauvegarde système** : Créer une sauvegarde complète
- **🚪 Se déconnecter** : Fermer la session administrateur

## 📁 Structure des Données

### Informations d'Identité
- Nom et prénom
- Âge et classe
- Nationalité et ethnie
- Informations familiales (parents, frères/sœurs)
- Contact d'un membre de famille
- Signes particuliers

### Résultats Scolaires
- **1er Trimestre** : Moyenne, rang, effectif, appréciation
- **2ème Trimestre** : Moyenne, rang, effectif, appréciation
- **3ème Trimestre** : Moyenne, rang, effectif, appréciation
- **Résultat Annuel** : Moyenne annuelle, rang, décision, classe suivante

## 🔧 Configuration Avancée

### Variables d'Environnement
```bash
# Port du serveur (défaut: 3000)
export PORT=3000

# Environnement (development/production)
export NODE_ENV=development

# Niveau de logs
export LOG_LEVEL=info
```

### Configuration du Serveur
Le fichier `config.js` contient toutes les configurations :
- Port et host du serveur
- Limites d'upload (10MB max)
- Types de fichiers autorisés
- Configuration CORS
- Paramètres de sécurité

## 🛠️ Dépannage

### Le serveur ne démarre pas
1. **Vérifier Node.js** : `node --version` (version 14+ requise)
2. **Vérifier le port** : Le port 3000 doit être libre
3. **Vérifier les logs** : Regarder les messages d'erreur dans la console

### Erreur de connexion au serveur
1. **Vérifier que le serveur tourne** : `http://localhost:3000/api/health`
2. **Vérifier le firewall** : Le port 3000 doit être autorisé
3. **Vérifier l'URL** : L'URL du serveur dans le code est `http://localhost:3000/api`

### Erreur d'upload de photo
1. **Vérifier la taille** : Maximum 10MB
2. **Vérifier le format** : JPG, PNG, GIF, WebP uniquement
3. **Vérifier les permissions** : Le dossier `uploads/` doit être accessible en écriture

### Données non synchronisées
1. **Vérifier la connexion** : Le serveur doit être accessible
2. **Synchroniser manuellement** : Recharger la page
3. **Vérifier les logs** : Regarder les erreurs dans la console du navigateur

## 📊 API Endpoints

### Test de Santé
```
GET /api/health
```

### Gestion des Enfants
```
GET    /api/enfants          # Récupérer tous les enfants
POST   /api/enfants          # Sauvegarder un enfant
PUT    /api/enfants/:id      # Modifier un enfant
DELETE /api/enfants/:id      # Supprimer un enfant
```

### Photos
```
POST /api/upload-photo       # Uploader une photo
```

### Export et Sauvegarde
```
GET  /api/export            # Exporter toutes les données
POST /api/backup            # Créer une sauvegarde
```

## 🔒 Sécurité

### Mesures de Sécurité Implémentées
- **Validation des données** : Toutes les entrées sont validées
- **Limitation de taille** : Fichiers limités à 10MB
- **Filtrage des types** : Seules les images sont acceptées
- **CORS configuré** : Permet les requêtes depuis le frontend
- **Gestion d'erreurs** : Erreurs gérées proprement

### Recommandations de Production
1. **Utiliser HTTPS** : Pour la sécurité des données
2. **Configurer un firewall** : Limiter l'accès au serveur
3. **Sauvegardes régulières** : Automatiser les sauvegardes
4. **Monitoring** : Surveiller les performances du serveur
5. **Logs** : Conserver les logs pour audit

## 📞 Support

### En Cas de Problème
1. **Vérifier les logs** : Console du navigateur et serveur
2. **Tester la connexion** : `http://localhost:3000/api/health`
3. **Redémarrer le serveur** : Arrêter et relancer le serveur
4. **Vérifier les permissions** : Droits d'écriture sur les dossiers

### Contact
- **Développeur** : Équipe MGJC
- **Email** : borisakpatcha@gmail.com
- **WhatsApp** : +228 98 17 18 19

## 📝 Notes Importantes

### Sauvegarde
- Les données sont sauvegardées automatiquement
- Une copie locale est toujours conservée
- La synchronisation avec le serveur se fait au démarrage

### Performance
- Le système fonctionne même hors ligne
- Les photos sont optimisées automatiquement
- La sauvegarde automatique évite la perte de données

### Compatibilité
- Compatible avec tous les navigateurs modernes
- Fonctionne sur Windows, Mac, Linux
- Responsive design pour mobile et desktop 