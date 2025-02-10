import { router, publicProcedure } from '../trpc';
import { getAllUsers } from '../../services/userService';
import { z } from 'zod';
import { User } from '../../../../shared/types/user';

const UserSchema = z.object({
  user_id: z.number(),
  name: z.string(),
  email: z.string().email(),
  role_id: z.number(),
  color_id: z.number(),
  created_at: z.date(),
  updated_at: z.date(),
});

export const userRouter = router({
  getAll: publicProcedure.output(z.array(UserSchema)).query(async (): Promise<User[]> => {
    return await getAllUsers();
  }),
});
