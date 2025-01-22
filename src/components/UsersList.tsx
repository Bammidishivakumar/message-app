import { User } from "lucide-react";

interface UsersListProps {
  users: string[];
  onPrivateChat: (username: string) => void;
}

export const UsersList = ({ users, onPrivateChat }: UsersListProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Online Users</h2>
      <div className="space-y-2">
        {users.map((username) => (
          <div
            key={username}
            className="flex items-center justify-between p-2 hover:bg-secondary rounded-md cursor-pointer"
            onClick={() => onPrivateChat(username)}
          >
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              <span className="text-sm">{username}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};