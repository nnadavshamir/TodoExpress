"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIsTodoStatusQueryParam = void 0;
const todo_status_1 = require("./todo-status");
const getIsTodoStatusQueryParam = (str) => str === 'ALL' || todo_status_1.todoStatuses.some((todoStatus) => str === todoStatus);
exports.getIsTodoStatusQueryParam = getIsTodoStatusQueryParam;
