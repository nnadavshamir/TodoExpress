import { TodoStatus } from './todo-status';

export interface Todo {
  id: number;
  title: string;
  content: string;
  dueDate: number;
  status: TodoStatus;
}
