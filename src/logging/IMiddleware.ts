import express from 'express';
import { INextFunction } from '../common/INextFunction';

export interface IMiddleware {
  (req: express.Request, res: express.Response, next: INextFunction): void;
}
