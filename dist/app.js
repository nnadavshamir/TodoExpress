"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todo_controllers_1 = require("./controllers/todo-controllers");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/todo', todo_controllers_1.todoRouter);
app.listen(8496, () => {
    console.log(`Server is running on port 8496`);
});
