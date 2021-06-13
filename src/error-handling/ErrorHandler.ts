import express from 'express';
import { StatusCodes } from 'http-status-codes';

export class CustomError extends Error {
  constructor(public statusCode: StatusCodes, public message: string) {
    super();
  }
}

export class ErrorHandler {
  static SERVER_ERROR_MESSAGE = 'Internal server error';

  handleError(
    err: CustomError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void {
    let { statusCode, message } = err;
    if (!statusCode) {
      statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
      message = ErrorHandler.SERVER_ERROR_MESSAGE;
    }
    // this.logError()
    res.status(statusCode).json({ status: 'error', statusCode, message });
  }

  static wrapRoute(
    routeFunction: express.RequestHandler
  ): express.RequestHandler {
    function inner(
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) {
      const returned = routeFunction(req, res, next);
      return Promise.resolve(returned).catch(next);
    }
    return inner;
  }
}
