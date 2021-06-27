import express from 'express';
import { getRepository } from 'typeorm';
import User from '../entity/User';

class Auth {
  static async checkAuth(id: string): Promise<User | undefined> {
    const userRepository = getRepository(User);
    return userRepository.findOne({ where: { id } });
  }

  static authenticate(
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

  static async validate(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    next();
  }
}

export { Auth };
