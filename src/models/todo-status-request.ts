import { TodoStatus, todoStatuses } from "./todo-status";

export type TodoStatusQueryParam = 'ALL' | TodoStatus;

export const getIsTodoStatusQueryParam = (
  str: string
): str is TodoStatusQueryParam =>
  str === 'ALL' || todoStatuses.some((todoStatus) => str === todoStatus);
