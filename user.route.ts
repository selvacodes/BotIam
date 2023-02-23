import { Request, Response } from 'express'
import express from 'express'
import { z } from 'zod';
import { validate } from './validate.middleware';
import { UserSchema } from './user.operations';

import bodyParser from 'body-parser'
const jsonParser = bodyParser.json()


export const userRouter = express.Router()

const UserSchemaInBody = z.object({
  body: UserSchema
});

userRouter.post("/add", jsonParser, validate(UserSchemaInBody), (req: Request, res: Response) => {
  res.json({ ...req.body });
})
