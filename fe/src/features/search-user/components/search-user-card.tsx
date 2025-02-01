import { useCreateFriendInvitation } from "@/features/friend-invitation/api/create-friend-invitation";
import { User } from "@/types/api";
import { Avatar, Button } from "flowbite-react";
import { FC } from "react";

type SearchUserCardProps = {
  user: User;
};

const SearchUserCard: FC<SearchUserCardProps> = ({ user }) => {
  const createFriendInvitationMutation = useCreateFriendInvitation();

  return (
    <div className="relative flex items-center gap-4 py-4 px-2 rounded ">
      <Avatar className="w-15 h-15" img={user.avatar} rounded />
      <div className="flex-1">{user.username}</div>
      <Button
        color="gray"
        onClick={() =>
          createFriendInvitationMutation.mutate(user.id)
        }
      >
        Kết bạn
      </Button>
    </div>
  );
};

export { SearchUserCard };
