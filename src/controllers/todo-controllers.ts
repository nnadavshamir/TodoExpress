import express from 'express';
import { Request, Response } from 'express';
import { todoStatuses } from '../models/todo-status';
import { CreateTodoRequest } from '../models/create-todo-request';
import { getIsTodoStatusQueryParam } from '../models/todo-status-request';
import { GetContentQueryParams } from '../models/get-content-request';
import { TodoSizeQueryParams } from '../models/todo-size-query-params';
import {
  wrapFailResponse,
  wrapSuccessResponse,
} from '../utils/response-wrapper-utils';
import { todosManager } from '../services/todos-manager.service';
import { snakeToCamel } from '../utils/string-utils';
import { sortByField } from '../utils/array-utils';
import { ChangeTodoStatusQueryParams } from '../models/change-todo-status-query-params';
import { DeleteTodoQueryParams } from '../models/delete-todo-query-params';
import { todosLogger as logger } from '../logger/todos-logger';

export const todoRouter = express.Router();

todoRouter.get('/health', (_, res: Response) => {
  return res.status(200).send('OK');
});

todoRouter.get(
  '/size',
  (req: Request<{}, {}, {}, TodoSizeQueryParams>, res: Response) => {
    if (!getIsTodoStatusQueryParam(req.query.status)) {
      return wrapFailResponse(res, 400);
      res.sendStatus(400);
    }

    const result =
      req.query.status === 'ALL'
        ? todosManager.getTodosLength()
        : todosManager.getTodosByStatus(req.query.status).length;

    logger.info(`Total TODOs count for state ${req.query.status} is ${result}`);

    return wrapSuccessResponse(res, result);
  }
);

todoRouter.post('/', (req: Request<CreateTodoRequest>, res: Response) => {
  logger.info(`Creating new TODO with Title [${req.body.title}]`);
  logger.debug(
    `Currently there are ${todosManager.getTodosLength()} Todos in the system.
     New TODO will be assigned with id ${todosManager.getNextId()}`
  );

  if (req.body.dueDate < Date.now()) {
    return wrapFailResponse(
      res,
      409,
      `Can’t create new TODO that its due date is in the past`
    );
  }

  if (todosManager.isTitleExists(req.body.title)) {
    return wrapFailResponse(
      res,
      409,
      `TODO with the title ${req.body.title} already exists in the system`
    );
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
    logger.info(
      `Extracting todos content. Filter: ${req.query.status} | Sorting by: ${req.query.sortBy}`
    );

    if (!getIsTodoStatusQueryParam(req.query.status)) {
      return wrapFailResponse(res, 400);
    }

    if (
      req.query.sortBy &&
      !['ID', 'DUE_DATE', 'TITLE'].includes(req.query.sortBy)
    ) {
      return wrapFailResponse(res, 400);
    }

    const filteredByStatus =
      req.query.status === 'ALL'
        ? todosManager.getAllTodos()
        : todosManager.getTodosByStatus(req.query.status);
    const sortField = snakeToCamel(req.query.sortBy ?? 'ID');

    logger.debug(
      `There are a total of ${todosManager.getTodosLength()} todos in the system. The result holds ${
        filteredByStatus.length
      } todos`
    );

    return wrapSuccessResponse(res, sortByField(filteredByStatus, sortField));
  }
);

todoRouter.put(
  '/',
  (req: Request<{}, {}, {}, ChangeTodoStatusQueryParams>, res: Response) => {
    req.query.id = +req.query.id;

    logger.info(
      `Update TODO id [${req.query.id}] state to ${req.query.status}`
    );

    if (todoStatuses.every((todoStatus) => req.query.status !== todoStatus)) {
      return wrapFailResponse(res, 400);
    }

    if (!todosManager.isIdExists(req.query.id)) {
      return wrapFailResponse(res, 409, `no such TODO with id ${req.query.id}`);
    }

    const oldStatus = todosManager.changeTodoStatus(
      req.query.id,
      req.query.status
    );

    logger.debug(
      `Todo id [${req.query.id}] state change: ${oldStatus} --> ${req.query.status}`
    );

    return wrapSuccessResponse(res, oldStatus);
  }
);

todoRouter.delete(
  '/',
  (req: Request<{}, {}, {}, DeleteTodoQueryParams>, res: Response) => {
    req.query.id = +req.query.id;

    logger.info(`Removing todo id ${req.query.id}`);

    if (!todosManager.isIdExists(req.query.id)) {
      return res.status(404).json({
        errorMessage: `Error: no such TODO with id ${req.query.id}`,
      });
    }

    todosManager.removeTodoById(req.query.id);

    logger.debug(
      `After removing todo id [${
        req.query.id
      }] there are ${todosManager.getTodosLength()} TODOs in the system`
    );

    return wrapSuccessResponse(res, todosManager.getTodosLength());
  }
);
