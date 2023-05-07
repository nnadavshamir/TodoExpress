import express from 'express';
import { Request, Response } from 'express';
import winston from 'winston';
import { requestsLogger } from '../logger/requests-logger';
import { loggerLevels } from '../logger/logger-level';
import { todosLogger } from '../logger/todos-logger';

export const logsRouter = express.Router();

enum LoggerType {
  Request = 'request-logger',
  Todo = 'todo-logger',
}

const loggerTypes = Object.values(LoggerType);

const loggerTypeToLogger: Record<LoggerType, winston.Logger> = {
  [LoggerType.Request]: requestsLogger,
  [LoggerType.Todo]: todosLogger,
};

export interface GetLoggerLevelParams {
  'logger-name': LoggerType;
}

export interface PutLoggerLevelParams {
  'logger-name': LoggerType;
  'logger-level': string;
}

logsRouter
  .route('/level')
  .get((req: Request<{}, {}, {}, GetLoggerLevelParams>, res: Response) => {
    const loggerNameParam = req.query['logger-name'];

    console.log(req.query);
    return loggerTypes.includes(loggerNameParam)
      ? res.status(200).send(loggerTypeToLogger[loggerNameParam].level)
      : res.status(400).send(`logger-name cannot be ${loggerNameParam}`);
  })
  .put((req: Request<{}, {}, {}, GetLoggerLevelParams>, res: Response) => {
    const loggerNameParam = req.query['logger-name'];
    const loggerLevelParam: string = req.query['logger-level'];

    if (!loggerTypes.includes(loggerNameParam)) {
      return res.status(400).send(`logger-name cannot be ${loggerNameParam}`);
    }

    if (
      loggerLevels.every(
        (loggerLevel) => loggerLevel.toUpperCase() !== loggerLevelParam
      )
    ) {
      return res.status(400).send(`logger-level cannot be ${loggerLevelParam}`);
    }

    loggerTypeToLogger[loggerNameParam].level = loggerLevelParam.toLowerCase();

    return res.status(200).send(loggerLevelParam);
  });
