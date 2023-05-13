import winston from 'winston';
import { LoggerLevel } from './logger-level';
import { defaultLoggerFormat } from '../utils/logger-utils';

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: 'logs/requests.log',
    options: { flags: 'w' },
  }),
];

export const requestsLogger = winston.createLogger({
  level: LoggerLevel.Info,
  format: defaultLoggerFormat,
  transports,
});
