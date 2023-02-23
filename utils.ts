import { z } from 'zod';

export function _notImplemented(): never {
  throw new Error("not Implemented")
}

export const makeBodySchema = <T extends z.ZodTypeAny>(schema: T) => {
  const schemaToReturn = z.object({
    body: schema
  });
  return schemaToReturn
};