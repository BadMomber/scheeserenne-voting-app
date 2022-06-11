module.exports = {
  apps: [
    {
      name: "api",
      script: "./src/index.js",
      cwd: "/home/root/production/source/server",
      // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "development",
        REDIS_URL: "redis://localhost:6379/",
        DATABASE_URL: "postgres://root:kk86227KR@localhost:5432/sva",
        HOST: "127.0.0.1",
        PORT: 4000,
      },
      env_production: {
        NODE_ENV: "production",
        REDIS_URL: "redis://localhost:6379/",
        DATABASE_URL: "postgres://root:kk86227KR@localhost:5432/sva",
        HOST: "127.0.0.1",
        PORT: 4000,
      },
    },
    {
      name: "frontend",
      script: "./node_modules/.bin/nuxt",
      cwd: "/home/root/production/source/client",
      args: "start",
      // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "development",
        HOST: "127.0.0.1",
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: "production",
        HOST: "127.0.0.1",
        PORT: 3000,
      },
    },
  ],

  deploy: {
    production: {
      user: "root",
      host: "167.71.43.9",
      ref: "origin/master",
      repo: "git@github.com:BadMomber/scheeserenne-voting-app.git",
      path: "/home/root/production",
      "post-deploy":
        "npm --prefix server install && npm --prefix client install && npm --prefix client run build && npm --prefix server run migrate && pm2 reload ecosystem.config.js --env production && pm2 restart all",
      env: {
        NODE_ENV: "production",
        DATABASE_URL: "postgres://root:kk86227KR@localhost:5432/sva",
      },
    },
  },
};
