import { Request, Response } from 'express'
import express from 'express'
import { validateInputSchema } from './validate.middleware';
import { makeBodySchema, makeParamsSchema, sendResponse } from './utils';
import { decodeMagicJWT } from './jwt.utils';
import { RawAuthenticationSchema, RawAuthentication, TokenSchema, Token } from "./authenticate.schema";
import * as BL from "./autheticate.operations";

import bodyParser from 'body-parser'
const jsonParser = bodyParser.json()

export const authenticateRouter = express.Router()

authenticateRouter.post("/", jsonParser, validateInputSchema(makeBodySchema(RawAuthenticationSchema)), async (req: Request, res: Response) => {
  try {
  const userToAdd = req.body as RawAuthentication;
  const toReturn = await BL.addAutheticateRequest(userToAdd)
  sendResponse(toReturn, res)
  } catch (err) {
    console.log(err)
      res.status(500).send("Something went wrong")
  }
})

authenticateRouter.get("/verify/token/:token", validateInputSchema(makeParamsSchema(TokenSchema)), async (req: Request, res: Response) => {
  try {
    const params = req.params as Token;
    const token = decodeMagicJWT(params.token)
    await BL.processVerfication(token)
    res.send("Verfied")
  } catch (err) {
      res.status(500).send("Something went wrong")
  }
})

authenticateRouter.post("/verify/callback", jsonParser,  async (req: Request, res: Response) => {
  try {
    console.log("call back Body",req.body)
    res.send("Verfied")
  } catch (err) {
      res.status(500).send("Something went wrong")
  }
})


