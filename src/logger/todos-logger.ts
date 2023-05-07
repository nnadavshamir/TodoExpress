import winston from 'winston';
import { LoggerLevel } from './logger-level';
import { defaultLoggerFormat } from '../utils/logger-utils';

const transports = [
  new winston.transports.File({
    filename: 'logs/todos.log',
  }),
];

export const todosLogger = winston.createLogger({
  level: LoggerLevel.Info,
  format: defaultLoggerFormat,
  transports,
});
