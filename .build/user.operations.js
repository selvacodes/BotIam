"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var user_operations_exports = {};
__export(user_operations_exports, {
  addUser: () => addUser,
  deleteUser: () => deleteUser,
  getAllUsers: () => getAllUsers,
  getuser: () => getuser,
  patchUser: () => patchUser
});
module.exports = __toCommonJS(user_operations_exports);
var DL = __toESM(require("./user.data"));
var import_user = require("./user.schema");
const addUser = async (user) => {
  const addedUser = await DL.addUser(user);
  return addedUser;
};
const getAllUsers = async () => {
  const allUsers = await DL.getAllUsers();
  return allUsers.map((x) => x.filter((user) => user.permissions.length === 0).map((y) => import_user.UserSchema.parse(y)));
};
const getuser = async (id) => {
  const userResult = await DL.getUser(id);
  const parsedResult = userResult.map((x) => import_user.UserSchema.parse(x));
  return parsedResult;
};
const deleteUser = async (id) => {
  const userResult = await DL.deleteUser(id);
  const parsedResult = userResult.map((x) => import_user.UserSchema.parse(x));
  return parsedResult;
};
const patchUser = async (id, patchData) => {
  const parsedPatchData = import_user.RawUserPartialSchema.parse(patchData);
  console.log(
    "parsed",
    parsedPatchData
  );
  const userResult = await DL.patchUser(id, parsedPatchData);
  const parsedResult = userResult.map((x) => import_user.UserSchema.parse(x));
  return parsedResult;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addUser,
  deleteUser,
  getAllUsers,
  getuser,
  patchUser
});
//# sourceMappingURL=user.operations.js.map
