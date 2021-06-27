import bcrypt from 'bcrypt';
import { getRepository } from 'typeorm';

import User from '../../entity/User';

import { BCRYPT_ROUNDS } from '../../common/config';

const getAll: () => Promise<User[]> = async () => {
  const repository = getRepository(User);
  return repository.find({ where: {} });
};

const getById: (id: string) => Promise<User | null> = async (id) => {
  const repository = getRepository(User);
  const result = await repository.findOne({ where: { id: id } });
  if (result) {
    return Promise.resolve(result);
  }
  return Promise.resolve(null);
};

const update: (
  id: string,
  name: string,
  login: string,
  password: string
) => Promise<User | null> = async (id, name, login, password) => {
  const repository = getRepository(User);
  const user = await repository.findOne({ where: { id: id } });
  if (user) {
    Object.assign(user, {
      id,
      name,
      login,
      password: bcrypt.hashSync(password, 10),
    });
    return repository.save(user);
  }
  return Promise.resolve(null);
};

const add: ({
  id,
  name,
  login,
  password,
}: Partial<User>) => Promise<User> = async ({ id, name, login, password }) => {
  const repository = getRepository(User);
  const user = new User();
  user.id = id ? id : user.id;
  user.name = name as string;
  user.login = login as string;
  user.password = bcrypt.hashSync(password as string, BCRYPT_ROUNDS);
  const createdUser = await repository.create(user);
  return repository.save(createdUser);
};

const deleteUser: (id: string) => Promise<User | null> = async (id) => {
  const repository = getRepository(User);
  const user = await repository.findOne({ where: { id: id } });
  if (user) {
    const result = await repository.remove(user);
    if (result) {
      return Promise.resolve(result);
    }
  }
  return Promise.resolve(null);
};

export default {
  getAll,
  getById,
  add,
  update,
  deleteUser,
};
