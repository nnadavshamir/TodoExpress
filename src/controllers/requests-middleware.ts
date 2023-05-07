import { Request, Response } from 'express';
import { requestsLogger } from '../logger/requests-logger';
import { increamentRequestNumber, serialRequestNumber } from '../utils/logger-utils';

export const requestsLoggerMiddleware = (req: Request, res: Response, next) => {
  const start = process.hrtime();
  res.on('finish', () => {
    const durationInMs = process.hrtime(start)[1] / 1000000;

    requestsLogger.info(
      `Incoming request | #${serialRequestNumber} | resource: ${
        req.baseUrl + req.path
      } | HTTP Verb ${req.method}`
    );

    requestsLogger.debug(
      `request #${serialRequestNumber} duration: ${durationInMs}ms`
    );

    increamentRequestNumber();
  });

  return next();
};
