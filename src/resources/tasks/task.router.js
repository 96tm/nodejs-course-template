const router = require('express').Router();
// const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/:boardId').get(async (req, res) => {
  const { boardId } = req.params;
  const tasks = await tasksService.getAllByBoardId(boardId);
  res.json(tasks);
});

module.exports = router;
