import { RawUser, User, UserWithPermissions, UserSchema, RawUserPartial } from "./user.schema";
import { RawAuthentication, Authentication } from "./authenticate.schema";
import { v4 as uuidv4 } from 'uuid';
import { readFile, writeFile } from 'fs-extra'
import { Result } from '@badrap/result'

type Store = {
  users: UserWithPermissions[],
  auth_requests: Authentication[]
}

type Entities = keyof Store;

const readStoreAndGetKey = async  <T extends Entities>(key: T): Promise<Store[T]> => {
  const currentDataAsString: string = await readFile("./store.json", "utf-8")
  const parsed: Store = JSON.parse(currentDataAsString);
  return parsed[key]
}

const writeKeyToStore = async  <T extends Entities>(key: T, data: Store[T]): Promise<void> => {
  const currentDataAsString: string = await readFile("./store.json", "utf-8")
  const parsed: any = JSON.parse(currentDataAsString);
  const toUpdate = { ...parsed, [key]: data }
  await writeFile("./store.json", JSON.stringify(toUpdate))
}

export const addUser = async (user: RawUser) => {
  const currentUsers = await readStoreAndGetKey("users")
  const dataToInsert: UserWithPermissions = { ...user, id: uuidv4(), permissions: [] }
  const listWithUserAdded = currentUsers.concat(dataToInsert)
  await writeKeyToStore("users", listWithUserAdded)
  const userStripedOfPermissions = UserSchema.parse(dataToInsert)
  return userStripedOfPermissions
}

export const getAllUsers = async (): Promise<Result<UserWithPermissions[]>> => {
  const currentUsers = await readStoreAndGetKey("users")
  return Result.ok(currentUsers)
}

export const getUser = async (id: string): Promise<Result<UserWithPermissions>> => {
  const currentUsers = await readStoreAndGetKey("users")
  const userToReturn = currentUsers.find(x => x.id === id)
  if (userToReturn === undefined) {
    return Result.err(new Error("User not found"))
  }

  return Result.ok(userToReturn)
}

export const getUserByEmail = async (email: string): Promise<Result<UserWithPermissions>> => {
  const currentUsers = await readStoreAndGetKey("users")
  const userToReturn = currentUsers.find(x => x.email === email)
  console.log("users", email, currentUsers,userToReturn)
  if (userToReturn === undefined) {
    return Result.err(new Error("User not found"))
  }

  return Result.ok(userToReturn)
}


export const deleteUser = async (id: string): Promise<Result<UserWithPermissions>> => {
  const currentUsers = await readStoreAndGetKey("users")
  const userToReturn = currentUsers.find(x => x.id === id)
  if (userToReturn === undefined) {
    return Result.err(new Error("User not found"))
  } else {
    const allUsersButThis = currentUsers.filter(x => x.id !== id)
    await writeKeyToStore("users", allUsersButThis)
    return Result.ok(userToReturn)
  }
}

export const patchUser = async (id: string, patchData: RawUserPartial): Promise<Result<UserWithPermissions>> => {
  const currentUsers = await readStoreAndGetKey("users")
  const userToReturn = currentUsers.find(x => x.id === id)
  if (userToReturn === undefined) {
    return Result.err(new Error("User not found"))
  } else {
    const patchedData = { ...userToReturn, ...patchData }
    const allUsers = currentUsers.filter(x => x.id !== id).concat(patchedData)
    console.log(currentUsers, patchedData, allUsers)
    await writeKeyToStore("users", allUsers)
    return Result.ok(patchedData)
  }
}

export const addAuthRequest = async (auth_request: Authentication) => {
  const currentRequests = await readStoreAndGetKey("auth_requests")
  const dataToInsert: Authentication = { ...auth_request }
  const allUsers = currentRequests.concat(dataToInsert)
  await writeKeyToStore("auth_requests", allUsers)
  return Result.ok(dataToInsert)
}

export const getAuthenticationRequest = async (id: string): Promise<Result<Authentication>> => {
  const currentUsers = await readStoreAndGetKey("auth_requests")
  const requestToReturn = currentUsers.find(x => x.id === id)
  if (requestToReturn === undefined) {
    return Result.err(new Error("User not found"))
  }

  return Result.ok(requestToReturn)
}
