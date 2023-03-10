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
var jwt_utils_exports = {};
__export(jwt_utils_exports, {
  decodeMagicJWT: () => decodeMagicJWT,
  generateMagicToken: () => generateMagicToken,
  generateUserAccessToken: () => generateUserAccessToken,
  generateUserRefreshToken: () => generateUserRefreshToken
});
module.exports = __toCommonJS(jwt_utils_exports);
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_jwt_decode = __toESM(require("jwt-decode"));
var import_authenticate = require("./authenticate.schema");
const generateUserAccessToken = (data, secretKey) => {
  const token = import_jsonwebtoken.default.sign(data, secretKey, {
    expiresIn: "365d"
  });
  return { token };
};
const generateUserRefreshToken = (data, secretKey) => {
  const token = import_jsonwebtoken.default.sign(data, secretKey, {
    expiresIn: "730d"
  });
  return { token };
};
const generateMagicToken = (data, secretKey) => {
  const token = import_jsonwebtoken.default.sign(data, secretKey, {
    expiresIn: "2d"
  });
  return { token };
};
const decodeMagicJWT = (token) => {
  var decoded = (0, import_jwt_decode.default)(token);
  const parsed = import_authenticate.TokenEncodeSchema.parse(decoded);
  return parsed;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  decodeMagicJWT,
  generateMagicToken,
  generateUserAccessToken,
  generateUserRefreshToken
});
//# sourceMappingURL=jwt.utils.js.map
