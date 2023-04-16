import express from 'express';
import { Request, Response } from 'express';
import { todoStatuses } from '../models/todo-status';
import { CreateTodoRequest } from '../models/create-todo-request';
import { getIsTodoStatusQueryParam } from '../models/todo-status-request';
import { GetContentQueryParams } from '../models/get-content-request';
import { TodoSizeQueryParams } from '../models/todo-size-query-params';
import { wrapSuccessResponse } from '../utils/response-wrapper-utils';
import { todosManager } from '../services/todos-manager.service';
import { snakeToCamel } from '../utils/string-utils';
import { sortByField } from '../utils/array-utils';
import { ChangeTodoStatusQueryParams } from '../models/change-todo-status-query-params';
import { DeleteTodoQueryParams } from '../models/delete-todo-query-params';

export const todoRouter = express.Router();

todoRouter.get('/health', (_, res: Response) => wrapSuccessResponse(res, 'OK'));

todoRouter.get(
  '/size',
  (req: Request<{}, {}, {}, TodoSizeQueryParams>, res: Response) => {
    console.log(`get /todo/size: `, req.query);
    if (!getIsTodoStatusQueryParam(req.query.status)) {
      return res.sendStatus(400);
    }

    return wrapSuccessResponse(
      res,
      req.query.status === 'ALL'
        ? todosManager.getTodosLength()
        : todosManager.getTodosByStatus(req.query.status).length
    );
  }
);

todoRouter.post('/', (req: Request<CreateTodoRequest>, res: Response) => {
  console.log(`post /todo: `, req.body);

  if (req.body.dueDate < Date.now()) {
    return res.status(409).json({
      errorMessage: `Can’t create new TODO that its due date is in the past`,
    });
  }

  if (todosManager.isTitleExists(req.body.title)) {
    return res.status(409).json({
      errorMessage: `TODO with the title ${req.body.title} already exists in the system`,
    });
  }

  const todoId = todosManager.create(
    req.body.title,
    req.body.content,
    req.body.dueDate
  );

  return wrapSuccessResponse(res, todoId);
});

todoRouter.get(
  '/content',
  (req: Request<{}, {}, {}, GetContentQueryParams>, res: Response) => {
    if (!getIsTodoStatusQueryParam(req.query.status)) {
      return res.sendStatus(400);
    }

    if (
      req.query.sortBy &&
      !['ID', 'DUE_DATE', 'TITLE'].includes(req.query.sortBy)
    ) {
      return res.sendStatus(400);
    }

    const filteredByStatus =
      req.query.status === 'ALL'
        ? todosManager.getAllTodos()
        : todosManager.getTodosByStatus(req.query.status);
    const sortField = snakeToCamel(req.query.sortBy ?? 'ID');

    return wrapSuccessResponse(res, sortByField(filteredByStatus, sortField));
  }
);

todoRouter.put(
  '/',
  (req: Request<{}, {}, {}, ChangeTodoStatusQueryParams>, res: Response) => {
    req.query.id = +req.query.id;

    console.log(`put /todo: `, req.query);
    if (todoStatuses.every((todoStatus) => req.query.status !== todoStatus)) {
      return res.sendStatus(400);
    }

    if (!todosManager.isIdExists(req.query.id)) {
      return res.status(404).json({
        errorMessage: `Error: no such TODO with id ${req.query.id}`,
      });
    }

    const oldStatus = todosManager.changeTodoStatus(
      req.query.id,
      req.query.status
    );

    return wrapSuccessResponse(res, oldStatus);
  }
);

todoRouter.delete(
  '/',
  (req: Request<{}, {}, {}, DeleteTodoQueryParams>, res: Response) => {
    req.query.id = +req.query.id;

    if (!todosManager.isIdExists(req.query.id)) {
      return res.status(404).json({
        errorMessage: `Error: no such TODO with id ${req.query.id}`,
      });
    }

    todosManager.removeTodoById(req.query.id);

    return wrapSuccessResponse(res, todosManager.getTodosLength());
  }
);
