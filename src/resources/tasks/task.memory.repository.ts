import { Task, TaskParameters, EditTaskParameters } from './task.model';

const tasks: Task[] = [];

const getAllByUserId: (id: string) => Promise<Task[]> = async (id) =>
  tasks.filter((task) => task.userId === id);

const getAllByBoardId: (id: string) => Promise<Task[]> = async (id) =>
  tasks.filter((task) => task.boardId === id);

const getByBoardAndTaskId: (
  boardId: string,
  taskId: string
) => Promise<Task | undefined> = async (boardId, taskId) =>
  tasks.find((task) => task.boardId === boardId && task.id === taskId);

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
  const task = new Task({
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  });
  tasks.push(task);
  return task;
};

const deleteById: (id: string) => Promise<void> = async (id) => {
  tasks.splice(
    tasks.findIndex((task) => task.id === id),
    1
  );
};

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
}) => {
  const task = await getByBoardAndTaskId(boardId, taskId);
  if (task) {
    task.title = title;
    task.order = order;
    task.description = description;
    task.userId = userId;
    task.boardId = boardId;
    task.columnId = columnId;
  }
  return task;
};

export {
  getAllByBoardId,
  getByBoardAndTaskId,
  editByBoardAndTaskId,
  deleteById,
  add,
  getAllByUserId,
};
