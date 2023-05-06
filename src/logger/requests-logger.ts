import winston from 'winston';
import { LoggerLevel } from './logger-level';
import { Request, Response } from 'express';
import { defaultLoggerFormat } from './utils';

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: 'logs/requests.log',
  }),
];

export const requestsLogger = winston.createLogger({
  level: LoggerLevel.Info,
  format: defaultLoggerFormat,
  transports,
});

// const stream: StreamOptions = {
//   write: (message) => {
//     logger.info(message);
//   },
// };

// export const morganMiddleware = morgan(
//   (tokens, req, res) => {
//     if (logger.level === LoggerLevel.Debug) {
//       const durationInMs = tokens['response-time'](req, res);
//       return `request #${serialRequestNumber} duration: ${durationInMs}ms`;
//     } else {
//       return `request | #${serialRequestNumber} | resource: ${req.url} | HTTP Verb ${req.method} | request #${serialRequestNumber}`;
//     }
//   },
//   { stream }
// );

let serialRequestNumber = 1;

export const requestsLoggerMiddleware = (req: Request, res: Response, next) => {
  const start = process.hrtime();
  res.on('finish', () => {
    const durationInMs = process.hrtime(start)[1] / 1000000;

    requestsLogger.info(
      `request | #${serialRequestNumber} | resource: ${req.baseUrl} | HTTP Verb ${req.method} | request #${serialRequestNumber}`
    );
  
    requestsLogger.debug(
      `request #${serialRequestNumber} duration: ${durationInMs}ms`
    );
    serialRequestNumber += 1;
  });

  return next();
};
