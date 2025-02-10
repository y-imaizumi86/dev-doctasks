import { z } from 'zod';

export const UserSchema = z.object({
  user_id: z.number(),
  name: z.string(),
  email: z.string().email(),
  role_id: z.number(),
  color_id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type User = z.infer<typeof UserSchema>;
