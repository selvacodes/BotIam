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
var utils_exports = {};
__export(utils_exports, {
  _notImplemented: () => _notImplemented,
  makeBodySchema: () => makeBodySchema,
  makeParamsSchema: () => makeParamsSchema,
  sendResponse: () => sendResponse
});
module.exports = __toCommonJS(utils_exports);
var import_zod = require("zod");
function _notImplemented() {
  throw new Error("not Implemented");
}
const makeBodySchema = (schema) => {
  const schemaToReturn = import_zod.z.object({
    body: schema
  });
  return schemaToReturn;
};
const makeParamsSchema = (schema) => {
  const schemaToReturn = import_zod.z.object({
    params: schema
  });
  return schemaToReturn;
};
const sendResponse = (toReturn, responseObject, sucessStatusOverride) => {
  if (toReturn.isOk) {
    const statusToSend = sucessStatusOverride ? sucessStatusOverride : 200;
    responseObject.status(statusToSend).json(toReturn.unwrap());
  }
  if (toReturn.isErr) {
    try {
      toReturn.unwrap();
    } catch (err) {
      if (err instanceof Error) {
        const status = err.message === "User not found" ? 404 : 500;
        responseObject.status(status).json({ error: err.message });
      }
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  _notImplemented,
  makeBodySchema,
  makeParamsSchema,
  sendResponse
});
//# sourceMappingURL=utils.js.map
