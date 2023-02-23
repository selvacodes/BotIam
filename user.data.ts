import { RawUser, User } from "./user.schema";
import { v4 as uuidv4 } from 'uuid';
import { readFile, writeFile } from 'fs-extra'

type Store = {
  users: User[]
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
  const dataToInsert: User = { ...user, id: uuidv4() }
  const listWithUserAdded = currentUsers.concat(dataToInsert)
  await writeKeyToStore("users", listWithUserAdded)
  return dataToInsert
}

export const getAllUsers = async (): Promise<User[]> => {
  const currentUsers = await readStoreAndGetKey("users")
  return currentUsers
}