import express from 'express';
import { createConnection } from 'typeorm';
// import { applyMiddleware } from 'express';
import * as bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
import swaggerUi from 'swagger-ui-express';
import specs from './swagger/swagger'; // Import the generated Swagger config


// Rest of your code

import routes from './routes/userRoutes';
import errorHandler from './middleware/errorHandler';

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', routes);

// Error handling middleware
app.use(errorHandler);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
// Connect to the database
createConnection().then(() => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(error => console.log('TypeORM connection error: ', error));
