import { FC } from "react";
import { FriendInvitationCard } from "@/components/ui/card";

type FriendInvitationListProps = {
  isReceived?: boolean;
};

const FriendInvitationList: FC<FriendInvitationListProps> = ({
  isReceived = true,
}) => {
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
};

export { FriendInvitationList };
