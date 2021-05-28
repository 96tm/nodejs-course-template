const uuid = require('uuid').v4;

/**
 * @typedef {Object} UserResponse
 * @property {string} id - user id
 * @property {string} name - user name
 * @property {string} login - user login
 */

/** Class representing a user */
class User {
  /**
   * Creates an instance of User.
   * @param {Object} parameters - user parameters
   * @param {string} parameters.id - user id
   * @param {string} parameters.name - user name
   * @param {string} parameters.login - user login
   * @param {string} parameters.password - user password
   * @memberof User
   */
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Create object with parameters of given user
   * excluding the password
   *
   * @static
   * @param {User} user
   * @return {UserResponse} response - user response
   * @memberof User
   *
   * @example
   *
   *  User.toResponse(new User('name', 'login', 'password'))
   */
  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
