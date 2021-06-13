import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import { router as userRouter } from './resources/users/user.router';
import { router as boardRouter } from './resources/boards/board.router';
import { router as taskRouter } from './resources/tasks/task.router';
import { Logger } from './logging/Logger';
import { ErrorHandler, CustomError } from './error-handling/ErrorHandler';
import { StatusCodes } from 'http-status-codes';

const UNHANDLED_ERROR_CODE = 1;

process.on('uncaughtExceptionMonitor', (err) => {
  logger.logUncaughtError(err);
  process.exit(UNHANDLED_ERROR_CODE);
});

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

const logger = new Logger('./log.txt', './errors.txt', './crash-report.txt');
const errorHandler = new ErrorHandler();

app.use(express.json());

app.use((req, res, next) => {
  res.on('finish', () => {
    if (res.statusCode !== StatusCodes.NOT_FOUND) {
      logger.log.bind(logger)(req, res, next);
    }
  });
  next();
});

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!1');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards', taskRouter);

app.use((req, res, next) => {
  next(new CustomError(StatusCodes.NOT_FOUND, 'Page not found'));
});

app.use(logger.logError.bind(logger));

app.use(errorHandler.handleError.bind(errorHandler));

process.on('unhandledRejection', (err: PromiseRejectionEvent) => {
  logger.logUnhandledRejection(err);
});

export default app;
