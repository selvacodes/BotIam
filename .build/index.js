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
var import_express2 = __toESM(require("express"));
var import_zod = require("zod");
var import_validate = require("./validate.middleware");
var import_body_parser = __toESM(require("body-parser"));
var jsonParser = import_body_parser.default.json();
const app = (0, import_express2.default)();
const UserSchema = import_zod.z.object({
  body: import_zod.z.object({
    email: import_zod.z.string().email(),
    password: import_zod.z.string().min(6)
  })
});
app.get("/", (req, res) => {
  res.send("test");
});
app.post("/users/add", jsonParser, (0, import_validate.validate)(UserSchema), (req, res) => {
  res.json({ ...req.body });
});
app.listen(3e3);
//# sourceMappingURL=index.js.map
