import express from 'express';

export interface IMiddleware {
  (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void;
}
