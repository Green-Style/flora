const log_date_format = "YYYY-MM-DD HH:mm:ss";

module.exports = {
  apps: [
    {
      name: 'flora-dev',
      script: '/home/azureuser/apps/dev/flora/server.js',
      interpreter: "node@18.13.0",
      watch: false,
      log_date_format,
      env: {
        NODE_ENV: "production",
        PORT: 1337,
        HOST: "0.0.0.0",
        ADMIN_JWT_SECRET: "FH+HSyeBxO/SM3+YwZMV8A==",
        JWT_SECRET: "YS9dNPeG60b73cfxT4Fy3w==",
        TRANSFER_TOKEN_SALT: "pOl28s7RWk6cBhFOPS1kXg==",
        APP_KEYS: "bKnrNvOHX/XU16eSwX5cCA==,sr2Hv+p6J0vdEL62WVD/wQ==,E0tlHZkMPuQQn4sBHuMjVw==,Saerx02z/i6Ps6NwUg9hSg==",
        API_TOKEN_SALT: "mmVHyi1WGlXXCpuOe2uNKA==",
        DATABASE_CLIENT: "postgres",
        DATABASE_URLL: "postgres://greenstyleadmin:9YAmmRv02bMVQVJCBPc0lv59nYRXiewO3mDYspY29H3e7bcJW4@greenstyle.postgres.database.azure.com/greenstyleDev?ssl=true",
        DATABASE_SSL: true
      },
    },
  ],
};
