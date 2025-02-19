import { FC } from "react";
import { FriendCard } from "./friend-card";
import { useFriends } from "../api/get-friends";
import { Spinner } from "flowbite-react";

type FriendListProps = {
  isReceived?: boolean;
};

const FriendList: FC<FriendListProps> = () => {
  const friendsQuery = useFriends();

  if (friendsQuery.isLoading) {
    return <Spinner />;
  }

  if (friendsQuery.data == undefined) {
    return <div>There is nothing here</div>;
  }

  return (
    <div className="space-y-2">
      {
        [...friendsQuery.data].map(([, value]) => (
          <FriendCard key={value.id} friend={value}
          />
        ))
      }
    </div>
  );
};

export { FriendList };
