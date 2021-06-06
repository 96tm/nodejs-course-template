import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import { router as userRouter } from './resources/users/user.router';
import { router as boardRouter } from './resources/boards/board.router';
import { router as taskRouter } from './resources/tasks/task.router';
import { Logger } from './logging/Logger';
import { ErrorHandler, CustomError } from './error-handling/ErrorHandler';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

const logger = new Logger('./log.txt');
const errorHandler = new ErrorHandler();

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(logger.log.bind(logger));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.route('/error').get((req, res) => {
  throw new CustomError(500, 'Internal server error');
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards', taskRouter);

app.use(errorHandler.handleError.bind(errorHandler));

export default app;
