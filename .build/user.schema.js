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
  IdSchema: () => IdSchema,
  PermissionSchema: () => PermissionSchema,
  PermissionsSchema: () => PermissionsSchema,
  RawUserPartialSchema: () => RawUserPartialSchema,
  RawUserSchema: () => RawUserSchema,
  UserSchema: () => UserSchema,
  _UserWithPermissionSchema: () => _UserWithPermissionSchema
});
module.exports = __toCommonJS(user_schema_exports);
var import_zod = require("zod");
const RawUserSchema = import_zod.z.object({
  email: import_zod.z.string().email(),
  first_name: import_zod.z.string(),
  last_name: import_zod.z.string()
});
const RawUserPartialSchema = RawUserSchema.partial();
const IdSchema = import_zod.z.object({
  id: import_zod.z.string().uuid()
});
const PermissionSchema = import_zod.z.union([import_zod.z.literal("Users.READ.WRITE"), import_zod.z.literal("Users.READ")]);
const PermissionsSchema = import_zod.z.object({
  permissions: import_zod.z.array(PermissionSchema)
});
const UserSchema = import_zod.z.intersection(RawUserSchema, IdSchema);
const _UserWithPermissionSchema = import_zod.z.intersection(UserSchema, PermissionsSchema);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IdSchema,
  PermissionSchema,
  PermissionsSchema,
  RawUserPartialSchema,
  RawUserSchema,
  UserSchema,
  _UserWithPermissionSchema
});
//# sourceMappingURL=user.schema.js.map
