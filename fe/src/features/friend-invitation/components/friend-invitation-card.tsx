import { FriendInvitation } from "@/types/api";
import { display } from "@/utils/format-time";
import { Avatar, Button } from "flowbite-react";
import { FC } from "react";
import { useDeleteFriendInvitation } from "../api/delete-friend-invitation";
import { useAcceptFriendInvitation } from "../api/accept-friend-invitation";

type FriendInvitationCardProps = {
  isReceived?: boolean;
  invitation: FriendInvitation;
};

const FriendInvitationCard: FC<FriendInvitationCardProps> = ({
  isReceived = true,
  invitation,
}) => {
  const { avatar, username } = isReceived
    ? invitation.sender
    : invitation.receiver;

  const deleteFriendInvitationMutation = useDeleteFriendInvitation();
  const acceptFriendInvitationMutation = useAcceptFriendInvitation();

  const loading =
    deleteFriendInvitationMutation.isPending ||
    acceptFriendInvitationMutation.isPending;

  return (
    <div className={"relative flex items-center gap-4 px-2 py-1 rounded"}>
      <Avatar className="w-15 h-15" img={avatar} rounded />
      <div className="flex-1 flex flex-col">
        <div>{username}</div>
        <div className="font-thin text-sm">
          {"Gửi vào " + display(invitation.createdAt)}
        </div>
      </div>
      {isReceived && (
        <Button color="blue" isProcessing={loading}
        onClick={() => acceptFriendInvitationMutation.mutate({invitationId: invitation.id})}
        >
          Chấp nhận
        </Button>
      )}
      <Button
        color="red"
        isProcessing={loading}
        onClick={() => deleteFriendInvitationMutation.mutate(invitation.id)}
      >
        Xóa
      </Button>
    </div>
  );
};

export { FriendInvitationCard };
