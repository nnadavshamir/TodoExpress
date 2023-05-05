import { Response } from 'express';

export const wrapSuccessResponse = (res: Response, data: any) => {
  return res.status(200).json({ result: data });
};
