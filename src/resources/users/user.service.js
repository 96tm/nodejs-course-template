const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const getUserById = id => usersRepo.getUserById(id);
const addUser = user => usersRepo.addUser(user);
const editUser = (id, name, login, password) => {
  return usersRepo.editUser(id, name, login, password);
};
const deleteUser = id => usersRepo.deleteUser(id);

module.exports = { getAll, getUserById, addUser, editUser, deleteUser };
