import express from 'express';
import User from '../../entity/User';
import * as usersService from './user.service';
import * as tasksService from '../tasks/task.service';
import { StatusCodes } from 'http-status-codes';
import { ErrorHandler, CustomError } from '../../error-handling/ErrorHandler';
import Task from '../../entity/Task';

const handleErrors = ErrorHandler.handleErrors;

const router = express.Router();

router.route('/').get(
  handleErrors(async (req, res) => {
    const users: User[] = await usersService.getAll();
    res.json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  handleErrors(async (req, res) => {
    const { id } = req.params as { id: string };
    const user = await usersService.getById(id);
    if (user) {
      res.json(User.toResponse(user));
    } else {
      throw new CustomError(StatusCodes.NOT_FOUND, 'User not found');
    }
  })
);

router.route('/').post(
  handleErrors(async (req, res) => {
    const user = await usersService.add({ ...req.body });
    res.status(StatusCodes.CREATED).json(User.toResponse(user));
  })
);

router.route('/:id').put(
  handleErrors(async (req, res) => {
    const { id } = req.params as { id: string };
    const { name, login, password } = req.body;
    const user = await usersService.update(id, name, login, password);
    if (user) {
      res.json(user);
    } else {
      throw new CustomError(StatusCodes.NOT_FOUND, 'User not found');
    }
  })
);

router.route('/:id').delete(
  handleErrors(async (req, res) => {
    const { id } = req.params as { id: string };
    const userToDelete = await usersService.deleteUser(id);
    if (userToDelete) {
      const userTasks: Task[] = await tasksService.getAllByUserId(id);
      userTasks.forEach((task) => {
        const taksCopyForLinter = task;
        taksCopyForLinter.user = null;
      });
      res.status(StatusCodes.NO_CONTENT).json(userToDelete);
    } else {
      throw new CustomError(StatusCodes.NOT_FOUND, 'User not found');
    }
  })
);

export { router };
