import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Type Orm project',
      version: '1.0.0',
      description: 'Collect api doc ',
    },
  },
  apis: ['./src/swagger/*.ts'], // Path to your controller files
};

const specs = swaggerJsdoc(options);
export default specs;
