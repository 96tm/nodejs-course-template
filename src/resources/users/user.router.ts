import express from 'express';
import User from './user.model';
import { Task } from '../tasks/task.model';
import * as usersService from './user.service';
import * as tasksService from '../tasks/task.service';
import { StatusCodes } from 'http-status-codes';

const router = express.Router();

router.route('/').get(async (req, res) => {
  const users: User[] = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const user = await usersService.getUserById(id);
  if (user) {
    res.json(User.toResponse(user));
  } else {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
  }
});

router.route('/').post(async (req, res) => {
  const { name, login, password } = req.body;
  const user = new User({ name, login, password });
  usersService.addUser(user);
  res.status(StatusCodes.CREATED).json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const { name, login, password } = req.body;
  const user = await usersService.editUser(id, name, login, password);
  if (user) {
    res.json(user);
  } else {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
  }
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  const userToDelete = await usersService.deleteUser(id);
  if (userToDelete) {
    const userTasks: Task[] = await tasksService.getAllByUserId(id);
    userTasks.forEach((task) => {
      const taksCopyForLinter = task;
      taksCopyForLinter.userId = null;
    });
    res.status(StatusCodes.NO_CONTENT).json(userToDelete);
  } else {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
  }
});

export { router };
