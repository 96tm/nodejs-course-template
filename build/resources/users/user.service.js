"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.editUser = exports.addUser = exports.getUserById = exports.getAll = void 0;
const user_memory_repository_1 = __importDefault(require("./user.memory.repository"));
const getAll = () => user_memory_repository_1.default.getAll();
exports.getAll = getAll;
const getUserById = (id) => user_memory_repository_1.default.getUserById(id);
exports.getUserById = getUserById;
const addUser = (user) => user_memory_repository_1.default.addUser(user);
exports.addUser = addUser;
const editUser = (id, name, login, password) => user_memory_repository_1.default.editUser(id, name, login, password);
exports.editUser = editUser;
const deleteUser = (id) => user_memory_repository_1.default.deleteUser(id);
exports.deleteUser = deleteUser;
