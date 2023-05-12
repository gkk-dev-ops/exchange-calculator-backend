const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Exchange Rates API Documentation',
      version: '1.0.0',
      description: 'API documentation for Exchange Rates API',
    },
  },
  apis: ['app.js'],
};

const specs = swaggerJsdoc(options);

module.exports = specs;