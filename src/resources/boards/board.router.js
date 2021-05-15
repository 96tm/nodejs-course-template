const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards);
});

router.route('/:boardId').get(async (req, res) => {
  const { boardId } = req.params;
  const board = await boardsService.getById(boardId);
  if (board) {
    res.json(board);
  } else {
    res.status(404).json({});
  }
});

router.route('/').post(async (req, res) => {
  const { title, columns } = req.body;
  if (!title) {
    res.status(400).json({});
  }
  const board = new Board({ title, columns });
  boardsService.addBoard(board);
  res.status(201).json(board);
});

router.route('/:boardId').put(async (req, res) => {
  const { boardId } = req.params;
  const { boardTitle, columns } = req.body;
  const board = await boardsService.editById(boardId, boardTitle, columns);
  if (board) {
    res.json(board);
  } else {
    res.status(404).json({});
  }
});

module.exports = router;
