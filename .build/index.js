"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var import_express = __toESM(require("express"));
var import_user = require("./user.route");
var import_autenticate = require("./autenticate.route");
var import_jwt = require("./jwt.utils");
console.log((0, import_jwt.generateUserAccessToken)({ id: "selva" }, process.env.JWT_SECRET_KEY));
const app = (0, import_express.default)();
app.use("/", import_user.rootRouter);
app.use("/user", import_user.userRouter);
app.use("/authenticate", import_autenticate.authenticateRouter);
app.listen(3e3);
//# sourceMappingURL=index.js.map
