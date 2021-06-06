"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("./user.model"));
const users = [];
const getAll = async () => users;
const getUserById = async (id) => users.find((user) => user.id === id);
const addUser = async (user) => {
    users.push(user);
    return user;
};
const editUser = async (id, name, login, password) => {
    const user = await getUserById(id);
    if (user) {
        user.name = name || (await user).name;
        user.login = login || (await user).login;
        user.password = password || (await user).password;
    }
    return user;
};
const deleteUser = async (id) => {
    const userToDelete = await getUserById(id);
    if (userToDelete) {
        users.splice(users.findIndex((user) => user.id === id), 1);
    }
    return userToDelete;
};
exports.default = {
    getAll,
    getUserById,
    addUser,
    editUser,
    deleteUser,
    users: user_model_1.default,
};
