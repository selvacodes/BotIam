import { _notImplemented } from './utils';
import * as DL from './user.data'
import { RawUser, User } from './user.schema';

export const addUser = async (user: RawUser): Promise<User> => {
  const addedUser = await DL.addUser(user)
  return addedUser
}

export const getAllUsers = async (): Promise<User[]> => {
  return DL.getAllUsers()
}