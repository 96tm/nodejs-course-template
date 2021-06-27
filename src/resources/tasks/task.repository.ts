import { EditTaskParameters, TaskParameters } from './task.model';
import Task from '../../entity/Task';
import { getRepository } from 'typeorm';
import User from '../../entity/User';
import Column from '../../entity/Column';
import Board from '../../entity/Board';

const getAllByUserId: (id: string) => Promise<Task[]> = async (id) => {
  const repository = getRepository(Task);
  return repository.find({ relations: ['user'], where: { user: { id: id } } });
};

const getAllByBoardId: (id: string) => Promise<Task[]> = async (id) => {
  const repository = getRepository(Task);
  return repository.find({
    relations: ['board'],
    where: { board: { id: id } },
  });
};

const getByBoardAndTaskId: (
  boardId: string,
  taskId: string
) => Promise<Task | null> = async (boardId, taskId) => {
  const repository = getRepository(Task);
  const result = await repository.findOne({
    where: { id: taskId, board: { id: boardId } },
    relations: ['board', 'column', 'user'],
  });
  if (result) {
    return Promise.resolve(result);
  }
  return Promise.resolve(null);
};

const add: ({
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
}: TaskParameters) => Promise<Task> = async ({
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
}) => {
  const repository = getRepository(Task);
  const userRepository = getRepository(User);
  const boardRepository = getRepository(Board);
  const columnRepository = getRepository(Column);
  const task = new Task();
  Object.assign(task, { title, order, description });
  const user = await userRepository.findOne({ where: { id: userId } });
  const board = await boardRepository.findOne({ where: { id: boardId } });
  const column = await columnRepository.findOne({ where: { id: columnId } });
  task.user = user ? user : null;
  task.board = board ? board : null;
  task.column = column ? column : null;
  // task
  await repository.save(task);

  return repository.findOne({
    where: { id: task.id },
    relations: ['board', 'user', 'column'],
  }) as Promise<Task>;
};

const deleteTask: (
  id: string,
  boardId: string
) => Promise<Task | null> = async (id, boardId) => {
  const repository = getRepository(Task);
  const result = await repository.delete({ id: id, board: { id: boardId } });
  if (result.raw) {
    return Promise.resolve(result.raw);
  }
  return Promise.resolve(null);
};

const update: ({
  boardId,
  taskId,
  title,
  order,
  description,
  userId,
  columnId,
}: EditTaskParameters) => Promise<Task | null> = async ({
  boardId,
  taskId,
  title,
  order,
  description,
  userId,
  columnId,
}) => {
  const repository = getRepository(Task);
  const userRepository = getRepository(User);
  const boardRepository = getRepository(Board);
  const columnRepository = getRepository(Column);
  const user = await userRepository.findOne({ where: { id: userId } });
  const board = await boardRepository.findOne({ where: { id: boardId } });
  const column = await columnRepository.findOne({ where: { id: columnId } });

  const task = await repository.findOne({
    where: { id: taskId },
    relations: ['board', 'column', 'user'],
  });
  if (task) {
    task.user = user || null;
    task.board = board || null;
    task.column = column || null;
    task.description = description;
    task.title = title;
    task.order = order;
    await repository.save(task);
    return Promise.resolve(task);
  }
  return Promise.resolve(null);
};

export {
  add,
  update,
  deleteTask,
  getAllByUserId,
  getAllByBoardId,
  getByBoardAndTaskId,
};
