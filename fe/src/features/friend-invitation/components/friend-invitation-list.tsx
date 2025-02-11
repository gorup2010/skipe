import { FC, memo } from "react";
import { FriendInvitationCard } from "./friend-invitation-card";
import { FriendInvitation } from "@/types/api";

type FriendInvitationListProps = {
  isReceived?: boolean;
  invitations: Map<number, FriendInvitation>;
};

const FriendInvitationList: FC<FriendInvitationListProps> = memo(
  ({ isReceived = true, invitations }) => {
    return (
      <div className="space-y-2">
        {[...invitations].map(([, value]) => (
          <FriendInvitationCard key={value.id} isReceived={isReceived} invitation={value} />
        ))}
      </div>
    );
  }
);

export { FriendInvitationList };
