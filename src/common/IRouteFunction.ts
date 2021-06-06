import express from 'express';
import { INextFunction } from './INextFunction';

export interface IRouteFunction {
  (req: express.Request, res: express.Response, next: INextFunction): void;
}
