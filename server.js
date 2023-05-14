const strapi = require('@strapi/strapi');

process.chdir(__dirname);

strapi(/* {...} */).start();