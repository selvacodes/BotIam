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
var user_route_exports = {};
__export(user_route_exports, {
  userRouter: () => userRouter
});
module.exports = __toCommonJS(user_route_exports);
var import_express2 = __toESM(require("express"));
var import_zod = require("zod");
var import_validate = require("./validate.middleware");
var import_user = require("./user.operations");
var import_body_parser = __toESM(require("body-parser"));
const jsonParser = import_body_parser.default.json();
const userRouter = import_express2.default.Router();
const UserSchemaInBody = import_zod.z.object({
  body: import_user.UserSchema
});
userRouter.post("/add", jsonParser, (0, import_validate.validate)(UserSchemaInBody), (req, res) => {
  res.json({ ...req.body });
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  userRouter
});
//# sourceMappingURL=user.route.js.map
