import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User } from '../../../../../shared/types/user';
import { getColorClass } from '../../../../../shared/types/color';

export const UserItem = ({ user }: { user: User }) => {
  const initial = user.name.charAt(0).toUpperCase();

  return (
    <div className="flex gap-2 items-center">
      <Avatar>
        <AvatarFallback className={`${getColorClass(user.color?.name)} text-white`}>{initial}</AvatarFallback>
      </Avatar>
      <span>{user.name}</span>
    </div>
  );
};
