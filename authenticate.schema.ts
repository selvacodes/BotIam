import { z } from 'zod';
import { IdSchema } from './user.schema';

export const RawAuthenticationSchema = z.object({
  email: z.string().email(),
  type: z.literal("magic_link"),
  callback_url: z.string().url(),
});

export const AuthenticationAdditionalPropertiesSchema = z.object({
  status: z.union([z.literal("yet_to_verify"), z.literal("verified")])
});

export const TokenSchema = z.object({
  token: z.string()
});

export const TokenEncodeSchema = z.object({
  email: z.string().email(),
  id : z.string().uuid()
});


export const AuthenticationSchema = RawAuthenticationSchema.and(IdSchema).and(AuthenticationAdditionalPropertiesSchema)


export type RawAuthentication = z.infer<typeof RawAuthenticationSchema>
export type Authentication = z.infer<typeof AuthenticationSchema>
export type Token = z.infer<typeof TokenSchema>
export type TokenEncode = z.infer<typeof TokenEncodeSchema>