import User from '../../entity/User';
import usersRepo from './user.repository';

const getAll: () => Promise<User[]> = () => usersRepo.getAll();

const getById: (id: string) => Promise<User | null> = (id) =>
  usersRepo.getById(id);

const add: (user: Partial<User>) => Promise<User> = (user) =>
  usersRepo.add(user);

const update: (
  id: string,
  name: string,
  login: string,
  password: string
) => Promise<User | null> = (
  id: string,
  name: string,
  login: string,
  password: string
) => usersRepo.update(id, name, login, password);

const deleteUser: (id: string) => Promise<User | null> = (id) =>
  usersRepo.deleteUser(id);

export { getAll, getById, add, update, deleteUser };
