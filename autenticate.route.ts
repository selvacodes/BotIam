import { Request, Response } from 'express'
import express from 'express'
import { validateInputSchema } from './validate.middleware';
import { makeBodySchema, makeParamsSchema, sendResponse } from './utils';
import { RawUserSchema, RawUser, IdSchema, RawUserPartialSchema } from "./user.schema";

import bodyParser from 'body-parser'
const jsonParser = bodyParser.json()

export const userRouter = express.Router()

userRouter.post("/", jsonParser, validateInputSchema(makeBodySchema(RawUserSchema)), async (req: Request, res: Response) => {
  const userToAdd = req.body as RawUser;
  const toReturn = await BL.addUser(userToAdd)
  res.json(toReturn);
})

userRouter.get("/", async (_req: Request, res: Response) => {
  const toReturn = await BL.getAllUsers()
  sendResponse(toReturn, res)
})
