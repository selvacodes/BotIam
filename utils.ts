import { z } from 'zod';
import { Request, Response } from 'express';
import { Result } from '@badrap/result'

export function _notImplemented(): never {
  throw new Error("not Implemented")
}

export const makeBodySchema = <T extends z.ZodTypeAny>(schema: T) => {
  const schemaToReturn = z.object({
    body: schema
  });
  return schemaToReturn
};

export const makeParamsSchema = <T extends z.ZodTypeAny>(schema: T) => {
  const schemaToReturn = z.object({
    params: schema
  });
  return schemaToReturn
};

export const sendResponse = <T>(toReturn: Result<T>, responseObject: Response , sucessStatusOverride? : number) => {
  if (toReturn.isOk) {
    const statusToSend = sucessStatusOverride ? sucessStatusOverride : 200
    responseObject.status(statusToSend).json(toReturn.unwrap())
  }

  if (toReturn.isErr) {
    try {
      toReturn.unwrap()
    } catch (err) {
      if (err instanceof Error) {
        const status = err.message === "User not found" ? 404 : 500
        responseObject.status(status).json({ error: err.message })
      }
    }
  }

}