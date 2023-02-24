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
var autheticate_operations_exports = {};
__export(autheticate_operations_exports, {
  addAutheticateRequest: () => addAutheticateRequest,
  processVerfication: () => processVerfication
});
module.exports = __toCommonJS(autheticate_operations_exports);
var import_jwt = require("./jwt.utils");
var import_email = require("./email.utils");
var DL = __toESM(require("./user.data"));
var import_axios = __toESM(require("axios"));
var import_uuid = require("uuid");
var import_user = require("./user.schema");
const addAutheticateRequest = async (rawAuthRequest) => {
  const authRequest = { ...rawAuthRequest, id: (0, import_uuid.v4)(), status: "yet_to_verify" };
  const addedRequest = await DL.addAuthRequest(authRequest);
  const userResult = await DL.getUserByEmail(authRequest.email);
  const user = userResult.unwrap();
  const magicTokenJWT = (0, import_jwt.generateMagicToken)({ id: authRequest.id, email: authRequest.email }, process.env.MAGIC_LINK_SECRET_KEY);
  const verify_url = `${process.env.DOMAIN}/authenticate/verify/token/${magicTokenJWT.token}`;
  await (0, import_email.sendVerificationEmail)(rawAuthRequest.email, { verify_url, name: `${user.first_name} ${user.last_name}` });
  console.log("magicToken", magicTokenJWT);
  return addedRequest;
};
const processVerfication = async (tokenData) => {
  const { id } = tokenData;
  const requestDetail = await DL.getAuthenticationRequest(id);
  const request = requestDetail.unwrap();
  const userResult = await DL.getUserByEmail(request.email);
  const user = userResult.unwrap();
  const userWithId = import_user.UserSchema.parse(user);
  const accessToken = (0, import_jwt.generateUserAccessToken)({ ...user, type: "access_token" }, process.env.JWT_SECRET_KEY);
  const refreshToken = (0, import_jwt.generateUserAccessToken)({ ...user, type: "refresh_token" }, process.env.JWT_SECRET_KEY);
  import_axios.default.post(request.callback_url, { access_token: accessToken, refresh_token: refreshToken });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addAutheticateRequest,
  processVerfication
});
//# sourceMappingURL=autheticate.operations.js.map
