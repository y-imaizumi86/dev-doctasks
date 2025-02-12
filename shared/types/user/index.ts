import { z } from 'zod';
import { ColorSchema } from '../color';

export const UserSchema = z.object({
  user_id: z.number(),
  name: z.string(),
  email: z.string().email(),
  role_id: z.number(),
  color_id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  color: ColorSchema.optional(),
});

export type User = z.infer<typeof UserSchema>;
