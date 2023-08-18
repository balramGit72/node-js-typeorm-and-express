# node-js-typeorm-and-express

Install the required packages using npm:
npm install express express-validator typeorm pg reflect-metadata
npm install @types/express @types/express-validator @types/node typescript ts-node

# create folder structure 
 mkdir -p src/{controllers,entities,middleware,routes,utils,swagger} && touch src/controllers/UserController.ts src/entities/User.ts src/middleware/authMiddleware.ts src/middleware/errorMiddleware.ts src/middleware/validation.ts src/routes/userRoutes.ts src/utils/helpers.ts src/utils/config.ts src/utils/constants.ts src/swagger/swagger.ts src/swagger/userSwagger.ts src/index.ts ormconfig.json tsconfig.json

Create TypeScript Configuration:
Create a tsconfig.json file in the root of your project. Here's a basic configuration:

{
    "compilerOptions": {
      "target": "ES6",
      "module": "commonjs",
      "outDir": "./dist",
      "rootDir": "./src",
      "strict": true,
      "esModuleInterop": true,
      "skipLibCheck": true,
      "forceConsistentCasingInFileNames": true,
      "experimentalDecorators": true,
      "emitDecoratorMetadata": true,
      "strictPropertyInitialization" : false,
    }
  }
  

Folder Structure:
- src
  - controllers
    -UserControllers.ts
  - entities
    - User.ts
  - middleware
    -authMiddleware.ts
    -errorMiddleware.ts
    -validation.ts
  - routes
   -userRoutes.ts
  - utils
    -helpers.ts
    -config.ts
    -constants.ts
  -swagger
    -swagger.ts
    -userSwagger.ts
  - index.ts
-ormconfig.json
-tsconfig.json


Run the Project:
Start the project using the TypeScript compiler and ts-node:
npx ts-node src/index.ts


TypeORM Configuration:
Make sure you've set up your TypeORM configuration correctly. Create a ormconfig.json file in your project's root or provide configuration through code. Here's an example of a basic ormconfig.json for PostgreSQL:

{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "your_username",
  "password": "your_password",
  "database": "your_database_name",
  "synchronize": true,
  "logging": true,
  "entities": ["src/entities/*.ts"],
  "cli": {
    "entitiesDir": "src/entities"
  }
}


Modify errorHandler Middleware:
Update the errorHandler.ts file to return a structured error response:

import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  // Check if the error has a status code; default to 500 if not present
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({ error: err.message });
};

export default errorHandler;

User find and findOne 
await userRepository.findOne({ where: { name } });

Install Dependencies:
Install the required package for working with JSON Web Tokens (JWT):
npm install jsonwebtoken

function generateAuthToken(userId: number) {
  return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
}

function verifyAuthToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization')
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token invalid or expired' });
    }
    // Attach the decoded user information to the request for later use
    req['user'] = decoded;
    next();
  });
}
router.get('/profile', verifyAuthToken, userController.getProfile);

import { body, validationResult } from 'express-validator';

export const createUserValidationRules = [
  body('name').notEmpty().withMessage('Name is required'),
  // Add more validation rules for other fields
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Public route (no authentication required)
router.post('/users', createUserValidationRules, validate , userController.createUser);


npm install nodemon ts-node --save-dev
 "start": "nodemon --exec npx ts-node src/index.ts"

add env file 
npm install dotenv --save


Install Dependencies:
Install the required packages for Swagger documentation:
npm install swagger-jsdoc swagger-ui-express --save


Create a Swagger Configuration:
Create a new file named swagger.js in your project's root directory:
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API',
      version: '1.0.0',
      description: 'Your API description',
    },
  },
  apis: ['./controllers/*.js'], // Path to your controller files
};

const specs = swaggerJsdoc(options);
module.exports = specs;


import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger'; // Import the generated Swagger config

// Use Swagger UI middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


