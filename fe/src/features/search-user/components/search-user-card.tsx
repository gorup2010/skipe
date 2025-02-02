import { useAcceptFriendInvitation } from "@/features/friend-invitation/api/accept-friend-invitation";
import { useCreateFriendInvitation } from "@/features/friend-invitation/api/create-friend-invitation";
import { useDeleteFriendInvitation } from "@/features/friend-invitation/api/delete-friend-invitation";
import { useFriendInvitations } from "@/features/friend-invitation/api/get-friend-invitation";
import { useFriends } from "@/features/friend/api/get-friends";
import { User } from "@/types/api";
import { Avatar, Button } from "flowbite-react";
import { FC } from "react";

type SearchUserCardProps = {
  user: User;
};

const SearchUserCard: FC<SearchUserCardProps> = ({ user }) => {
  const createFriendInvitationMutation = useCreateFriendInvitation();
  const deleteFriendInvitationMutation = useDeleteFriendInvitation();
  const acceptFriendInvitationMutation = useAcceptFriendInvitation();

  const friendInvationsQuery = useFriendInvitations();
  const friendsQuery = useFriends();

  const isLoading = friendInvationsQuery.isLoading || friendsQuery.isLoading;

  // Check if searched user is user friend or not.
  const isFriend = friendsQuery.data?.has(user.id);

  // Check if searched user is in sent friend invitation or not
  const isSentFriendInvitation = friendInvationsQuery.data?.asSender.has(
    user.id
  );

  // Check if searched user is in received friend invitation or not
  const isReceivedFriendInvitation = friendInvationsQuery.data?.asReveiver.has(
    user.id
  );

  const btnCallback = () => {
    if (isFriend) return;
    if (isSentFriendInvitation) {
      const invitationId = friendInvationsQuery.data?.asSender.get(user.id)?.id;
      deleteFriendInvitationMutation.mutate(invitationId);
    } else if (isReceivedFriendInvitation) {
      const invitationId = friendInvationsQuery.data?.asReveiver.get(
        user.id
      )?.id;
      acceptFriendInvitationMutation.mutate({ invitationId });
    } else {
      createFriendInvitationMutation.mutate(user.id);
    }
  };

  return (
    <div className="relative flex items-center gap-4 py-4 px-2 rounded ">
      <Avatar className="w-15 h-15" img={user.avatar} rounded />
      <div className="flex-1">{user.username}</div>
      <Button
        color="gray"
        isProcessing={isLoading}
        disabled={isFriend}
        onClick={btnCallback}
      >
        {isFriend
          ? "Đã kết bạn"
          : isSentFriendInvitation
          ? "Hủy"
          : isReceivedFriendInvitation
          ? "Chấp nhận"
          : "Kết bạn"}
      </Button>
    </div>
  );
};

export { SearchUserCard };
