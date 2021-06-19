import 'reflect-metadata';

import { getRepository } from 'typeorm';

import Board from '../../entity/Board';

import { IBoard } from '../../common/types';

const getAll: () => Promise<Board[]> = async () => {
  const repository = getRepository(Board);
  return repository.find({ where: {} });
};

const add: (board: Partial<IBoard>) => Promise<Board> = async (board) => {
  const repository = getRepository(Board);
  const newBoard = repository.create(board);
  repository.save(newBoard);
  return newBoard;
};

const getById: (id: string) => Promise<Board | null> = async (id) => {
  const repository = getRepository(Board);
  const result = await repository.findOne({ where: { id: id } });
  if (result) {
    return result;
  }
  return Promise.resolve(null);
};

const update: (
  id: string,
  title: string
  // columns: Column[]
) => Promise<Board | null> = async (id, title) => {
  const repository = getRepository(Board);
  const result = await repository.update(id, { id, title });
  if (result.raw) {
    return result.raw;
  }
  return Promise.resolve(null);
};

const deleteBoard: (id: string) => Promise<Board | null> = async (id) => {
  const repository = getRepository(Board);
  const result = await repository.delete(id);
  if (result.raw) {
    return result.raw;
  }
  return Promise.resolve(null);
};

export { getAll, add, getById, update, deleteBoard };
