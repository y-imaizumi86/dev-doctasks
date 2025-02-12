import { useUser } from "../hooks/useUser";
import { UserItem } from "./UserItem";

export const UserList = () => {
  const {users, isUserLoading, isUserError} = useUser();

  if (isUserLoading) {
    return <div>Loading...</div>
  }

  if (isUserError) {
    return <div>Error loading users.</div>
  }

  if (!users || users.length === 0) {
    return <div>No users found.</div>
  }

  return (
    <div className="space-y-2">
      {users.map((user) => (
        <UserItem key={user.user_id} user={user} />
      ))}
    </div>
  )
}
