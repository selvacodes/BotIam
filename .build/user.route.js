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
  rootRouter: () => rootRouter,
  userRouter: () => userRouter
});
module.exports = __toCommonJS(user_route_exports);
var import_express2 = __toESM(require("express"));
var import_validate = require("./validate.middleware");
var import_utils = require("./utils");
var BL = __toESM(require("./user.operations"));
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
userRouter.get("/:id", (0, import_validate.validateInputSchema)((0, import_utils.makeParamsSchema)(import_user.IdSchema)), async (req, res) => {
  const toReturn = await BL.getuser(req.params.id);
  (0, import_utils.sendResponse)(toReturn, res);
});
userRouter.delete("/:id", (0, import_validate.validateInputSchema)((0, import_utils.makeParamsSchema)(import_user.IdSchema)), async (req, res) => {
  const toReturn = await BL.deleteUser(req.params.id);
  (0, import_utils.sendResponse)(toReturn, res);
});
userRouter.patch("/:id", jsonParser, (0, import_validate.validateInputSchema)((0, import_utils.makeBodySchema)(import_user.RawUserPartialSchema)), (0, import_validate.validateInputSchema)((0, import_utils.makeParamsSchema)(import_user.IdSchema)), async (req, res) => {
  const toReturn = await BL.patchUser(req.params.id, req.body);
  (0, import_utils.sendResponse)(toReturn, res);
});
const rootRouter = import_express2.default.Router();
rootRouter.get("/users", async (_req, res) => {
  const toReturn = await BL.getAllUsers();
  (0, import_utils.sendResponse)(toReturn, res);
});
rootRouter.get("/", (req, res) => {
  res.send("IAM alive and well");
});
rootRouter.get("/alive", (req, res) => {
  res.send("IAM alive and well");
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  rootRouter,
  userRouter
});
//# sourceMappingURL=user.route.js.map
