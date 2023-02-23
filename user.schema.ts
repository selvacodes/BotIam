import { z } from 'zod';


export const RawUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const Id = z.object({
  id: z.string().uuid()
});

export const _UserSchema = z.intersection(RawUserSchema, Id);

export type RawUser = z.infer<typeof RawUserSchema>;

export type User = z.infer<typeof _UserSchema>;
