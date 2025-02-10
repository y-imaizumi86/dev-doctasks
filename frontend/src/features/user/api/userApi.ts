import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { AppRouter } from '../../../../../backend/src/server/routes';
import { User } from '../../../../../shared/types/user';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

if (!API_BASE_URL) {
  throw new Error('API_BASE_URL is not defined in environment variables');
}

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: API_BASE_URL,
    }),
  ],
});


export const getAllUsers = async (): Promise<User[]> => {
  const users = await trpc.user.getAll.query();
  return users;
};
