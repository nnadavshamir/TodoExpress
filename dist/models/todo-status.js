"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoStatuses = exports.TodoStatus = void 0;
var TodoStatus;
(function (TodoStatus) {
    TodoStatus["Pending"] = "PENDING";
    TodoStatus["Late"] = "LATE";
    TodoStatus["Done"] = "DONE";
})(TodoStatus = exports.TodoStatus || (exports.TodoStatus = {}));
exports.todoStatuses = Object.values(TodoStatus);
