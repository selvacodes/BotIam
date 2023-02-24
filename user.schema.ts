import { z } from 'zod';


export const RawUserSchema = z.object({
  email: z.string().email(),
  first_name: z.string(),
  last_name: z.string(),
});

export const RawUserPartialSchema = RawUserSchema.partial();

export const IdSchema = z.object({
  id: z.string().uuid()
});

export const PermissionSchema = z.union([z.literal("Users.READ.WRITE"), z.literal("Users.READ")]);

export const PermissionsSchema = z.object({
  permissions: z.array(PermissionSchema)
});


export const UserSchema = z.intersection(RawUserSchema, IdSchema)

export const _UserWithPermissionSchema = z.intersection(UserSchema, PermissionsSchema);

export type RawUser = z.infer<typeof RawUserSchema>;

export type RawUserPartial = z.infer<typeof RawUserPartialSchema>;

export type User = z.infer<typeof UserSchema>;

export type UserWithPermissions = z.infer<typeof _UserWithPermissionSchema>;
