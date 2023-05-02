"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoRouter = void 0;
const express_1 = __importDefault(require("express"));
const todo_status_1 = require("../models/todo-status");
const todo_status_request_1 = require("../models/todo-status-request");
const response_wrapper_utils_1 = require("../utils/response-wrapper-utils");
const todos_manager_service_1 = require("../services/todos-manager.service");
const string_utils_1 = require("../utils/string-utils");
const array_utils_1 = require("../utils/array-utils");
exports.todoRouter = express_1.default.Router();
exports.todoRouter.get('/health', (_, res) => {
    return res.status(200).send('OK');
});
exports.todoRouter.get('/size', (req, res) => {
    console.log(`get /todo/size: `, req.query);
    if (!(0, todo_status_request_1.getIsTodoStatusQueryParam)(req.query.status)) {
        return res.sendStatus(400);
    }
    return (0, response_wrapper_utils_1.wrapSuccessResponse)(res, req.query.status === 'ALL'
        ? todos_manager_service_1.todosManager.getTodosLength()
        : todos_manager_service_1.todosManager.getTodosByStatus(req.query.status).length);
});
exports.todoRouter.post('/', (req, res) => {
    console.log(`post /todo: `, req.body);
    if (req.body.dueDate < Date.now()) {
        return res.status(409).json({
            errorMessage: `Can’t create new TODO that its due date is in the past`,
        });
    }
    if (todos_manager_service_1.todosManager.isTitleExists(req.body.title)) {
        return res.status(409).json({
            errorMessage: `TODO with the title ${req.body.title} already exists in the system`,
        });
    }
    const todoId = todos_manager_service_1.todosManager.create(req.body.title, req.body.content, req.body.dueDate);
    return (0, response_wrapper_utils_1.wrapSuccessResponse)(res, todoId);
});
exports.todoRouter.get('/content', (req, res) => {
    var _a;
    if (!(0, todo_status_request_1.getIsTodoStatusQueryParam)(req.query.status)) {
        return res.sendStatus(400);
    }
    if (req.query.sortBy &&
        !['ID', 'DUE_DATE', 'TITLE'].includes(req.query.sortBy)) {
        return res.sendStatus(400);
    }
    const filteredByStatus = req.query.status === 'ALL'
        ? todos_manager_service_1.todosManager.getAllTodos()
        : todos_manager_service_1.todosManager.getTodosByStatus(req.query.status);
    const sortField = (0, string_utils_1.snakeToCamel)((_a = req.query.sortBy) !== null && _a !== void 0 ? _a : 'ID');
    return (0, response_wrapper_utils_1.wrapSuccessResponse)(res, (0, array_utils_1.sortByField)(filteredByStatus, sortField));
});
exports.todoRouter.put('/', (req, res) => {
    req.query.id = +req.query.id;
    console.log(`put /todo: `, req.query);
    if (todo_status_1.todoStatuses.every((todoStatus) => req.query.status !== todoStatus)) {
        return res.sendStatus(400);
    }
    if (!todos_manager_service_1.todosManager.isIdExists(req.query.id)) {
        return res.status(404).json({
            errorMessage: `Error: no such TODO with id ${req.query.id}`,
        });
    }
    const oldStatus = todos_manager_service_1.todosManager.changeTodoStatus(req.query.id, req.query.status);
    return (0, response_wrapper_utils_1.wrapSuccessResponse)(res, oldStatus);
});
exports.todoRouter.delete('/', (req, res) => {
    req.query.id = +req.query.id;
    if (!todos_manager_service_1.todosManager.isIdExists(req.query.id)) {
        return res.status(404).json({
            errorMessage: `Error: no such TODO with id ${req.query.id}`,
        });
    }
    todos_manager_service_1.todosManager.removeTodoById(req.query.id);
    return (0, response_wrapper_utils_1.wrapSuccessResponse)(res, todos_manager_service_1.todosManager.getTodosLength());
});
