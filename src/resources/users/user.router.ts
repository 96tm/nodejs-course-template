import express from 'express';
import User from './user.model';
import { Task } from '../tasks/task.model';
import * as usersService from './user.service';
import * as tasksService from '../tasks/task.service';
import { StatusCodes } from 'http-status-codes';
import { ErrorHandler, CustomError } from '../../error-handling/ErrorHandler';

const wrapRoute = ErrorHandler.wrapRoute;

const router = express.Router();

router.route('/').get(
  wrapRoute(async (req, res) => {
    const users: User[] = await usersService.getAll();
    res.json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  wrapRoute(async (req, res) => {
    const { id } = req.params as { id: string };
    const user = await usersService.getUserById(id);
    if (user) {
      res.json(User.toResponse(user));
    } else {
      throw new CustomError(StatusCodes.NOT_FOUND, 'User not found');
    }
  })
);

router.route('/').post(
  wrapRoute(async (req, res) => {
    const { name, login, password } = req.body;
    const user = new User({ name, login, password });
    usersService.addUser(user);
    res.status(StatusCodes.CREATED).json(User.toResponse(user));
  })
);

router.route('/:id').put(
  wrapRoute(async (req, res) => {
    const { id } = req.params as { id: string };
    const { name, login, password } = req.body;
    const user = await usersService.editUser(id, name, login, password);
    if (user) {
      res.json(user);
    } else {
      throw new CustomError(StatusCodes.NOT_FOUND, 'User not found');
    }
  })
);

router.route('/:id').delete(
  wrapRoute(async (req, res) => {
    const { id } = req.params as { id: string };
    const userToDelete = await usersService.deleteUser(id);
    if (userToDelete) {
      const userTasks: Task[] = await tasksService.getAllByUserId(id);
      userTasks.forEach((task) => {
        const taksCopyForLinter = task;
        taksCopyForLinter.userId = null;
      });
      res.status(StatusCodes.NO_CONTENT).json(userToDelete);
    } else {
      throw new CustomError(StatusCodes.NOT_FOUND, 'User not found');
    }
  })
);

export { router };
