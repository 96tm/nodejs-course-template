import User from './user.model';
import usersRepo from './user.memory.repository';

const getAll: () => Promise<User[]> = () => usersRepo.getAll();

const getUserById: (id: string) => Promise<User | undefined> = (id) =>
  usersRepo.getUserById(id);

const addUser: (user: User) => Promise<User> = (user) =>
  usersRepo.addUser(user);

const editUser: (
  id: string,
  name: string,
  login: string,
  password: string
) => Promise<User | undefined> = (
  id: string,
  name: string,
  login: string,
  password: string
) => usersRepo.editUser(id, name, login, password);

const deleteUser: (id: string) => Promise<User | undefined> = (id) =>
  usersRepo.deleteUser(id);

export { getAll, getUserById, addUser, editUser, deleteUser };
