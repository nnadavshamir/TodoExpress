import winston from 'winston';
import { LoggerLevel } from './logger-level';
import { defaultLoggerFormat } from '../utils/logger-utils';
import { LoggerType } from './logger-type';

const transports = [
  new winston.transports.File({
    filename: 'logs/todos.log',
    options: { flags: 'w' },
  }),
];

winston.loggers.add(LoggerType.Todo, {
  level: LoggerLevel.Info,
  format: defaultLoggerFormat,
  transports,
});

export const todosLogger = winston.loggers.get(LoggerType.Todo);