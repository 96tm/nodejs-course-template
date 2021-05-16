const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const tasksService = require('../tasks/task.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const user = await usersService.getUserById(id);
  if (user) {
    res.json(User.toResponse(user));
  } else {
    res.status(404).json({});
  }
});

router.route('/').post(async (req, res) => {
  const { name, login, password } = req.body;
  const user = new User({ name, login, password });
  usersService.addUser(user);
  res.status(201).json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const { name, login, password } = req.body;
  const user = await usersService.editUser(id, name, login, password);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({});
  }
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  const userToDelete = await usersService.deleteUser(id);
  if (userToDelete) {
    const userTasks = await tasksService.getAllByUserId(id);
    userTasks.forEach(task => (task.userId = null));
    res.status(204).json(userToDelete);
  } else {
    res.status(404).json({});
  }
});

module.exports = router;
