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
var user_schema_exports = {};
__export(user_schema_exports, {
  Id: () => Id,
  RawUserSchema: () => RawUserSchema,
  _UserSchema: () => _UserSchema
});
module.exports = __toCommonJS(user_schema_exports);
var import_zod = require("zod");
const RawUserSchema = import_zod.z.object({
  email: import_zod.z.string().email(),
  password: import_zod.z.string().min(6)
});
const Id = import_zod.z.object({
  id: import_zod.z.string().uuid()
});
const _UserSchema = import_zod.z.intersection(RawUserSchema, Id);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Id,
  RawUserSchema,
  _UserSchema
});
//# sourceMappingURL=user.schema.js.map
