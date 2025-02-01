import { FC, memo } from "react";
import { FriendInvitationCard } from "./friend-invitation-card";


type FriendInvitationListProps = {
  isReceived?: boolean;
};

const FriendInvitationList: FC<FriendInvitationListProps> = memo(({
  isReceived = true,
}) => {

  console.log("FriendInvitationList");

  return (
    <div className="space-y-2">
      <FriendInvitationCard
        isReceived={isReceived}
        avatar=""
        username="Lau Hoi"
        createdAt={new Date()}
      />
      <FriendInvitationCard
        isReceived={isReceived}
        avatar=""
        username="Lau Hoi"
        createdAt={new Date()}
      />
    </div>
  );
});

export { FriendInvitationList };
