import { useUser } from "../hooks/useUser";

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
    <ul className="space-y-4">
      {users.map((user) => (
        <li key={user.user_id}>
          {user.name}
        </li>
      ))}
    </ul>
  )
}
