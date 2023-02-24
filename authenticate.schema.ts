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


export const AuthenticationSchema = RawAuthenticationSchema.and(IdSchema).and(AuthenticationAdditionalPropertiesSchema)


type RawAuthentication = z.infer<typeof RawAuthenticationSchema>
type Authentication = z.infer<typeof AuthenticationSchema>