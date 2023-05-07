import { Response } from 'express';
import { stat } from 'fs';
import { todosLogger } from '../logger/todos-logger';

export const wrapSuccessResponse = (res: Response, data: any) => {
  return res.status(200).json({ result: data });
};

export const wrapFailResponse = (
  res: Response,
  status: number,
  errorMessage?: string
) => {
  if (!errorMessage) {
    return res.sendStatus(status);
  }

  todosLogger.error(`Error: ${errorMessage}`);
  return res.status(status).json({ errorMessage });
};
