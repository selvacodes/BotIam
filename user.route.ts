import { Request, Response } from 'express'
import express from 'express'
import { z } from 'zod';
import { validate } from './validate.middleware';
import { UserSchema, addUser, User } from './user.operations';

import bodyParser from 'body-parser'
const jsonParser = bodyParser.json()


export const userRouter = express.Router()

const UserSchemaInBody = z.object({
  body: UserSchema
});

userRouter.post("/add", jsonParser, validate(UserSchemaInBody), async (req: Request, res: Response) => {
  const userToAdd = req.body as User;
  const toReturn = await addUser(userToAdd)
  res.json(toReturn);
})
