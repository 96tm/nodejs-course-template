"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const user_model_1 = __importDefault(require("./user.model"));
const usersService = __importStar(require("./user.service"));
const tasksService = __importStar(require("../tasks/task.service"));
const router = express_1.default.Router();
exports.router = router;
router.route('/').get(async (req, res) => {
    const users = await usersService.getAll();
    // map user fields to exclude secret fields like "password"
    res.json(users.map(user_model_1.default.toResponse));
});
router.route('/:id').get(async (req, res) => {
    const { id } = req.params;
    const user = await usersService.getUserById(id);
    if (user) {
        res.json(user_model_1.default.toResponse(user));
    }
    else {
        res.status(404).json({});
    }
});
router.route('/').post(async (req, res) => {
    const { name, login, password } = req.body;
    const user = new user_model_1.default({ name, login, password });
    usersService.addUser(user);
    res.status(201).json(user_model_1.default.toResponse(user));
});
router.route('/:id').put(async (req, res) => {
    const { id } = req.params;
    const { name, login, password } = req.body;
    const user = await usersService.editUser(id, name, login, password);
    if (user) {
        res.json(user);
    }
    else {
        res.status(404).json({});
    }
});
router.route('/:id').delete(async (req, res) => {
    const { id } = req.params;
    const userToDelete = await usersService.deleteUser(id);
    if (userToDelete) {
        const userTasks = await tasksService.getAllByUserId(id);
        userTasks.forEach((task) => {
            const taksCopyForLinter = task;
            taksCopyForLinter.userId = null;
        });
        res.status(204).json(userToDelete);
    }
    else {
        res.status(404).json({});
    }
});
