module.exports = {
  apps : [{
    name: 'api',
    script: './src/index.js',
    cwd: '/home/kersten/production/current/server',
    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '512M',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production',
      REDIS_URL: 'redis://localhost:6379/',
      DATABASE_URL: 'postgres://kersten:hack0r0fl0r@localhost:5432/app',
      HOST: '127.0.0.1',
      PORT: 4000,
    }
  },{
    name: 'frontend',
    script: './node_modules/.bin/nuxt',
    cwd: '/home/kersten/production/current/client',
    args: 'start',
    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '512M',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production',
      HOST: '127.0.0.1',
      PORT: 3000
    }
  }],

  deploy : {
    production : {
      user : 'kersten',
      host : '192.168.178.65',
      ref  : 'origin/master',
      repo : 'git@github.com:BadMomber/scheeserenne-voting-app.git',
      path : '/home/kersten/production',
      'post-deploy' : 'npm --prefix server install && npm --prefix client install && npm --prefix server run migrate && npm --prefix client run build && pm2 reload ecosystem.config.js --env production',
      env  : {
        "NODE_ENV": "production",
        "DATABASE_URL": 'postgres://kersten:hack0r0fl0r@localhost:5432/app',
      }
    }
  }
};
