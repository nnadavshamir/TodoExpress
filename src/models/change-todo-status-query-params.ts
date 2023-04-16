import { TodoStatus } from './todo-status';

export interface ChangeTodoStatusQueryParams {
  id: number;
  status: TodoStatus;
}
