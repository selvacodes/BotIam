
import { z } from 'zod';
import { Request, Response, NextFunction } from 'express'

export const validate = <T extends z.ZodTypeAny>(schema: T) => (req: Request, res: Response, next: NextFunction) => {
  const result = schema.safeParse({
    body: req.body,
    query: req.query,
    params: req.params,
  });
  if (result.success) {
    next();
  } else {
    res.status(400).send("Invalid inputs")
  }
};