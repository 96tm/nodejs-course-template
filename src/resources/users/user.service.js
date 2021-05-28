const usersRepo = require('./user.memory.repository');

/**
 * Get all users in the database
 *
 * @return {User[]} - all users
 *
 * @example
 *
 *  getAll()
 */
const getAll = () => usersRepo.getAll();

/**
 * Find and return user with given id;
 * return undefined if not found
 *
 * @param {string} id - user id
 *
 * @return {User|undefined} - found user or undefined
 *
 * @example
 *
 *  getUserById('1')
 */
const getUserById = (id) => usersRepo.getUserById(id);

/**
 * Add given user to database, then return the user
 *
 * @param {User} user - user to be added to the database
 * @return {User} - added user
 *
 * @example
 *
 *  addUser(new User('username', 'login', 'password'))
 */
const addUser = (user) => usersRepo.addUser(user);

/**
 * Find user with given id,
 * edit found object using given parameters
 * and return found user;
 * if not found, return undefined
 *
 * @param {string} id - user id
 * @param {string} name - user name
 * @param {string} login - user login
 * @param {string} password - user password
 * @return {User|undefined} - edited user or undefined
 *
 * @example
 *
 *  editUser('1', 'new name', 'new login', 'new password')
 */
const editUser = (id, name, login, password) =>
  usersRepo.editUser(id, name, login, password);

/**
 * Find user with given id,
 * delete and return found object;
 * return undefined if not found
 *
 * @param {string} id - user id
 * @return {User|undefined} - deleted useror undefined
 *
 * @example
 *
 *  deleteUser('1')
 */
const deleteUser = (id) => usersRepo.deleteUser(id);

module.exports = { getAll, getUserById, addUser, editUser, deleteUser };
