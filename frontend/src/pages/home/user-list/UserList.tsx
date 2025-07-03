import { useEffect } from "react";
import UserCard from "../../../components/user-card/UserCard.tsx";
import Button from "../../../components/button/Button.tsx";
import { useQuery } from "@tanstack/react-query";
import useUserStore, { type User } from "../../../store/user.store.ts";
import usePageStore from "../../../store/page.store.ts";
import { useChatStore } from "../../../store/chat.store.ts";
import { useAuthStore } from "../../../store/auth.store.ts";

const UserList = () => {
  const currentUser = useUserStore((state) => state.currentUser);
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);
  const setCurrentRecipient = useUserStore(
    (state) => state.setCurrentRecipient
  );
  const { login, logout } = useAuthStore();

  const { getUsers, users, setSelectedUser, isUsersLoading } = useChatStore();
  const setCurrentPage = usePageStore((state) => state.setCurrentPage);

  const { data: _users } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => fetch("/api/user/all.json").then((res) => res.json()),
  });

  const switchUser = (userId: number) => {
    const user = _users?.find((user) => user._id === userId);
    if (user) {
      setCurrentUser(user);
      setCurrentRecipient(null);
      login({
        email: user.email,
        password: "123456", // Assuming a default password for demo purposes
      });
    }
  };

  const messageUser = (userId: number) => {
    const user = users?.find((user) => user._id === userId);
    if (user) {
      setCurrentRecipient(user);
      setCurrentPage("chat");
    }
  };

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1">
        <h2 className="text-lg font-semibold mb-4">Select Current User</h2>
        <div className="flex flex-col gap-2.5">
          {_users?.map((user: User) => (
            <div className="flex items-center" key={user._id}>
              <UserCard user={user} />
              <div className="ml-auto">
                <Button
                  onClick={() => switchUser(user._id)}
                  disabled={user._id === currentUser._id}
                >
                  {user._id === currentUser._id ? "Current User" : "Switch to"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1">
        <h2 className="text-lg font-semibold mb-4">Message Someone</h2>
        <div className="flex flex-col gap-2.5">
          {_users?.map((user) => (
            <div className="flex items-center" key={user._id}>
              <UserCard user={user} />
              <div className="ml-auto">
                <Button
                  onClick={() => messageUser(user._id)}
                  disabled={user._id === currentUser._id}
                >
                  Message
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;
