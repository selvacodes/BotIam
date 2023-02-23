import { Request, Response  } from 'express'
import express from 'express'
import { userRouter } from './user.route'
// create application/json parser
const app = express();


app.get("/alive", (req: Request, res: Response) => {
  res.send("IAM alive and well")
})

app.use("/users",userRouter) 
app.listen(3000);