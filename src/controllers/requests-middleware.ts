import { Request, Response } from 'express';
import { requestsLogger } from '../logger/requests-logger';
import {
  increamentRequestNumber,
  serialRequestNumber,
} from '../utils/logger-utils';

export const requestsLoggerMiddleware = (req: Request, res: Response, next) => {
  const start = process.hrtime();
  res.on('finish', () => {
    const durationInMs = process.hrtime(start)[1] / 1000000;

    // Annoying hack to remove '/' from the end of the path
    const resourcePath = req.path === '/' ? '' : req.path;

    requestsLogger.info(
      `Incoming request | #${serialRequestNumber} | resource: ${
        req.baseUrl + resourcePath
      } | HTTP Verb ${req.method}`
    );

    requestsLogger.debug(
      `request #${serialRequestNumber} duration: ${durationInMs}ms`
    );

    increamentRequestNumber();
  });

  return next();
};
