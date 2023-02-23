import { z } from 'zod';

export const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type User = z.infer<typeof UserSchema>