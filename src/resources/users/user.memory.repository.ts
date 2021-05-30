import User from './user.model';

const users: User[] = [];

const getAll: () => Promise<User[]> = async () => users;

const getUserById: (id: string) => Promise<User | undefined> = async (id) =>
  users.find((user: User) => user.id === id);

const addUser: (user: User) => Promise<User> = async (user) => {
  users.push(user);
  return user;
};

const editUser: (
  id: string,
  name: string,
  login: string,
  password: string
) => Promise<User | undefined> = async (id, name, login, password) => {
  const user = await getUserById(id);
  if (user) {
    user.name = name || (await user).name;
    user.login = login || (await user).login;
    user.password = password || (await user).password;
  }
  return user;
};

const deleteUser: (id: string) => Promise<User | undefined> = async (id) => {
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
