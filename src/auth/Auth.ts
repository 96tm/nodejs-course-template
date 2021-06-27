import express from 'express';

// import jwt from 'jsonwebtoken';
// import { JWT_SECRET_KEY } from '../common/config';
// import { CustomError } from '../error-handling/ErrorHandler';
// import { StatusCodes } from 'http-status-codes';
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
    //   if (req.method == 'OPTIONS') {
    //     next(); // allowing options as a method for request
    //   } else {
    //     const sessionToken = req.headers.get('authorizaion')?.split(' ')[1];
    //     if (!sessionToken) {
    //       throw new CustomError(StatusCodes.FORBIDDEN, 'No token provided');
    //     } else {
    //       jwt.verify(
    //         sessionToken,
    //         String(JWT_SECRET_KEY),
    //         async (err, decoded) => {
    //           if (err) {
    //             throw new CustomError(StatusCodes.BAD_REQUEST, 'Not authorized');
    //           } else {
    //             next();
    //             const user = await this.checkAuth(decoded?.id);
    //             if (user) {
    //               next();
    //             } else {
    //               throw new CustomError(StatusCodes.FORBIDDEN, 'Not authorized');
    //             }
    //             // User.findOne({ where: { id: decoded.id } }).then(
    //             //   (user) => {
    //             //     req.user = user;
    //             //     console.log(`user: ${user}`);
    //             //     next();
    //             //   },
    //             //   function () {
    //             //     res.status(401).send({ error: 'not authorized' });
    //             //   }
    //             // );
    //           }
    //         }
    //       );
    //     }
    //   }
    next();
  }
}

export { Auth };
