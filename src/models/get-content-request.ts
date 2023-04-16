import { TodoStatusQueryParam } from './todo-status-request';

export interface GetContentQueryParams {
  status: TodoStatusQueryParam;
  sortBy?: 'ID' | 'DUE_DATE' | 'TITLE';
}
