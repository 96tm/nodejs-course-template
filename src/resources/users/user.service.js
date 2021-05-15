const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const getUserById = id => usersRepo.getUserById(id);
const addUser = user => usersRepo.addUser(user);

module.exports = { getAll, getUserById, addUser };
