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
  Id: () => Id,
  UserCompleteSchema: () => UserCompleteSchema,
  UserSchema: () => UserSchema,
  addUser: () => addUser
});
module.exports = __toCommonJS(user_operations_exports);
var import_zod = require("zod");
var DL = __toESM(require("./user.data"));
const UserSchema = import_zod.z.object({
  email: import_zod.z.string().email(),
  password: import_zod.z.string().min(6)
});
const Id = import_zod.z.object({
  id: import_zod.z.string().uuid()
});
const UserCompleteSchema = import_zod.z.intersection(UserSchema, Id);
const addUser = async (user) => {
  const addedUSer = await DL.addUserDL(user);
  return addedUser;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Id,
  UserCompleteSchema,
  UserSchema,
  addUser
});
//# sourceMappingURL=user.operations.js.map
