import express from 'express'
import { userRouter, rootRouter } from './user.route'
import { generateUserAccessToken } from './jwt.utils'
console.log(generateUserAccessToken({ id: "selva" }, process.env.JWT_SECRET_KEY as string))
const app = express();

app.use("/", rootRouter)

app.use("/user", userRouter)

app.listen(3000);