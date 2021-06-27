import express from 'express';
import { getRepository } from 'typeorm';
import User from '../entity/User';

import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import { JWT_SECRET_KEY } from '../common/config';
import jwt from 'jsonwebtoken';

import { ErrorHandler, CustomError } from '../error-handling/ErrorHandler';

const handleErrors = ErrorHandler.handleErrors;

const router = express.Router();

router.route('/').post(
  handleErrors(async (req, res, next) => {
    const { login, password } = req.body;
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { login } });
    if (user) {
      bcrypt.compare(password, user.password, function (err, matches) {
        if (matches) {
          const token = jwt.sign(
            { userId: user.id, login: user.login },
            String(JWT_SECRET_KEY),
            {
              expiresIn: 60 * 60 * 24,
            }
          );
          res.json({
            token,
          });
        } else {
          next(
            new CustomError(StatusCodes.BAD_REQUEST, "Passwords don't match")
          );
        }
      });
    } else {
      throw new CustomError(StatusCodes.BAD_REQUEST, 'User not found');
    }
  })
);

export { router };
