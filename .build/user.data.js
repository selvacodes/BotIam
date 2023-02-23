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
  addUserDL: () => addUserDL
});
module.exports = __toCommonJS(user_data_exports);
var import_uuid = require("uuid");
var import_fs_extra = require("fs-extra");
const addUserDL = async (user) => {
  const currentDataAsString = await (0, import_fs_extra.readFile)("./store.json", "utf-8");
  const parsed = JSON.parse(currentDataAsString);
  const currentUsers = parsed.users;
  const dataToInsert = { ...user, id: (0, import_uuid.v4)() };
  const addedUserList = currentUsers.concat(dataToInsert);
  const toUpdate = { ...parsed, users: addedUserList };
  const currentDataAsString1 = await (0, import_fs_extra.writeFile)("./store.json", JSON.stringify(toUpdate));
  return dataToInsert;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addUserDL
});
//# sourceMappingURL=user.data.js.map
