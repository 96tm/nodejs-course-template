/**
 * @module User repository
 * @desc Contains functions related to users
 */

const users: User[] = [];

/**
 * Get all users in the database
 *
 * @return {User[]} - all users
 *
 * @example
 *
 *  getAll()
 */
const getAll: () => void = async () => users;

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
const getUserById: (id: string) => User | undefined = async (id) =>
  users.find((user) => user.id === id);

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
const addUser = async (user) => {
  users.push(user);
  return user;
};

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
const editUser = async (id, name, login, password) => {
  const user = await getUserById(id);
  if (user) {
    user.name = name || (await user).name;
    user.login = login || (await user).login;
    user.password = password || (await user).password;
  }
  return user;
};

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
const deleteUser = async (id) => {
  const userToDelete = await getUserById(id);
  if (userToDelete) {
    users.splice(
      users.findIndex((user) => user.id === id),
      1
    );
  }
  return userToDelete;
};

export default {
  getAll,
  getUserById,
  addUser,
  editUser,
  deleteUser,
  users: User,
};
