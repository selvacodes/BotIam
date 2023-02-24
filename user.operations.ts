import { _notImplemented } from './utils';
import * as DL from './user.data'
import { RawUser, User, UserSchema, RawUserPartial, RawUserPartialSchema } from './user.schema';
import { Result } from '@badrap/result'

export const addUser = async (user: RawUser): Promise<User> => {
  const addedUser = await DL.addUser(user)
  return addedUser
}

export const getAllUsers = async (): Promise<Result<User[]>> => {
  const allUsers = await DL.getAllUsers()
  return allUsers.map(x => x.filter(user => user.permissions.length === 0).map(y => UserSchema.parse(y)))
}

export const getuser = async (id: string): Promise<Result<User>> => {
  const userResult = await DL.getUser(id)
  const parsedResult = userResult.map(x => UserSchema.parse(x))
  return parsedResult
}

export const deleteUser = async (id: string): Promise<Result<User>> => {
  const userResult = await DL.deleteUser(id)
  const parsedResult = userResult.map(x => UserSchema.parse(x))
  return parsedResult
}

export const patchUser = async (id: string, patchData: RawUserPartial): Promise<Result<User>> => {
  const parsedPatchData = RawUserPartialSchema.parse(patchData)
  console.log(
   "parsed", parsedPatchData
  )
  const userResult = await DL.patchUser(id,parsedPatchData) 
  const parsedResult = userResult.map(x => UserSchema.parse(x))
  return parsedResult
}