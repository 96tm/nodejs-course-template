import express from 'express';
import { INextFunction } from '../common/INextFunction';
import { StatusCodes } from 'http-status-codes';

export class CustomError extends Error {
  constructor(public statusCode: StatusCodes, public message: string) {
    super();
  }
}

export class ErrorHandler {
  logError(
    err: Error,
    req: express.Request,
    res: express.Response,
    next: INextFunction
  ): void {
    console.log('error log', err);
    next(err);
  }

  handleError(
    err: CustomError,
    req: express.Request,
    res: express.Response,
    next: INextFunction
  ): void {
    const { statusCode, message } = err;
    console.log('handled');

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
