import { z } from 'zod';
import { _notImplemented } from './utils';
import * as DL from './user.data'

export const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const Id = z.object({
  id: z.string().uuid()
})

export const UserCompleteSchema = z.intersection(UserSchema, Id)

export type User = z.infer<typeof UserSchema>

export type UserWithId = z.infer<typeof UserCompleteSchema>

export const addUser = async (user : User) : UserWithId => {
   const addedUSer = await DL.addUserDL(user)
    return addedUser
}