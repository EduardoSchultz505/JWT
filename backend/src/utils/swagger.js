const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.3',

    info: {
      title: 'API do Projeto de Autenticação JWT (Express/MySQL)',
      version: '1.0.0',
      description:
        'Documentação da API utilizando JWT armazenado em Cookie HTTP-Only.'
    },

    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Servidor de Desenvolvimento'
      }
    ],

    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'jwt',
          description:
            'Autenticação via Cookie HTTP-Only contendo o JWT.'
        }
      },

      schemas: {
        Login: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'usuario@exemplo.com'
            },
            password: {
              type: 'string',
              format: 'password',
              example: 'senhaforte123'
            }
          }
        },

        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Erro na requisição'
            }
          }
        }
      }
    }
  },

  apis: [
    './src/routes/*.js',
    './server.js'
  ]
};

const swaggerSpecs = swaggerJsdoc(options);

function swaggerDocs(app) {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpecs)
  );

  console.log(
    'Swagger disponível em http://localhost:5000/api-docs'
  );
}

module.exports = { swaggerDocs };
