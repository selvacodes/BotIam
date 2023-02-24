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
var authenticate_schema_exports = {};
__export(authenticate_schema_exports, {
  AuthenticationAdditionalPropertiesSchema: () => AuthenticationAdditionalPropertiesSchema,
  AuthenticationSchema: () => AuthenticationSchema,
  RawAuthenticationSchema: () => RawAuthenticationSchema,
  TokenEncodeSchema: () => TokenEncodeSchema,
  TokenSchema: () => TokenSchema
});
module.exports = __toCommonJS(authenticate_schema_exports);
var import_zod = require("zod");
var import_user = require("./user.schema");
const RawAuthenticationSchema = import_zod.z.object({
  email: import_zod.z.string().email(),
  type: import_zod.z.literal("magic_link"),
  callback_url: import_zod.z.string().url()
});
const AuthenticationAdditionalPropertiesSchema = import_zod.z.object({
  status: import_zod.z.union([import_zod.z.literal("yet_to_verify"), import_zod.z.literal("verified")])
});
const TokenSchema = import_zod.z.object({
  token: import_zod.z.string()
});
const TokenEncodeSchema = import_zod.z.object({
  email: import_zod.z.string().email(),
  id: import_zod.z.string().uuid()
});
const AuthenticationSchema = RawAuthenticationSchema.and(import_user.IdSchema).and(AuthenticationAdditionalPropertiesSchema);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthenticationAdditionalPropertiesSchema,
  AuthenticationSchema,
  RawAuthenticationSchema,
  TokenEncodeSchema,
  TokenSchema
});
//# sourceMappingURL=authenticate.schema.js.map
