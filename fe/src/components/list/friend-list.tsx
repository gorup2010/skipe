import { FC } from "react";
import { FriendCard } from "@/components/ui/card";

type FriendListProps = {
  isReceived?: boolean;
};

const FriendList: FC<FriendListProps> = () => {
  return (
    <div className="space-y-2">
      <FriendCard
        avatar=""
        username="Lau Hoi"
      />
      <FriendCard
        avatar=""
        username="Lau Hoi"
      />
    </div>
  );
};

export { FriendList };