import { User,UserWithId } from './user.operations'
import { v4 as uuidv4 } from 'uuid';
import { readFile,writeFile } from 'fs-extra'

export const addUserDL = async (user : User) => {
  const currentDataAsString : string = await readFile("./store.json","utf-8")
  const parsed : any = JSON.parse(currentDataAsString);
  const currentUsers : UserWithId[] = parsed.users;
  const dataToInsert : UserWithId = {...user , id : uuidv4() }
  const addedUserList = currentUsers.concat(dataToInsert)
  const toUpdate = { ...parsed , users : addedUserList}
  const currentDataAsString1 : string = await writeFile("./store.json",JSON.stringify(toUpdate))
  return dataToInsert
  
  
}