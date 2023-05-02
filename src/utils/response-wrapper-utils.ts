import { Response } from 'express';

export const wrapSuccessResponse = (res: Response, data: any) => {
  // console.log(`Success\n ${JSON.stringify(data)}`);
  return res.status(200).json({ result: data });
};
