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
  addUser: () => addUser,
  getAllUsers: () => getAllUsers
});
module.exports = __toCommonJS(user_data_exports);
var import_uuid = require("uuid");
var import_fs_extra = require("fs-extra");
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
  const dataToInsert = { ...user, id: (0, import_uuid.v4)() };
  const listWithUserAdded = currentUsers.concat(dataToInsert);
  await writeKeyToStore("users", listWithUserAdded);
  return dataToInsert;
};
const getAllUsers = async () => {
  const currentUsers = await readStoreAndGetKey("users");
  return currentUsers;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addUser,
  getAllUsers
});
//# sourceMappingURL=user.data.js.map
