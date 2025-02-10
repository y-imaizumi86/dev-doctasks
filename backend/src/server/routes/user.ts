import { router, publicProcedure } from '../trpc';
import { getAllUsers } from '../../services/userService';
import { User, UserSchema } from '../../../../shared/types/user';
import { z } from 'zod';

export const userRouter = router({
  getAll: publicProcedure.output(z.array(UserSchema)).query(async (): Promise<User[]> => {
    return await getAllUsers();
  }),
});
