import { Request, Response } from 'express'
import express from 'express'
import { validateInputSchema } from './validate.middleware';
import { makeBodySchema, makeParamsSchema, sendResponse } from './utils';
import * as BL from './user.operations';
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

userRouter.get("/:id", validateInputSchema(makeParamsSchema(IdSchema)), async (req: Request, res: Response) => {
  const toReturn = await BL.getuser(req.params.id)
  sendResponse(toReturn, res)
})

userRouter.delete("/:id", validateInputSchema(makeParamsSchema(IdSchema)), async (req: Request, res: Response) => {
  const toReturn = await BL.deleteUser(req.params.id)
  sendResponse(toReturn, res)
})

userRouter.patch("/:id", jsonParser, validateInputSchema(makeBodySchema(RawUserPartialSchema)), validateInputSchema(makeParamsSchema(IdSchema)), async (req: Request, res: Response) => {
  const toReturn = await BL.patchUser(req.params.id, req.body)
  sendResponse(toReturn, res)
})

export const rootRouter = express.Router()

rootRouter.get("/users", async (_req: Request, res: Response) => {
  const toReturn = await BL.getAllUsers()
  sendResponse(toReturn, res)
})

rootRouter.get("/", (req: Request, res: Response) => {
  res.send("IAM alive and well")
})

rootRouter.get("/alive", (req: Request, res: Response) => {
  res.send("IAM alive and well")
})