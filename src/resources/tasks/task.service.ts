import * as tasksRepo from './task.memory.repository';
import { Task, TaskParameters, EditTaskParameters } from './task.model';

const getAllByUserId: (id: string) => Promise<Task[]> = (id) =>
  tasksRepo.getAllByUserId(id);

const getAllByBoardId: (id: string) => Promise<Task[]> = (id) =>
  tasksRepo.getAllByBoardId(id);

const add: ({
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
}: TaskParameters) => Promise<Task> = ({
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
}) =>
  tasksRepo.add({
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  });

const deleteById: (id: string) => Promise<void> = (id) =>
  tasksRepo.deleteById(id);

const getByBoardAndTaskId: (
  boardId: string,
  taskId: string
) => Promise<Task | undefined> = (boardId, taskId) =>
  tasksRepo.getByBoardAndTaskId(boardId, taskId);

const editByBoardAndTaskId: ({
  boardId,
  taskId,
  title,
  order,
  description,
  userId,
  columnId,
}: EditTaskParameters) => Promise<Task | undefined> = async ({
  boardId,
  taskId,
  title,
  order,
  description,
  userId,
  columnId,
}) =>
  tasksRepo.editByBoardAndTaskId({
    boardId,
    taskId,
    title,
    order,
    description,
    userId,
    columnId,
  });

export {
  getAllByBoardId,
  getByBoardAndTaskId,
  editByBoardAndTaskId,
  deleteById,
  add,
  getAllByUserId,
};
