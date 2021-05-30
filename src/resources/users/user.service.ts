import usersRepo from './user.memory.repository';

const getAll = () => usersRepo.getAll();

const getUserById = (id: string) => usersRepo.getUserById(id);

const addUser = (user: User) => usersRepo.addUser(user);

const editUser = (id: string, name: string, login: string, password: string) =>
  usersRepo.editUser(id, name, login, password);

const deleteUser = (id: string) => usersRepo.deleteUser(id);

module.exports = { getAll, getUserById, addUser, editUser, deleteUser };
