import { Todo } from '../models/todo';
import { TodoStatus } from '../models/todo-status';
import { deepCopy } from '../utils/object-utils';

class TodosManager {
  private _todoList: Todo[] = [];
  private _nextAccumId = 1;

  public create(title: string, content: string, dueDate: number) {
    const currAccumId = this._nextAccumId;
    this._nextAccumId += 1;

    this._todoList.push({
      title: title,
      content: content,
      dueDate: dueDate,
      status: TodoStatus.Pending,
      id: currAccumId,
    });

    return currAccumId;
  }

  public getTodoById(id: number) {
    return deepCopy(this._todoList.find((todo) => todo.id === id));
  }

  public removeTodoById(id: number) {
    this._todoList = this._todoList.filter((todo) => todo.id !== id);
  }

  public changeTodoStatus(id: number, status: TodoStatus) {
    const todo = this._todoList.find((todo) => todo.id === id);
    const oldStatus = todo.status;
    todo.status = status;

    return oldStatus;
  }

  public getAllTodos() {
    return deepCopy(this._todoList);
  }
  
  public getTodosLength() {
    return this._todoList.length;
  }

  public getTodosByStatus(status: TodoStatus) {
    return deepCopy(this._todoList.filter((todo) => todo.status === status));
  }

  public isTitleExists(title: string) {
    return this._todoList.some((todo) => todo.title === title);
  }

  public isIdExists(id: number) {
    return this._todoList.some((todo) => todo.id === id);
  }
}

export const todosManager = new TodosManager();
