import winston from 'winston';
import { LoggerLevel } from './logger-level';
import { defaultLoggerFormat } from '../utils/logger-utils';
import { LoggerType } from './logger-type';

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: 'logs/requests.log',
    options: { flags: 'w' },
  }),
];

winston.loggers.add(LoggerType.Request, {
  level: LoggerLevel.Info,
  format: defaultLoggerFormat,
  transports,
});

export const requestsLogger = winston.loggers.get(LoggerType.Request);
