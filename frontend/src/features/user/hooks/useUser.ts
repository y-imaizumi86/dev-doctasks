import { useQuery } from '@tanstack/react-query';
import { userKeys } from '../keys/userKeys';
import * as api from '../api/userApi';
import { User } from '../../../../../shared/types/user';

export const useUser = () => {
  const {
    data: users,
    isPending: isUserLoading,
    isError: isUserError,
  } = useQuery<User[], Error>({
    queryKey: userKeys.all,
    queryFn: api.getAllUsers,
    meta: {
      disableGlobalErrorHandler: false,
    },
  });

  return {
    users,
    isUserLoading,
    isUserError,
  };
};
