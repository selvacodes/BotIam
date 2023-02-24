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
var autenticate_route_exports = {};
__export(autenticate_route_exports, {
  userRouter: () => userRouter
});
module.exports = __toCommonJS(autenticate_route_exports);
var import_express2 = __toESM(require("express"));
var import_validate = require("./validate.middleware");
var import_utils = require("./utils");
var import_user = require("./user.schema");
var import_body_parser = __toESM(require("body-parser"));
const jsonParser = import_body_parser.default.json();
const userRouter = import_express2.default.Router();
userRouter.post("/", jsonParser, (0, import_validate.validateInputSchema)((0, import_utils.makeBodySchema)(import_user.RawUserSchema)), async (req, res) => {
  const userToAdd = req.body;
  const toReturn = await BL.addUser(userToAdd);
  res.json(toReturn);
});
userRouter.get("/", async (_req, res) => {
  const toReturn = await BL.getAllUsers();
  (0, import_utils.sendResponse)(toReturn, res);
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  userRouter
});
//# sourceMappingURL=autenticate.route.js.map
