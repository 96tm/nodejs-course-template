import * as boardsRepo from './board.memory.repository';

import Board from './board.model';

import Column from '../columns/column.model';

const getAll: () => Promise<Board[]> = () => boardsRepo.getAll();

const addBoard: (board: Board) => Promise<void> = (board) =>
  boardsRepo.addBoard(board);

const getById: (id: string) => Promise<Board | undefined> = (boardId) =>
  boardsRepo.getById(boardId);

const editById: (
  id: string,
  title: string,
  columns: Column[]
) => Promise<Board | undefined> = (id, title, columns) =>
  boardsRepo.editById(id, title, columns);

const deleteById: (id: string) => Promise<Board | undefined> = (id) =>
  boardsRepo.deleteById(id);

export { getAll, addBoard, getById, editById, deleteById };
