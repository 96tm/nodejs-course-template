const User = require('./user.model');

const users = [
  new User({ id: '1', name: 'John', login: 'john', password: '12345' }),
  new User({ name: 'Dan', login: 'dan', password: '12345' }),
  new User({ name: 'Kelly', login: 'kelly', password: '12345' }),
  new User({ name: 'Sam', login: 'sam', password: '12345' }),
  new User({ name: 'Ann', login: 'ann', password: '12345' }),
  new User({ name: 'Jim', login: 'jim', password: '12345' })
];

const getAll = async () => {
  return users;
};

const getUserById = async id => {
  return users.find(user => user.id === id);
};

const addUser = async user => {
  users.push(user);
  return user;
};

const editUser = async (id, name, login, password) => {
  const user = await getUserById(id);
  if (user) {
    user.name = name ? name : (await user).name;
    user.login = login ? login : (await user).login;
    user.password = password ? password : (await user).password;
  }
  return user;
};

const deleteUser = async id => {
  const userToDelete = await getUserById(id);
  if (userToDelete) {
    users.splice(
      users.findIndex(user => user.id === id),
      1
    );
  }
  return userToDelete;
};

module.exports = { getAll, getUserById, addUser, editUser, deleteUser, users };
