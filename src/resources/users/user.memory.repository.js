const User = require('./user.model');

const users = [
  new User({ name: 'John', login: 'john', password: '12345' }),
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
};

module.exports = { getAll, getUserById, addUser };
