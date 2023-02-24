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
  authenticateRouter: () => authenticateRouter
});
module.exports = __toCommonJS(autenticate_route_exports);
var import_express2 = __toESM(require("express"));
var import_validate = require("./validate.middleware");
var import_utils = require("./utils");
var import_jwt = require("./jwt.utils");
var import_authenticate = require("./authenticate.schema");
var BL = __toESM(require("./autheticate.operations"));
var import_body_parser = __toESM(require("body-parser"));
const jsonParser = import_body_parser.default.json();
const authenticateRouter = import_express2.default.Router();
authenticateRouter.post("/", jsonParser, (0, import_validate.validateInputSchema)((0, import_utils.makeBodySchema)(import_authenticate.RawAuthenticationSchema)), async (req, res) => {
  try {
    const userToAdd = req.body;
    const toReturn = await BL.addAutheticateRequest(userToAdd);
    (0, import_utils.sendResponse)(toReturn, res);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});
authenticateRouter.get("/verify/token/:token", (0, import_validate.validateInputSchema)((0, import_utils.makeParamsSchema)(import_authenticate.TokenSchema)), async (req, res) => {
  try {
    const params = req.params;
    const token = (0, import_jwt.decodeMagicJWT)(params.token);
    await BL.processVerfication(token);
    res.send("Verfied");
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});
authenticateRouter.post("/verify/callback", jsonParser, async (req, res) => {
  try {
    console.log("call back Body", req.body);
    res.send("Verfied");
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  authenticateRouter
});
//# sourceMappingURL=autenticate.route.js.map
