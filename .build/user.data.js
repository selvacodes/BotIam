"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var user_data_exports = {};
__export(user_data_exports, {
  addAuthRequest: () => addAuthRequest,
  addUser: () => addUser,
  deleteUser: () => deleteUser,
  getAllUsers: () => getAllUsers,
  getAuthenticationRequest: () => getAuthenticationRequest,
  getUser: () => getUser,
  getUserByEmail: () => getUserByEmail,
  patchUser: () => patchUser
});
module.exports = __toCommonJS(user_data_exports);
var import_user = require("./user.schema");
var import_uuid = require("uuid");
var import_fs_extra = require("fs-extra");
var import_result = require("@badrap/result");
const readStoreAndGetKey = async (key) => {
  const currentDataAsString = await (0, import_fs_extra.readFile)("./store.json", "utf-8");
  const parsed = JSON.parse(currentDataAsString);
  return parsed[key];
};
const writeKeyToStore = async (key, data) => {
  const currentDataAsString = await (0, import_fs_extra.readFile)("./store.json", "utf-8");
  const parsed = JSON.parse(currentDataAsString);
  const toUpdate = { ...parsed, [key]: data };
  await (0, import_fs_extra.writeFile)("./store.json", JSON.stringify(toUpdate));
};
const addUser = async (user) => {
  const currentUsers = await readStoreAndGetKey("users");
  const dataToInsert = { ...user, id: (0, import_uuid.v4)(), permissions: [] };
  const listWithUserAdded = currentUsers.concat(dataToInsert);
  await writeKeyToStore("users", listWithUserAdded);
  const userStripedOfPermissions = import_user.UserSchema.parse(dataToInsert);
  return userStripedOfPermissions;
};
const getAllUsers = async () => {
  const currentUsers = await readStoreAndGetKey("users");
  return import_result.Result.ok(currentUsers);
};
const getUser = async (id) => {
  const currentUsers = await readStoreAndGetKey("users");
  const userToReturn = currentUsers.find((x) => x.id === id);
  if (userToReturn === void 0) {
    return import_result.Result.err(new Error("User not found"));
  }
  return import_result.Result.ok(userToReturn);
};
const getUserByEmail = async (email) => {
  const currentUsers = await readStoreAndGetKey("users");
  const userToReturn = currentUsers.find((x) => x.email === email);
  console.log("users", email, currentUsers, userToReturn);
  if (userToReturn === void 0) {
    return import_result.Result.err(new Error("User not found"));
  }
  return import_result.Result.ok(userToReturn);
};
const deleteUser = async (id) => {
  const currentUsers = await readStoreAndGetKey("users");
  const userToReturn = currentUsers.find((x) => x.id === id);
  if (userToReturn === void 0) {
    return import_result.Result.err(new Error("User not found"));
  } else {
    const allUsersButThis = currentUsers.filter((x) => x.id !== id);
    await writeKeyToStore("users", allUsersButThis);
    return import_result.Result.ok(userToReturn);
  }
};
const patchUser = async (id, patchData) => {
  const currentUsers = await readStoreAndGetKey("users");
  const userToReturn = currentUsers.find((x) => x.id === id);
  if (userToReturn === void 0) {
    return import_result.Result.err(new Error("User not found"));
  } else {
    const patchedData = { ...userToReturn, ...patchData };
    const allUsers = currentUsers.filter((x) => x.id !== id).concat(patchedData);
    console.log(currentUsers, patchedData, allUsers);
    await writeKeyToStore("users", allUsers);
    return import_result.Result.ok(patchedData);
  }
};
const addAuthRequest = async (auth_request) => {
  const currentRequests = await readStoreAndGetKey("auth_requests");
  const dataToInsert = { ...auth_request };
  const allUsers = currentRequests.concat(dataToInsert);
  await writeKeyToStore("auth_requests", allUsers);
  return import_result.Result.ok(dataToInsert);
};
const getAuthenticationRequest = async (id) => {
  const currentUsers = await readStoreAndGetKey("auth_requests");
  const requestToReturn = currentUsers.find((x) => x.id === id);
  if (requestToReturn === void 0) {
    return import_result.Result.err(new Error("User not found"));
  }
  return import_result.Result.ok(requestToReturn);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addAuthRequest,
  addUser,
  deleteUser,
  getAllUsers,
  getAuthenticationRequest,
  getUser,
  getUserByEmail,
  patchUser
});
//# sourceMappingURL=user.data.js.map
