import { Request, Response, NextFunction, Express } from 'express'
import express from 'express'
import { z } from 'zod';
import { validate } from './validate.middleware';
import bodyParser from 'body-parser'

// create application/json parser
var jsonParser = bodyParser.json()
const app = express();

const UserSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
});
app.get("/", (req : Request, res : Response) => {
  res.send("test")
})
app.post("/users/add",jsonParser, validate(UserSchema), (req : Request, res : Response) => {
  res.json({ ...req.body });
})

app.listen(3000);