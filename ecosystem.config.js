module.exports = {
  apps: [{
    name: 'mgjc-enfants',
    script: 'server.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    // Configuration pour le redémarrage automatique
    restart_delay: 4000,
    max_restarts: 10,
    min_uptime: '10s',
    // Configuration pour les logs
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    // Configuration pour la surveillance
    monitoring: true,
    // Configuration pour les métriques
    pmx: true
  }],

  deploy: {
    production: {
      user: 'root',
      host: 'votre-ip-serveur',
      ref: 'origin/main',
      repo: 'https://github.com/votre-repo/mgjc-enfants.git',
      path: '/var/www/mgjc-enfants',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
}; 