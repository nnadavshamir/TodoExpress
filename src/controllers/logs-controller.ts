import express from 'express';
import { Request, Response } from 'express';
import winston from 'winston';
import { requestsLogger } from '../logger/requests-logger';
import { loggerLevels } from '../logger/logger-level';
import { todosLogger } from '../logger/todos-logger';
import { LoggerType, loggerTypes } from '../logger/logger-type';

export const logsRouter = express.Router();

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

    if (!loggerTypes.includes(loggerNameParam)) {
      res.status(400).send(`logger-name cannot be ${loggerNameParam}`);
    }

    const logger = winston.loggers.get(loggerNameParam);
    return res.status(200).send(logger.level);
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

    const logger = winston.loggers.get(loggerNameParam);
    logger.level = loggerLevelParam.toLowerCase();

    return res.status(200).send(loggerLevelParam);
  });
