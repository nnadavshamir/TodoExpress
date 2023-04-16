"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todosManager = void 0;
const todo_status_1 = require("../models/todo-status");
const object_utils_1 = require("../utils/object-utils");
class TodosManager {
    constructor() {
        this._todoList = [];
        this._nextAccumId = 1;
    }
    create(title, content, dueDate) {
        const currAccumId = this._nextAccumId;
        this._nextAccumId += 1;
        this._todoList.push({
            title: title,
            content: content,
            dueDate: dueDate,
            status: todo_status_1.TodoStatus.Pending,
            id: currAccumId,
        });
        return currAccumId;
    }
    getTodoById(id) {
        return (0, object_utils_1.deepCopy)(this._todoList.find((todo) => todo.id === id));
    }
    removeTodoById(id) {
        this._todoList = this._todoList.filter((todo) => todo.id !== id);
    }
    changeTodoStatus(id, status) {
        const todo = this._todoList.find((todo) => todo.id === id);
        const oldStatus = todo.status;
        todo.status = status;
        return oldStatus;
    }
    getAllTodos() {
        return (0, object_utils_1.deepCopy)(this._todoList);
    }
    getTodosLength() {
        return this._todoList.length;
    }
    getTodosByStatus(status) {
        return (0, object_utils_1.deepCopy)(this._todoList.filter((todo) => todo.status === status));
    }
    isTitleExists(title) {
        return this._todoList.some((todo) => todo.title === title);
    }
    isIdExists(id) {
        return this._todoList.some((todo) => todo.id === id);
    }
}
exports.todosManager = new TodosManager();
